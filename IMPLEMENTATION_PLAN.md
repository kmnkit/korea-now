# Korea Now 実装計画書

## 📋 概要

本ドキュメントは、Korea Nowの詳細な実装計画を記載します。**韓国の美的センスとデザイントレンド**を重視したUI/UX設計を中心に、技術実装の全体像を示します。

---

## 🎨 Phase 0: デザインシステム構築

### 0.1 韓国デザインリサーチ

#### 参考にする韓国アプリ・サービス
- **Naver**: 韓国最大のポータルサイト
- **Kakao**: メッセージング・ポータル
- **Coupang**: ECプラットフォーム
- **Kurly**: 食品デリバリー
- **29CM**: ファッションEC
- **Wadiz**: クラウドファンディング

#### 韓国デザインの特徴
1. **ミニマリズム + 大胆なアクセント**
   - 余白を活かしたクリーンなレイアウト
   - ポイントカラーで視線誘導
   - カード型UIの多用

2. **タイポグラフィ**
   - 大きく読みやすいフォント
   - 太字（Bold）を効果的に使用
   - ハングル・日本語・英語の混在を考慮

3. **カラーパレット**
   - **伝統色**: 한복（ハンボク）由来の色彩
     - 청자색 (Celadon): #94C9A9
     - 단청 적색 (Dancheong Red): #C62E2E
     - 명주 백색 (Silk White): #F8F8F8
   - **モダンK-POP色**:
     - ネオンピンク: #FF3E9A
     - エレクトリックブルー: #00D9FF
     - パープル: #9D4EDD

4. **写真・画像**
   - 高品質で鮮やかな写真
   - Instagram風のフィルター
   - グラデーションオーバーレイ

### 0.2 カラーパレット定義

```typescript
// lib/design-system/colors.ts
export const colors = {
  // Primary - 韓国伝統色ベース
  primary: {
    50: '#f0f9f4',
    100: '#daf1e3',
    200: '#b6e3c9',
    300: '#8dcfaa',  // Celadon inspired
    400: '#5fb688',
    500: '#3d9b6d',
    600: '#2d7d55',
    700: '#246446',
    800: '#1f5138',
    900: '#1b422f',
  },

  // Secondary - モダンK-POPピンク
  secondary: {
    50: '#fff0f7',
    100: '#ffdded',
    200: '#ffbbd9',
    300: '#ff88bf',
    400: '#ff3e9a',  // K-POP Pink
    500: '#e01875',
    600: '#c00058',
    700: '#a00048',
    800: '#80003a',
    900: '#60002c',
  },

  // Accent - エレクトリックブルー
  accent: {
    50: '#e6f9ff',
    100: '#b3efff',
    200: '#80e5ff',
    300: '#4ddbff',
    400: '#00d9ff',  // Electric Blue
    500: '#00b8d9',
    600: '#0098b3',
    700: '#007a8c',
    800: '#005c66',
    900: '#003e40',
  },

  // Neutral - シルクホワイトベース
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
}
```

### 0.3 タイポグラフィ

```typescript
// lib/design-system/typography.ts
export const typography = {
  fonts: {
    // ハングル・日本語両対応
    primary: 'Pretendard Variable, "Noto Sans JP", sans-serif',
    // 英語・数字
    secondary: 'Inter Variable, sans-serif',
    // コード
    mono: 'JetBrains Mono, monospace',
  },

  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },

  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
}
```

### 0.4 コンポーネント設計原則

#### 韓国スタイルのカード
```
┌─────────────────────────────┐
│  [Image - 16:9 ratio]       │
│                             │
├─────────────────────────────┤
│  Title (Bold, Large)        │
│  Subtitle (Regular, Gray)   │
│                             │
│  [Tag] [Tag] [Tag]          │
│                             │
│  👤 User  |  ❤️ 123  |  💬 45 │
└─────────────────────────────┘
```

- **角丸**: 大きめ（12-16px）
- **シャドウ**: 柔らかく控えめ
- **ホバー**: 微妙なスケールアップ（1.02倍）
- **画像**: 高品質、グラデーションオーバーレイ

### 0.5 レイアウトパターン

#### モバイルファースト
```
Mobile (< 768px)
├── Header (固定)
├── Search Bar (sticky)
├── Filter Chips (横スクロール)
└── Grid (1 column)

Tablet (768px - 1024px)
└── Grid (2 columns)

Desktop (> 1024px)
├── Sidebar (Filter)
└── Grid (3 columns)
```

---

## 🏗 Phase 1: プロジェクトセットアップ (3-5日)

### 1.1 Next.js プロジェクト初期化

```bash
npx create-next-app@latest korea-now \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd korea-now
```

### 1.2 依存関係インストール

```bash
pnpm add @prisma/client @vercel/postgres @vercel/blob @vercel/kv
pnpm add next-auth@beta
pnpm add stripe openai
pnpm add @react-google-maps/api
pnpm add zod react-hook-form @hookform/resolvers
pnpm add date-fns
pnpm add zustand
pnpm add lucide-react class-variance-authority clsx tailwind-merge

pnpm add -D prisma
pnpm add -D @types/node
```

### 1.3 Tailwind設定（韓国カラーパレット）

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 韓国カラーパレット
        celadon: {
          DEFAULT: '#94C9A9',
          light: '#B8E6D0',
          dark: '#6BAA8A',
        },
        dancheong: {
          DEFAULT: '#C62E2E',
          light: '#E85858',
          dark: '#A31E1E',
        },
        kpop: {
          pink: '#FF3E9A',
          blue: '#00D9FF',
          purple: '#9D4EDD',
        },
        silk: '#F8F8F8',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'Noto Sans JP', 'sans-serif'],
        display: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'korean': '12px',
        'korean-lg': '16px',
      },
      boxShadow: {
        'korean': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'korean-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### 1.4 フォント設定

```typescript
// app/layout.tsx
import { Noto_Sans_JP } from 'next/font/google'
import localFont from 'next/font/local'

// Pretendard（韓国フォント）
const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
})

// Noto Sans JP（日本語フォント）
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${pretendard.variable} ${notoSansJP.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### 1.5 プロジェクト構造

```
korea-now/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (main)/
│   │   │   ├── page.tsx              # ホーム（スポット一覧）
│   │   │   ├── spots/
│   │   │   │   ├── [id]/page.tsx    # スポット詳細
│   │   │   │   └── new/page.tsx     # 新規投稿
│   │   │   ├── search/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── spots/
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── moderation/
│   │   │   ├── webhooks/stripe/
│   │   │   └── upload/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── fonts/
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── spots/
│   │   │   ├── SpotCard.tsx
│   │   │   ├── SpotGrid.tsx
│   │   │   ├── SpotDetail.tsx
│   │   │   └── SpotForm.tsx
│   │   ├── maps/
│   │   │   └── GoogleMap.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   └── moderation/
│   │       └── ModerationAlert.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts                     # Prisma client
│   │   ├── moderation.ts
│   │   ├── stripe.ts
│   │   ├── upload.ts
│   │   └── utils.ts
│   ├── styles/
│   │   └── korean-theme.css
│   └── types/
│       └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── images/
│   └── icons/
└── .env.local
```

---

## 🗄 Phase 2: データベース設計 (2-3日)

### 2.1 Prisma スキーマ設計

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}

// ユーザー
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  nickname      String?   @unique
  image         String?
  bio           String?   @db.Text

  // プラン
  plan          Plan      @default(FREE)
  planExpiry    DateTime?

  // 信頼性スコア
  trustScore    Int       @default(50)

  // 関連
  accounts      Account[]
  sessions      Session[]
  spots         Spot[]
  likes         Like[]
  comments      Comment[]
  bookmarks     Bookmark[]
  reports       Report[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([email])
  @@index([nickname])
}

enum Plan {
  FREE
  PREMIUM
  PRO
}

// NextAuth用
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

// スポット
model Spot {
  id          String      @id @default(cuid())
  name        String
  description String      @db.Text
  category    Category
  area        Area
  address     String?
  lat         Float?
  lng         Float?
  budget      Budget?
  hours       String?
  mapLink     String?

  // 投稿者
  userId      String
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)

  // 画像
  images      Image[]

  // タグ
  tags        Tag[]

  // リアクション
  likes       Like[]
  comments    Comment[]
  bookmarks   Bookmark[]

  // モデレーション
  status      ModerationStatus @default(PENDING)
  moderatedAt DateTime?
  moderatedBy String?
  rejectionReason String?

  // 統計
  likeCount   Int         @default(0)
  commentCount Int        @default(0)
  viewCount   Int         @default(0)

  // スポンサー
  isSponsored Boolean     @default(false)
  sponsorExpiry DateTime?

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([userId])
  @@index([category])
  @@index([area])
  @@index([status])
  @@index([createdAt])
  @@index([likeCount])
  @@fulltext([name, description])
}

enum Category {
  CAFE
  RESTAURANT
  TOURISM
  SHOPPING
  NIGHTLIFE
  OTHER
}

enum Area {
  SEOUL
  BUSAN
  JEJU
  INCHEON
  DAEGU
  DAEJEON
  GWANGJU
  OTHER
}

enum Budget {
  LOW        // ~10,000ウォン
  MEDIUM     // 10,000~30,000ウォン
  HIGH       // 30,000~50,000ウォン
  LUXURY     // 50,000ウォン~
}

enum ModerationStatus {
  PENDING    // AI審査待ち
  APPROVED   // 承認済み
  REJECTED   // 却下
  FLAGGED    // ユーザー通報あり
  REVIEWING  // 管理者レビュー中
}

// 画像
model Image {
  id       String @id @default(cuid())
  url      String
  spotId   String
  spot     Spot   @relation(fields: [spotId], references: [id], onDelete: Cascade)
  order    Int    @default(0)

  @@index([spotId])
}

// タグ
model Tag {
  id    String @id @default(cuid())
  name  String @unique
  spots Spot[]
  count Int    @default(0)

  @@index([name])
}

// いいね
model Like {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  spotId    String
  spot      Spot     @relation(fields: [spotId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, spotId])
  @@index([userId])
  @@index([spotId])
}

// コメント
model Comment {
  id        String   @id @default(cuid())
  content   String   @db.Text
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  spotId    String
  spot      Spot     @relation(fields: [spotId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([spotId])
}

// ブックマーク
model Bookmark {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  spotId    String
  spot      Spot     @relation(fields: [spotId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, spotId])
  @@index([userId])
  @@index([spotId])
}

// 通報
model Report {
  id        String       @id @default(cuid())
  reason    ReportReason
  details   String?      @db.Text
  userId    String
  user      User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  spotId    String
  status    ReportStatus @default(PENDING)
  reviewedAt DateTime?
  reviewedBy String?
  createdAt DateTime     @default(now())

  @@index([userId])
  @@index([spotId])
  @@index([status])
}

enum ReportReason {
  SPAM
  INAPPROPRIATE
  MISINFORMATION
  HARASSMENT
  OTHER
}

enum ReportStatus {
  PENDING
  REVIEWED
  ACTIONED
  DISMISSED
}
```

### 2.2 マイグレーション実行

```bash
# Prisma初期化
npx prisma init

# マイグレーション作成
npx prisma migrate dev --name init

# Prisma Client生成
npx prisma generate
```

### 2.3 データベースクライアント

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

---

## 🎨 Phase 3: UI/UXコンポーネント実装 (5-7日)

### 3.1 デザインシステムの実装

#### カラー定義
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* 韓国カラーパレット */
    --celadon: 148 201 169;
    --celadon-light: 184 230 208;
    --celadon-dark: 107 170 138;

    --dancheong: 198 46 46;
    --dancheong-light: 232 88 88;
    --dancheong-dark: 163 30 30;

    --kpop-pink: 255 62 154;
    --kpop-blue: 0 217 255;
    --kpop-purple: 157 78 221;

    --silk: 248 248 248;

    /* セマンティックカラー */
    --background: 0 0% 100%;
    --foreground: 0 0% 10%;
    --primary: var(--celadon);
    --secondary: var(--kpop-pink);
    --accent: var(--kpop-blue);
  }

  .dark {
    --background: 0 0% 10%;
    --foreground: 0 0% 95%;
  }
}

@layer components {
  /* 韓国スタイルカード */
  .korean-card {
    @apply rounded-korean bg-white shadow-korean overflow-hidden
           transition-transform hover:scale-[1.02] cursor-pointer;
  }

  /* 韓国スタイルボタン */
  .korean-btn {
    @apply px-6 py-3 rounded-korean font-semibold
           transition-all hover:shadow-korean-lg;
  }

  .korean-btn-primary {
    @apply korean-btn bg-celadon text-white hover:bg-celadon-dark;
  }

  .korean-btn-secondary {
    @apply korean-btn bg-kpop-pink text-white hover:opacity-90;
  }
}
```

### 3.2 スポットカードコンポーネント

```tsx
// src/components/spots/SpotCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Bookmark, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpotCardProps {
  spot: {
    id: string
    name: string
    description: string
    category: string
    area: string
    images: { url: string }[]
    likeCount: number
    commentCount: number
    user: {
      name: string
      image: string
    }
  }
  onLike?: () => void
  onBookmark?: () => void
  isLiked?: boolean
  isBookmarked?: boolean
}

export function SpotCard({
  spot,
  onLike,
  onBookmark,
  isLiked = false,
  isBookmarked = false
}: SpotCardProps) {
  return (
    <Link href={`/spots/${spot.id}`} className="block">
      <div className="korean-card group">
        {/* 画像 */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={spot.images[0]?.url || '/placeholder.jpg'}
            alt={spot.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* グラデーションオーバーレイ（韓国スタイル） */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* カテゴリバッジ */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-celadon-dark">
              {spot.category}
            </span>
          </div>

          {/* エリアバッジ */}
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
              <MapPin className="w-3 h-3" />
              {spot.area}
            </span>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-4 space-y-3">
          {/* タイトル（大きく太字 - 韓国スタイル） */}
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-celadon-dark transition-colors">
            {spot.name}
          </h3>

          {/* 説明 */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {spot.description}
          </p>

          {/* ユーザー情報とアクション */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            {/* ユーザー */}
            <div className="flex items-center gap-2">
              <Image
                src={spot.user.image || '/avatar-placeholder.png'}
                alt={spot.user.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-xs text-gray-500">{spot.user.name}</span>
            </div>

            {/* アクション */}
            <div className="flex items-center gap-3">
              {/* いいね */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onLike?.()
                }}
                className={cn(
                  'flex items-center gap-1 text-xs transition-colors',
                  isLiked ? 'text-kpop-pink' : 'text-gray-500 hover:text-kpop-pink'
                )}
              >
                <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
                <span className="font-medium">{spot.likeCount}</span>
              </button>

              {/* コメント */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MessageCircle className="w-4 h-4" />
                <span>{spot.commentCount}</span>
              </div>

              {/* ブックマーク */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onBookmark?.()
                }}
                className={cn(
                  'transition-colors',
                  isBookmarked ? 'text-kpop-blue' : 'text-gray-500 hover:text-kpop-blue'
                )}
              >
                <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-current')} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
```

### 3.3 ヘッダーコンポーネント（韓国スタイル）

```tsx
// src/components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { Search, Plus, User, Bell } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-celadon to-kpop-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-celadon-dark to-kpop-pink bg-clip-text text-transparent">
            Korea Now
          </span>
        </Link>

        {/* 検索バー（モバイルは非表示） */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="スポット、エリアを検索..."
              className="w-full pl-10 pr-4 py-2 rounded-korean border border-gray-200 focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent"
            />
          </div>
        </div>

        {/* アクション */}
        <div className="flex items-center gap-3">
          {session ? (
            <>
              {/* 投稿ボタン */}
              <Link href="/spots/new" className="korean-btn-primary">
                <Plus className="w-4 h-4 mr-1 inline" />
                投稿
              </Link>

              {/* 通知 */}
              <button className="p-2 rounded-korean hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-kpop-pink rounded-full" />
              </button>

              {/* プロフィール */}
              <Link href="/profile" className="p-2 rounded-korean hover:bg-gray-100">
                <User className="w-5 h-5 text-gray-600" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-celadon-dark">
                ログイン
              </Link>
              <Link href="/signup" className="korean-btn-primary text-sm">
                新規登録
              </Link>
            </>
          )}
        </div>
      </div>

      {/* モバイル検索バー */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="検索..."
            className="w-full pl-10 pr-4 py-2 rounded-korean border border-gray-200"
          />
        </div>
      </div>
    </header>
  )
}
```

---

## 🔐 Phase 4: 認証システム実装 (3-4日)

### 4.1 NextAuth.js v5 セットアップ

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from './db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            password: true,
          },
        })

        if (!user || !user.password) return null

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
      }

      // Update token when session is updated
      if (trigger === 'update' && session) {
        return { ...token, ...session.user }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
```

### 4.2 認証API Routes

```typescript
// src/app/api/auth/[...nextauth]/route.ts
export { handlers as GET, handlers as POST } from '@/lib/auth'
```

### 4.3 ログインページ（韓国スタイル）

```tsx
// src/app/(auth)/login/page.tsx
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen flex">
      {/* 左側: イメージ（韓国風景） */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/korea-hero.jpg"
          alt="Korea"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-celadon/80 to-kpop-pink/80" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">「今の韓国」を</h1>
            <h1 className="text-5xl font-bold mb-8">発見しよう</h1>
            <p className="text-xl opacity-90">
              トレンドスポットを共有・発見できるコミュニティ
            </p>
          </div>
        </div>
      </div>

      {/* 右側: ログインフォーム */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* ロゴ */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-korean-lg bg-gradient-to-br from-celadon to-kpop-blue flex items-center justify-center">
                <span className="text-white font-bold text-2xl">K</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">ログイン</h2>
            <p className="mt-2 text-gray-600">
              Korea Nowへようこそ
            </p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full korean-card hover:shadow-korean-lg flex items-center justify-center gap-3 p-4 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              {/* Google icon SVG */}
            </svg>
            <span className="font-medium">Googleでログイン</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-korean border border-gray-300 focus:ring-2 focus:ring-celadon focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-korean border border-gray-300 focus:ring-2 focus:ring-celadon focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="w-full korean-btn-primary">
              ログイン
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            アカウントをお持ちでない方は{' '}
            <Link href="/signup" className="text-celadon-dark font-medium hover:underline">
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

## 📝 Phase 5: スポット投稿・閲覧機能 (5-7日)

### 5.1 スポット投稿フォーム

```tsx
// src/app/(main)/spots/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X, MapPin } from 'lucide-react'

const spotSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  description: z.string().min(10, '10文字以上の説明を入力してください').max(500),
  category: z.enum(['CAFE', 'RESTAURANT', 'TOURISM', 'SHOPPING', 'NIGHTLIFE', 'OTHER']),
  area: z.enum(['SEOUL', 'BUSAN', 'JEJU', 'INCHEON', 'DAEGU', 'DAEJEON', 'GWANGJU', 'OTHER']),
  address: z.string().optional(),
  budget: z.enum(['LOW', 'MEDIUM', 'HIGH', 'LUXURY']).optional(),
  tags: z.array(z.string()).max(5),
})

type SpotFormData = z.infer<typeof spotSchema>

export default function NewSpotPage() {
  const router = useRouter()
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpotFormData>({
    resolver: zodResolver(spotSchema),
  })

  const onSubmit = async (data: SpotFormData) => {
    setIsSubmitting(true)

    try {
      // 画像アップロード
      const imageUrls = await Promise.all(
        images.map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)

          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })

          const { url } = await res.json()
          return url
        })
      )

      // スポット作成
      const res = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          images: imageUrls,
        }),
      })

      if (!res.ok) throw new Error('Failed to create spot')

      const { spot } = await res.json()
      router.push(`/spots/${spot.id}`)
    } catch (error) {
      console.error(error)
      alert('投稿に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        新しいスポットを投稿
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 画像アップロード */}
        <div className="korean-card p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            写真（最大3枚）
          </label>

          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-korean"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {images.length < 3 && (
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-korean flex flex-col items-center justify-center cursor-pointer hover:border-celadon transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">写真を追加</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setImages([...images, ...files].slice(0, 3))
                  }}
                />
              </label>
            )}
          </div>
        </div>

        {/* 基本情報 */}
        <div className="korean-card p-6 space-y-4">
          {/* スポット名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              スポット名 *
            </label>
            <input
              {...register('name')}
              className="w-full px-4 py-3 rounded-korean border border-gray-300 focus:ring-2 focus:ring-celadon focus:border-transparent"
              placeholder="例: 弘大の隠れ家カフェ"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* カテゴリ & エリア */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                カテゴリ *
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 rounded-korean border border-gray-300"
              >
                <option value="">選択してください</option>
                <option value="CAFE">カフェ</option>
                <option value="RESTAURANT">レストラン</option>
                <option value="TOURISM">観光スポット</option>
                <option value="SHOPPING">ショッピング</option>
                <option value="NIGHTLIFE">ナイトライフ</option>
                <option value="OTHER">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                エリア *
              </label>
              <select
                {...register('area')}
                className="w-full px-4 py-3 rounded-korean border border-gray-300"
              >
                <option value="">選択してください</option>
                <option value="SEOUL">ソウル</option>
                <option value="BUSAN">釜山</option>
                <option value="JEJU">済州島</option>
                <option value="INCHEON">仁川</option>
                <option value="DAEGU">大邱</option>
                <option value="OTHER">その他</option>
              </select>
            </div>
          </div>

          {/* 説明 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              説明 *
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 rounded-korean border border-gray-300 focus:ring-2 focus:ring-celadon focus:border-transparent"
              placeholder="このスポットの魅力を教えてください..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 rounded-korean border border-gray-300 font-medium hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 korean-btn-primary disabled:opacity-50"
          >
            {isSubmitting ? '投稿中...' : '投稿する'}
          </button>
        </div>
      </form>
    </div>
  )
}
```

### 5.2 スポット投稿API (Server Action)

```typescript
// src/app/actions/spots.ts
'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { moderateContent, moderateImage } from '@/lib/moderation'
import { revalidatePath } from 'next/cache'
import { kv } from '@vercel/kv'

export async function createSpot(data: {
  name: string
  description: string
  category: string
  area: string
  images: string[]
  tags?: string[]
}) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  // レート制限チェック
  const rateKey = `ratelimit:spots:${session.user.id}`
  const count = await kv.incr(rateKey)

  if (count === 1) {
    await kv.expire(rateKey, 86400) // 24 hours
  }

  // 無料プランは1日5件まで
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  })

  const limits = {
    FREE: 5,
    PREMIUM: 30,
    PRO: Infinity,
  }

  if (count > limits[user!.plan]) {
    throw new Error('Daily limit exceeded')
  }

  // AIモデレーション
  const textModeration = await moderateContent(
    `${data.name} ${data.description}`
  )

  if (textModeration.flagged) {
    throw new Error('Content violates community guidelines')
  }

  // 画像モデレーション
  const imageModeration = await Promise.all(
    data.images.map((url) => moderateImage(url))
  )

  if (imageModeration.some((result) => result.flagged)) {
    throw new Error('Image contains inappropriate content')
  }

  // スポット作成
  const spot = await db.spot.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category as any,
      area: data.area as any,
      userId: session.user.id,
      status: 'APPROVED', // AI通過したのでAPPROVED
      images: {
        create: data.images.map((url, index) => ({
          url,
          order: index,
        })),
      },
      tags: {
        connectOrCreate: data.tags?.map((tag) => ({
          where: { name: tag },
          create: { name: tag, count: 1 },
        })) || [],
      },
    },
    include: {
      images: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  })

  revalidatePath('/')
  revalidatePath('/spots')

  return { spot }
}
```

---

## 🤖 Phase 6: AIモデレーション実装 (3-4日)

### 6.1 モデレーションモジュール

```typescript
// src/lib/moderation.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// テキストモデレーション
export async function moderateContent(text: string) {
  try {
    const moderation = await openai.moderations.create({
      input: text,
    })

    const result = moderation.results[0]

    return {
      flagged: result.flagged,
      categories: result.categories,
      categoryScores: result.category_scores,
    }
  } catch (error) {
    console.error('Moderation error:', error)
    // エラー時は安全側に倒す
    return { flagged: true, categories: {}, categoryScores: {} }
  }
}

// 画像モデレーション
export async function moderateImage(imageUrl: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this image for inappropriate content including:
- Adult/sexual content
- Violence or gore
- Hate symbols
- Spam or promotional content

Respond with JSON: { "flagged": boolean, "reason": string }`,
            },
            {
              type: 'image_url',
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
      max_tokens: 300,
    })

    const content = response.choices[0].message.content
    const result = JSON.parse(content || '{}')

    return {
      flagged: result.flagged || false,
      reason: result.reason,
    }
  } catch (error) {
    console.error('Image moderation error:', error)
    return { flagged: true, reason: 'Moderation failed' }
  }
}
```

---

## 💳 Phase 7: 決済システム (Stripe) (3-4日)

### 7.1 Stripe設定

```typescript
// src/lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const plans = {
  premium: {
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    amount: 480,
    currency: 'jpy',
  },
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    amount: 2980,
    currency: 'jpy',
  },
}
```

### 7.2 チェックアウトAPI

```typescript
// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { stripe, plans } from '@/lib/stripe'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { plan } = await req.json()

  if (!plans[plan as keyof typeof plans]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email!,
    line_items: [
      {
        price: plans[plan as keyof typeof plans].priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/settings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/settings?canceled=true`,
    metadata: {
      userId: session.user.id,
      plan,
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
```

---

## 🧪 Phase 8: テスト実装 (3-5日)

### 8.1 Unit Tests (Vitest)

```typescript
// src/lib/__tests__/moderation.test.ts
import { describe, it, expect, vi } from 'vitest'
import { moderateContent } from '../moderation'

describe('Moderation', () => {
  it('should flag inappropriate content', async () => {
    const result = await moderateContent('This is inappropriate content...')
    expect(result.flagged).toBe(true)
  })

  it('should pass clean content', async () => {
    const result = await moderateContent('This is a nice cafe in Seoul!')
    expect(result.flagged).toBe(false)
  })
})
```

---

## 🚀 Phase 9: デプロイ (1-2日)

### 9.1 Vercel設定

```bash
# Vercel CLIインストール
npm i -g vercel

# デプロイ
vercel

# 環境変数設定
vercel env add POSTGRES_URL
vercel env add OPENAI_API_KEY
vercel env add STRIPE_SECRET_KEY
# ...
```

---

## 📈 Phase 10: モニタリング・最適化 (継続)

### 10.1 Vercel Analytics
- Real User Monitoring
- Web Vitals tracking

### 10.2 Sentry エラートラッキング

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

---

## 📊 実装スケジュール概算

| フェーズ | タスク | 期間 | 累計 |
|---------|--------|------|------|
| 0 | デザインシステム構築 | 3-5日 | 5日 |
| 1 | プロジェクトセットアップ | 3-5日 | 10日 |
| 2 | データベース設計 | 2-3日 | 13日 |
| 3 | UI/UXコンポーネント | 5-7日 | 20日 |
| 4 | 認証システム | 3-4日 | 24日 |
| 5 | スポット機能 | 5-7日 | 31日 |
| 6 | AIモデレーション | 3-4日 | 35日 |
| 7 | 決済システム | 3-4日 | 39日 |
| 8 | テスト実装 | 3-5日 | 44日 |
| 9 | デプロイ | 1-2日 | 46日 |
| 10 | 最適化 | 継続 | - |

**合計: 約6-7週間（1.5-2ヶ月）**

---

## 🎯 重要な実装ポイント

### 韓国デザインの実現
1. **カラーパレット**: 伝統色 + K-POPモダン色
2. **タイポグラフィ**: Pretendard + Noto Sans JP
3. **レイアウト**: カード型、大きな画像、大胆な余白
4. **アニメーション**: 控えめでスムーズ
5. **モバイルファースト**: 韓国はモバイル利用率が非常に高い

### パフォーマンス最適化
1. **画像最適化**: Next.js Image, Vercel Blob
2. **キャッシング**: Vercel KV, React Query
3. **Server Components**: デフォルトでSSR
4. **Edge Functions**: 低レイテンシ

### セキュリティ
1. **3層モデレーション**: AI → ユーザー通報 → 管理者
2. **レート制限**: Vercel KV
3. **入力検証**: Zod
4. **認証**: NextAuth.js v5

---

**作成日**: 2025-12-22
**バージョン**: 1.0
**想定開発期間**: 6-7週間（1.5-2ヶ月）
