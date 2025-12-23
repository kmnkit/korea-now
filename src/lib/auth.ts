import NextAuth, { type DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

// NextAuth型拡張
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      plan: 'FREE' | 'PREMIUM' | 'PRO'
      nickname: string | null
      trustScore: number
    } & DefaultSession['user']
  }

  interface User {
    plan: 'FREE' | 'PREMIUM' | 'PRO'
    nickname: string | null
    trustScore: number
  }
}

// ログインバリデーションスキーマ
const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上必要です'),
})

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    newUser: '/onboarding/profile-setup', // 新規ユーザーはプロフィール設定へ
  },
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          emailVerified: profile.email_verified ? new Date() : null,
          name: profile.name,
          image: profile.picture,
          plan: 'FREE',
          trustScore: 50,
          nickname: null,
        }
      },
    }),

    // メール/パスワードログイン
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // バリデーション
          const validated = loginSchema.parse(credentials)

          // ユーザー検索
          const user = await db.user.findUnique({
            where: { email: validated.email },
            select: {
              id: true,
              email: true,
              emailVerified: true,
              name: true,
              nickname: true,
              image: true,
              password: true,
              plan: true,
              trustScore: true,
            },
          })

          // ユーザーが存在しない、またはパスワードが設定されていない
          if (!user || !user.password) {
            return null
          }

          // パスワード検証
          const isValid = await bcrypt.compare(
            validated.password,
            user.password
          )

          if (!isValid) {
            return null
          }

          // パスワードを除外してユーザー情報を返す
          const { password, ...userWithoutPassword } = user
          return userWithoutPassword
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    // JWTコールバック
    async jwt({ token, user, account }) {
      // 初回サインイン時
      if (user) {
        token.id = user.id
        token.plan = user.plan
        token.nickname = user.nickname
        token.trustScore = user.trustScore
      }

      // OAuth初回サインイン時
      if (account?.provider === 'google') {
        // データベースのユーザー情報を取得
        const dbUser = await db.user.findUnique({
          where: { email: token.email! },
          select: {
            id: true,
            plan: true,
            nickname: true,
            trustScore: true,
          },
        })

        if (dbUser) {
          token.id = dbUser.id
          token.plan = dbUser.plan
          token.nickname = dbUser.nickname
          token.trustScore = dbUser.trustScore
        }
      }

      return token
    },

    // セッションコールバック
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.plan = (token.plan as 'FREE' | 'PREMIUM' | 'PRO') || 'FREE'
        session.user.nickname = (token.nickname as string | null) || null
        session.user.trustScore = (token.trustScore as number) || 50
      }
      return session
    },

    // サインインコールバック
    async signIn({ user, account, profile }) {
      // OAuth初回サインイン時、メール認証済みとしてマーク
      if (account?.provider === 'google' && profile?.email_verified) {
        await db.user.update({
          where: { email: user.email! },
          data: { emailVerified: new Date() },
        })
      }

      return true
    },
  },
  events: {
    // 新規ユーザー作成時
    async createUser({ user }) {
      console.log('New user created:', user.id, user.email)
    },

    // サインイン時
    async signIn({ user, account }) {
      console.log('User signed in:', user.email, 'via', account?.provider)
    },
  },
  debug: process.env.NODE_ENV === 'development',
})

/**
 * サーバーサイドでセッションを取得するヘルパー関数
 */
export async function getSession() {
  return await auth()
}

/**
 * 認証済みユーザーを取得（未認証の場合はエラー）
 */
export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}
