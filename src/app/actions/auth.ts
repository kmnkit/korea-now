'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

// サインアップバリデーションスキーマ
const signupSchema = z.object({
  name: z.string().min(2, '名前は2文字以上必要です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上必要です')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'パスワードは大文字、小文字、数字を含む必要があります'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
})

// ログインバリデーションスキーマ
const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上必要です'),
})

export type SignupFormData = z.infer<typeof signupSchema>
export type LoginFormData = z.infer<typeof loginSchema>

/**
 * サインアップ
 */
export async function signup(data: SignupFormData) {
  try {
    // バリデーション
    const validated = signupSchema.parse(data)

    // メールアドレスの重複チェック
    const existingUser = await db.user.findUnique({
      where: { email: validated.email },
    })

    if (existingUser) {
      return {
        success: false,
        error: 'このメールアドレスは既に登録されています',
      }
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(validated.password, 12)

    // ユーザー作成
    const user = await db.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        plan: 'FREE',
        trustScore: 50,
      },
    })

    // 自動ログイン
    await signIn('credentials', {
      email: validated.email,
      password: validated.password,
      redirect: false,
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }

    console.error('Signup error:', error)
    return {
      success: false,
      error: 'サインアップに失敗しました。もう一度お試しください。',
    }
  }
}

/**
 * ログイン
 */
export async function login(data: LoginFormData) {
  try {
    // バリデーション
    const validated = loginSchema.parse(data)

    // NextAuthでサインイン
    const result = await signIn('credentials', {
      email: validated.email,
      password: validated.password,
      redirect: false,
    })

    if (!result) {
      return {
        success: false,
        error: 'ログインに失敗しました',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            error: 'メールアドレスまたはパスワードが正しくありません',
          }
        default:
          return {
            success: false,
            error: 'ログインに失敗しました',
          }
      }
    }

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }

    console.error('Login error:', error)
    return {
      success: false,
      error: 'ログインに失敗しました。もう一度お試しください。',
    }
  }
}

/**
 * Google OAuthでサインイン
 */
export async function signInWithGoogle() {
  try {
    await signIn('google', {
      redirectTo: '/home',
    })
  } catch (error) {
    console.error('Google signin error:', error)
    throw error
  }
}
