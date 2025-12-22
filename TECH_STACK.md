# 技術スタック詳細

## 概要

Korea Nowは**Vercel統合スタック**を採用し、Next.js単体でフルスタック開発を実現します。

---

## 🎯 アーキテクチャ方針

### 1. モノリシック・サーバーレスアーキテクチャ
- 単一のNext.jsアプリケーションでフロントエンド・バックエンドを統合
- マイクロサービスではなくモジュラーモノリス
- 初期開発の高速化と運用の簡素化

### 2. エッジファースト
- React Server Componentsでサーバーサイドレンダリング
- エッジファンクションで低レイテンシ
- グローバルCDNで高速配信

### 3. TypeScript完全型付け
- フロントエンド・バックエンド・データベースまで一貫した型安全性
- 開発時のバグ削減と保守性向上

---

## 🛠 技術スタック詳細

### フロントエンド

#### Next.js 14+ (App Router)
```
/app
  /(auth)
    /login
    /signup
  /(main)
    /spots
    /search
    /profile
    /[spotId]
  /api
    /spots
    /auth
    /moderation
```

**選定理由**:
- React Server Components でパフォーマンス最適化
- Server Actions で API Routes 不要（一部のケースで）
- ファイルベースルーティングで直感的
- Vercel との完璧な統合

#### Tailwind CSS + shadcn/ui
- **Tailwind CSS**: ユーティリティファーストで高速開発
- **shadcn/ui**: 高品質なコンポーネントライブラリ
- **Radix UI**: アクセシビリティ対応プリミティブ

**コンポーネント構成**:
```
/components
  /ui           # shadcn/ui components
  /spots        # スポット関連コンポーネント
  /maps         # 地図コンポーネント
  /moderation   # モデレーション関連
```

#### 状態管理
- **React Context API**: グローバルステート（認証、テーマなど）
- **Zustand**: クライアントサイドのローカルステート
- **React Query**: サーバーステートのキャッシング（必要に応じて）

---

### バックエンド

#### Next.js API Routes & Server Actions

**API Routes** (`/app/api/*`):
- 外部APIとの連携（OpenAI、Stripe など）
- Webhookエンドポイント
- REST API エンドポイント

**Server Actions**:
- フォーム送信
- データミューテーション
- 認証関連処理

**例**:
```typescript
// Server Action
'use server'

export async function createSpot(formData: FormData) {
  const session = await getServerSession()
  if (!session) throw new Error('Unauthorized')

  // AI Moderation
  const moderationResult = await moderateContent(formData)
  if (!moderationResult.approved) {
    return { error: 'Content rejected' }
  }

  // Save to DB
  const spot = await db.spot.create({
    data: {
      name: formData.get('name'),
      userId: session.user.id,
      // ...
    }
  })

  revalidatePath('/spots')
  return { success: true, spot }
}
```

---

### データ層

#### Vercel Postgres
**詳細**:
- PostgreSQL 互換（Neon.tech ベース）
- サーバーレス対応（接続プーリング内蔵）
- 自動スケーリング
- 無料枠: 0.5 GB ストレージ

**ORM**: Prisma
```typescript
// prisma/schema.prisma
model Spot {
  id          String   @id @default(cuid())
  name        String
  description String
  category    Category
  area        Area
  images      Image[]
  likes       Like[]
  comments    Comment[]
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**マイグレーション**:
```bash
npx prisma migrate dev
npx prisma generate
```

#### Vercel Blob
**用途**: 画像・メディアファイルストレージ

**実装例**:
```typescript
import { put } from '@vercel/blob'

export async function uploadImage(file: File) {
  const blob = await put(`spots/${userId}/${file.name}`, file, {
    access: 'public',
  })

  return blob.url // CDN URL
}
```

**特徴**:
- 自動CDN配信
- 画像最適化（リサイズ、WebP変換）
- 無料枠: 1 GB

#### Vercel KV (Redis)
**用途**:
- セッション管理
- レート制限
- キャッシュ

**実装例**:
```typescript
import { kv } from '@vercel/kv'

// Rate limiting
export async function checkRateLimit(userId: string) {
  const key = `ratelimit:${userId}`
  const count = await kv.incr(key)

  if (count === 1) {
    await kv.expire(key, 86400) // 24 hours
  }

  return count <= 5 // 1日5投稿まで
}

// Session cache
export async function cacheSession(sessionId: string, data: any) {
  await kv.set(`session:${sessionId}`, data, { ex: 3600 }) // 1 hour
}
```

---

### 認証・セキュリティ

#### NextAuth.js v5 (Auth.js)
**設定**:
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 認証ロジック
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
})
```

**セッション管理**:
- JWT ベース（Vercel KV でキャッシュ）
- HTTPOnly Cookie
- CSRF保護内蔵

---

### AI・モデレーション

#### Vercel AI SDK
```typescript
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function moderateText(text: string) {
  const { text: result } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: `次のテキストが不適切かどうか判定してください: ${text}`,
  })

  return JSON.parse(result)
}
```

#### OpenAI Moderation API
```typescript
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function moderateContent(content: string) {
  const moderation = await openai.moderations.create({
    input: content,
  })

  return {
    flagged: moderation.results[0].flagged,
    categories: moderation.results[0].categories,
  }
}
```

#### OpenAI Vision API (画像モデレーション)
```typescript
export async function moderateImage(imageUrl: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "この画像に不適切なコンテンツが含まれていますか？" },
          { type: "image_url", image_url: { url: imageUrl } },
        ],
      },
    ],
  })

  return response.choices[0].message.content
}
```

---

### 決済

#### Stripe
**プレミアムプラン課金**:
```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function createCheckoutSession(userId: string, plan: 'premium' | 'pro') {
  const prices = {
    premium: 'price_xxx', // Stripe Price ID
    pro: 'price_yyy',
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [
      {
        price: prices[plan],
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  })

  return session.url
}
```

**Webhook**:
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  )

  if (event.type === 'checkout.session.completed') {
    // サブスクリプション有効化
    const session = event.data.object
    await db.user.update({
      where: { email: session.customer_email },
      data: { plan: 'premium' },
    })
  }

  return new Response(JSON.stringify({ received: true }))
}
```

---

### 外部API

#### Google Maps JavaScript API
```typescript
'use client'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

export function SpotMap({ lat, lng }: { lat: number; lng: number }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      zoom={15}
      center={{ lat, lng }}
      mapContainerStyle={{ width: '100%', height: '400px' }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  )
}
```

---

## 🚀 デプロイ・CI/CD

### Vercel
- **自動デプロイ**: Git push で自動デプロイ
- **プレビューデプロイ**: PR ごとにプレビュー環境生成
- **環境変数**: Dashboard から管理

### 環境分離
- **Development**: ローカル開発
- **Preview**: PR プレビュー（Vercel）
- **Production**: 本番環境（Vercel）

---

## 📊 モニタリング・分析

### Vercel Analytics
- ページビュー、UX スコア
- Web Vitals（LCP、FID、CLS）

### Vercel Speed Insights
- パフォーマンスモニタリング
- リアルユーザーメトリクス

### Sentry（オプション）
- エラートラッキング
- パフォーマンス監視

---

## 💰 コスト見積もり

### 初期（0-1,000 ユーザー）
- **Vercel Pro**: $20/月
- **Vercel Postgres**: 無料枠内
- **Vercel Blob**: 無料枠内
- **Vercel KV**: 無料枠内
- **OpenAI API**: ~$50/月
- **Google Maps API**: ~$50/月
- **合計**: ~$120/月

### 成長期（1,000-10,000 ユーザー）
- **Vercel Pro**: $20/月
- **Vercel Postgres**: ~$50/月
- **Vercel Blob**: ~$30/月
- **Vercel KV**: ~$20/月
- **OpenAI API**: ~$200/月
- **Google Maps API**: ~$200/月
- **合計**: ~$520/月

### スケール期（10,000+ ユーザー）
- **Vercel Enterprise**: 要相談
- 従量課金によるスケーリング

---

## 🔧 開発環境セットアップ

### 必要なツール
- Node.js 18+
- pnpm / npm / yarn
- Git
- Vercel CLI

### セットアップ手順
```bash
# リポジトリクローン
git clone https://github.com/yourusername/korea-now.git
cd korea-now

# 依存関係インストール
pnpm install

# 環境変数設定
cp .env.example .env.local

# Prismaセットアップ
npx prisma generate
npx prisma migrate dev

# 開発サーバー起動
pnpm dev
```

### 環境変数
```env
# Database
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."

# Vercel
BLOB_READ_WRITE_TOKEN="..."
KV_URL="..."
KV_REST_API_URL="..."
KV_REST_API_TOKEN="..."
```

---

## 📦 プロジェクト構成

```
korea-now/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/
│   │   ├── spots/
│   │   ├── search/
│   │   └── profile/
│   ├── api/
│   │   ├── spots/
│   │   ├── auth/
│   │   └── webhooks/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── spots/
│   └── maps/
├── lib/
│   ├── db.ts          # Prisma client
│   ├── auth.ts        # Auth config
│   ├── moderation.ts  # AI moderation
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🧪 テスト戦略

### Unit Tests
- **Vitest**: ユニットテスト
- **Testing Library**: コンポーネントテスト

### E2E Tests
- **Playwright**: エンドツーエンドテスト

### CI/CD
- GitHub Actions で自動テスト
- Vercel プレビューデプロイで確認

---

## 🔒 セキュリティ対策

1. **認証・認可**
   - NextAuth.js でセキュアな認証
   - JWTトークンの暗号化
   - HTTPOnly Cookie

2. **入力検証**
   - Zod でスキーマバリデーション
   - サーバーサイドでの検証

3. **Rate Limiting**
   - Vercel KV でレート制限
   - IP ベース + ユーザーベース

4. **CORS**
   - Next.js の API Routes で制御

5. **環境変数**
   - `.env.local` で管理
   - Vercel Dashboard で暗号化保存

---

**最終更新**: 2025-12-22
