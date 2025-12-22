# CLAUDE.md - AI Assistant Development Guide

このドキュメントは、Korea Nowプロジェクトの開発に携わるAIアシスタント向けのガイドです。

---

## 📋 プロジェクト概要

**Korea Now（コリアナウ）** は、韓国の最新トレンドスポットを共有するWebアプリケーションです。

### 核心価値
1. **韓国デザイン重視**: 韓国の美的センス（伝統色+K-POPモダン）を反映したUI/UX
2. **コミュニティドリブン**: ユーザー投稿による「今」のリアルタイム情報
3. **安全性**: 3層モデレーション（AI + ユーザー通報 + 管理者）
4. **持続可能**: フリーミアム + B2B + アフィリエイトのマネタイズ

### ターゲットユーザー
- 日本在住の韓国人（韓国旅行のおすすめを聞かれることが多い）
- 韓国旅行予定の日本人（トレンドスポットを探している）
- K-カルチャー好き

---

## 🏗 アーキテクチャ概要

### 技術スタック（Vercel統合）
```
Framework:  Next.js 14+ (App Router, React Server Components)
Database:   Vercel Postgres (PostgreSQL)
Storage:    Vercel Blob (画像)
Cache:      Vercel KV (Redis)
Auth:       NextAuth.js v5
Payment:    Stripe
AI:         OpenAI API (Vercel AI SDK)
Hosting:    Vercel
```

### プロジェクト構造
```
korea-now/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # 認証関連ページ（グループルート） ✅ 実装済み
│   │   │   ├── layout.tsx      # 認証レイアウト
│   │   │   ├── login/page.tsx  # ログインページ
│   │   │   └── signup/page.tsx # サインアップページ
│   │   ├── (main)/             # メインアプリページ ✅ 実装済み
│   │   │   ├── layout.tsx      # メインレイアウト（ヘッダー+ナビ）
│   │   │   ├── page.tsx        # ホーム（スポット一覧グリッド）
│   │   │   ├── spots/
│   │   │   │   ├── [id]/page.tsx    # スポット詳細
│   │   │   │   └── new/page.tsx     # 新規投稿フォーム
│   │   │   ├── search/page.tsx      # 検索・フィルターページ
│   │   │   └── profile/page.tsx     # プロフィールページ
│   │   ├── layout.tsx          # ルートレイアウト（フォント、PWA設定）
│   │   ├── page.tsx            # リダイレクト → (main)/page.tsx
│   │   ├── globals.css         # グローバルスタイル（韓国デザイン）
│   │   └── api/                # API Routes（未実装）
│   │       ├── spots/
│   │       ├── auth/[...nextauth]/
│   │       ├── moderation/
│   │       ├── webhooks/stripe/
│   │       └── upload/
│   ├── components/             # Reactコンポーネント
│   │   ├── layout/             # レイアウトコンポーネント ✅ 実装済み
│   │   │   ├── MobileHeader.tsx     # スティッキーヘッダー
│   │   │   └── MobileNav.tsx        # ボトムナビゲーション
│   │   ├── spots/              # スポット関連コンポーネント ✅ 実装済み
│   │   │   └── SpotCard.tsx         # スポットカード
│   │   ├── ui/                 # shadcn/ui基本コンポーネント（未実装）
│   │   ├── maps/               # 地図コンポーネント（未実装）
│   │   └── moderation/         # モデレーションコンポーネント（未実装）
│   ├── lib/                    # ユーティリティ・設定
│   │   ├── db.ts               # Prisma client ✅ 実装済み
│   │   ├── utils.ts            # ユーティリティ関数 ✅ 実装済み
│   │   ├── auth.ts             # NextAuth設定（未実装）
│   │   ├── moderation.ts       # AI moderation（未実装）
│   │   └── stripe.ts           # Stripe設定（未実装）
│   ├── types/                  # TypeScript型定義（未実装）
│   └── styles/                 # グローバルスタイル
├── prisma/
│   ├── schema.prisma           # データベーススキーマ ✅ 実装済み
│   └── migrations/             # マイグレーション（未実行）
├── public/                     # 静的ファイル
│   └── manifest.json           # PWA設定 ✅ 実装済み
├── tests/                      # テストファイル（未実装）
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                       # ドキュメント
│   ├── PROGRESS.md             # 進捗管理ノート ✅ 更新中
│   └── AD_STRATEGY.md          # 広告戦略 ✅ 実装済み
├── PRD.md                      # 製品要件定義書 ✅
├── TECH_STACK.md               # 技術スタック詳細 ✅
├── IMPLEMENTATION_PLAN.md      # 実装計画書 ✅
└── CLAUDE.md                   # このファイル ✅
```

**実装状況**:
- ✅ **Phase 1 完了**: プロジェクトセットアップ、依存関係、Tailwind設定
- ✅ **Phase 3 完了**: モバイルデザインモック（7画面 + 3コンポーネント）
- ⏳ **Phase 2 進行中**: データベース接続、マイグレーション実行待ち
- ⏳ **Phase 4-10**: 未着手

---

## 🎨 デザインシステム

### カラーパレット

#### プライマリ（韓国伝統色: 青磁色）
```typescript
celadon: {
  DEFAULT: '#94C9A9',  // 青磁グリーン
  light: '#B8E6D0',
  dark: '#6BAA8A',
}
```

#### セカンダリ（K-POPピンク）
```typescript
kpop: {
  pink: '#FF3E9A',     // ネオンピンク
  blue: '#00D9FF',     // エレクトリックブルー
  purple: '#9D4EDD',   // パープル
}
```

#### 伝統色（アクセント）
```typescript
dancheong: '#C62E2E'   // 丹青レッド
silk: '#F8F8F8'         // シルクホワイト
```

### タイポグラフィ
- **Primary**: Pretendard Variable (韓国語) + Noto Sans JP (日本語)
- **Secondary**: Inter Variable (英語・数字)
- **Weights**: 300, 400, 500, 600, 700, 800

### コンポーネント原則
1. **カード型UI**: 角丸12-16px、柔らかいシャドウ
2. **大きな画像**: 16:9比率、グラデーションオーバーレイ
3. **太字タイトル**: 韓国スタイルの大胆なタイポグラフィ
4. **余白**: クリーンで広い余白
5. **ホバー効果**: 微妙なスケールアップ（1.02倍）

### CSS命名規則
```css
.korean-card          /* 基本カード */
.korean-btn           /* 基本ボタン */
.korean-btn-primary   /* プライマリボタン */
.rounded-korean       /* 韓国スタイル角丸 (12px) */
.rounded-korean-lg    /* 大きい角丸 (16px) */
.shadow-korean        /* 韓国スタイルシャドウ */
```

---

## 💻 開発ワークフロー

### 1. TDD (Test-Driven Development) 必須

**全ての新機能は以下の順序で実装**:

```bash
1. テストを書く（Red）
2. 最小限の実装（Green）
3. リファクタリング（Refactor）
4. コミット
```

#### テスト戦略

**Unit Tests** (Vitest)
- `src/lib/` 内の全関数
- ビジネスロジック
- ユーティリティ関数

```typescript
// Example: src/lib/__tests__/moderation.test.ts
import { describe, it, expect } from 'vitest'
import { moderateContent } from '../moderation'

describe('moderateContent', () => {
  it('should flag inappropriate content', async () => {
    const result = await moderateContent('bad content')
    expect(result.flagged).toBe(true)
  })

  it('should pass clean content', async () => {
    const result = await moderateContent('nice cafe')
    expect(result.flagged).toBe(false)
  })
})
```

**Integration Tests** (Vitest + MSW)
- API Routes
- Server Actions
- Database操作

**E2E Tests** (Playwright)
- ユーザーフロー
- 重要な機能パス

### 2. 進捗管理ノート（必須）

**すべての作業セッションで `docs/PROGRESS.md` を更新**

```markdown
## 2025-12-22

### 完了したタスク
- [x] プロジェクトセットアップ
- [x] Prismaスキーマ設計
- [x] 基本コンポーネント実装

### 進行中
- [ ] 認証システム実装（70%完了）
  - [x] NextAuth設定
  - [x] ログインページ
  - [ ] テスト追加

### 次のステップ
- [ ] スポット投稿機能
- [ ] AIモデレーション統合

### 課題・ブロッカー
- OpenAI APIのレート制限対策を検討中

### 学び・メモ
- Vercel Blobは画像最適化が自動で便利
- NextAuth v5のセッション管理がv4と異なる
```

### 3. Git コミット規約

**Conventional Commits** を使用:

```bash
# Format
<type>(<scope>): <subject>

# Types
feat:     新機能
fix:      バグ修正
docs:     ドキュメント
style:    コードスタイル（機能に影響なし）
refactor: リファクタリング
test:     テスト追加・修正
chore:    ビルド・設定変更

# Examples
feat(spots): add spot creation form with image upload
fix(moderation): correct AI flagging threshold
test(auth): add login flow integration tests
docs(readme): update setup instructions
```

### 4. ブランチ戦略

```bash
main                    # 本番環境
├── develop             # 開発環境
    ├── feature/xxx     # 機能開発
    ├── fix/xxx         # バグ修正
    └── test/xxx        # テスト追加
```

### 5. PR（プルリクエスト）テンプレート

```markdown
## 概要
簡潔な変更内容の説明

## 変更内容
- [ ] 機能A実装
- [ ] テスト追加
- [ ] ドキュメント更新

## テスト
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing done

## スクリーンショット
（UI変更の場合）

## 関連Issue
Closes #123
```

---

## 🧪 テスト実行

### セットアップ
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test
pnpm add -D msw
```

### 実行コマンド
```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e

# E2E UI mode
pnpm test:e2e:ui
```

### テストファイル命名規則
```
src/lib/moderation.ts           # 実装
src/lib/__tests__/moderation.test.ts  # Unit test

src/app/api/spots/route.ts      # API
src/app/api/spots/route.test.ts # Integration test

tests/e2e/spot-creation.spec.ts # E2E test
```

---

## 🗄 データベース

### Prisma ワークフロー

```bash
# スキーマ変更後
npx prisma format              # フォーマット
npx prisma validate            # 検証
npx prisma generate            # Client生成
npx prisma migrate dev --name description  # マイグレーション作成
npx prisma studio              # GUI で確認
```

### データモデル規約

1. **命名**: PascalCase（例: `User`, `Spot`, `Like`）
2. **ID**: `id String @id @default(cuid())`
3. **タイムスタンプ**: `createdAt`, `updatedAt` 必須
4. **リレーション**: 双方向に定義
5. **インデックス**: クエリで使用する全てのフィールド

### クエリパターン

```typescript
// Good: Selectで必要なフィールドのみ取得
const user = await db.user.findUnique({
  where: { id },
  select: {
    id: true,
    name: true,
    image: true,
    // passwordは含めない
  },
})

// Bad: すべてのフィールドを取得
const user = await db.user.findUnique({ where: { id } })
```

---

## 🔐 セキュリティチェックリスト

### 実装時に必ずチェック

- [ ] **認証**: すべてのAPI RouteとServer Actionで `auth()` チェック
- [ ] **認可**: ユーザーが自分のリソースのみ操作可能か
- [ ] **入力検証**: Zodスキーマで全入力を検証
- [ ] **レート制限**: Vercel KVで制限実装
- [ ] **XSS対策**: Reactの自動エスケープに依存、`dangerouslySetInnerHTML` 禁止
- [ ] **CSRF対策**: NextAuth内蔵の保護を使用
- [ ] **SQLインジェクション**: Prismaの自動エスケープ（生SQLは禁止）
- [ ] **環境変数**: `.env.local` に秘密鍵、`.env.example` にはサンプルのみ

### 例: Server Actionのセキュリティ

```typescript
'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import { kv } from '@vercel/kv'

// 入力検証スキーマ
const createSpotSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(500),
  category: z.enum(['CAFE', 'RESTAURANT', /* ... */]),
})

export async function createSpot(data: unknown) {
  // 1. 認証チェック
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  // 2. 入力検証
  const validated = createSpotSchema.parse(data)

  // 3. レート制限
  const key = `ratelimit:spots:${session.user.id}`
  const count = await kv.incr(key)
  if (count === 1) await kv.expire(key, 86400)
  if (count > 5) throw new Error('Rate limit exceeded')

  // 4. 認可チェック（必要に応じて）
  const user = await db.user.findUnique({
    where: { id: session.user.id },
  })
  if (!user) throw new Error('User not found')

  // 5. データ作成
  const spot = await db.spot.create({
    data: {
      ...validated,
      userId: session.user.id,
    },
  })

  return { spot }
}
```

---

## 🚀 デプロイ

### 環境設定

#### Development (ローカル)
```bash
# .env.local
POSTGRES_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret"
# ... その他のキー
```

#### Preview (Vercel PR)
- 自動デプロイ
- PR作成時にプレビューURL生成
- 環境変数: Vercel Dashboardから設定

#### Production (本番)
- `main` ブランチへのマージで自動デプロイ
- 環境変数: Vercel Dashboardから設定
- カスタムドメイン設定

### デプロイ前チェックリスト

- [ ] すべてのテストが通過
- [ ] ビルドエラーなし（`pnpm build`）
- [ ] 環境変数が設定済み
- [ ] データベースマイグレーション実行済み
- [ ] Stripe webhookエンドポイント登録
- [ ] Google Maps API制限設定

---

## 📊 モニタリング

### Vercel Analytics
- Web Vitals（LCP、FID、CLS）
- ページビュー
- エラー率

### Sentry（オプション）
- エラートラッキング
- パフォーマンス監視
- ユーザーフィードバック

### データベース監視
- Vercel Postgres Dashboard
- クエリパフォーマンス
- 接続プール状況

---

## 🐛 デバッグ・トラブルシューティング

### よくある問題

#### 1. Prisma Client生成エラー
```bash
# 解決方法
rm -rf node_modules/.prisma
npx prisma generate
```

#### 2. NextAuth セッションが取得できない
```typescript
// app/layout.tsx でSessionProviderを確認
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
```

#### 3. Vercel Blob アップロードエラー
```typescript
// 環境変数を確認
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

#### 4. Rate Limit が機能しない
```typescript
// Vercel KV接続を確認
import { kv } from '@vercel/kv'

// 環境変数
KV_URL=redis://...
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```

---

## 📝 コーディング規約

### TypeScript

```typescript
// Good
interface SpotCardProps {
  spot: Spot
  onLike: () => void
  isLiked: boolean
}

// Bad
interface Props {  // 名前が不明確
  data: any       // any禁止
  onClick: Function  // Functionは使わない
}
```

### React Components

```tsx
// Good: 関数コンポーネント + TypeScript
export function SpotCard({ spot, onLike }: SpotCardProps) {
  return <div>...</div>
}

// Bad: デフォルトエクスポート
export default function SpotCard(props: any) {
  return <div>...</div>
}
```

### Imports順序

```typescript
// 1. React
import { useState, useEffect } from 'react'

// 2. 外部ライブラリ
import Link from 'next/link'
import { useSession } from 'next-auth/react'

// 3. 内部モジュール
import { db } from '@/lib/db'
import { SpotCard } from '@/components/spots/SpotCard'

// 4. 型定義
import type { Spot } from '@prisma/client'

// 5. スタイル
import styles from './styles.module.css'
```

### ファイル命名

```
PascalCase:  コンポーネント (SpotCard.tsx)
camelCase:   ユーティリティ (formatDate.ts)
kebab-case:  ページ ([spot-id]/page.tsx)
```

---

## 🔄 継続的改善

### パフォーマンス最適化

1. **画像最適化**: Next.js Image コンポーネント使用
2. **バンドルサイズ**: `@next/bundle-analyzer` で確認
3. **React Server Components**: デフォルトでサーバーサイド
4. **キャッシング**: Vercel KV、React Query
5. **Lazy Loading**: 動的import使用

### コード品質

1. **Linting**: ESLint + Prettier
2. **Type Safety**: TypeScript strict mode
3. **Code Review**: PR必須
4. **Testing**: 80%以上のカバレッジ目標

---

## 📚 参考リソース

### 公式ドキュメント
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [Prisma](https://www.prisma.io/docs)
- [NextAuth.js](https://authjs.dev)
- [Vercel](https://vercel.com/docs)
- [Stripe](https://stripe.com/docs)
- [OpenAI API](https://platform.openai.com/docs)

### 内部ドキュメント
- [PRD.md](./PRD.md) - 製品要件定義
- [TECH_STACK.md](./TECH_STACK.md) - 技術詳細
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - 実装計画

### コミュニティ
- [Next.js Discord](https://discord.gg/nextjs)
- [React Discord](https://discord.gg/react)
- [Prisma Discord](https://discord.gg/prisma)

---

## ✅ AI Assistant チェックリスト

新しいタスクを開始する前に確認:

- [ ] `docs/PROGRESS.md` を読んで現在の状況を把握
- [ ] 関連するテストを先に書く（TDD）
- [ ] コードを書く
- [ ] テストが通ることを確認
- [ ] コミット（Conventional Commits形式）
- [ ] `docs/PROGRESS.md` を更新
- [ ] 必要に応じてドキュメント更新

---

## 🎯 重要な原則

1. **韓国デザインファースト**: すべてのUIは韓国の美的センスを反映
2. **TDD必須**: テストなしのコードは書かない
3. **進捗記録**: 毎セッション `PROGRESS.md` 更新
4. **型安全性**: `any` は使わない、strictモード
5. **セキュリティ**: 認証・認可・入力検証・レート制限を徹底
6. **パフォーマンス**: Server Components、キャッシング、最適化
7. **ドキュメント**: コードと同じくらい重要

---

## 📱 実装済みコンポーネント

### 画面（Pages）

1. **ホーム画面** (`src/app/(main)/page.tsx`)
   - 2カラムスポットグリッド
   - 横スクロールカテゴリフィルター
   - モックデータ6件
   - 広告プレースホルダー

2. **スポット詳細** (`src/app/(main)/spots/[id]/page.tsx`)
   - 画像ギャラリー（横スクロール+スナップ）
   - アクションボタン（いいね、ブックマーク、共有）
   - コメントセクション

3. **スポット投稿** (`src/app/(main)/spots/new/page.tsx`)
   - 画像アップロード（最大5枚）
   - フォーム（名前、カテゴリ、エリア、説明など）

4. **検索・フィルター** (`src/app/(main)/search/page.tsx`)
   - 検索バー
   - カテゴリ・エリアフィルター
   - ソート機能

5. **プロフィール** (`src/app/(main)/profile/page.tsx`)
   - ユーザー統計
   - 投稿/ブックマークタブ
   - プレミアムバッジ

6. **ログイン** (`src/app/(auth)/login/page.tsx`)
   - Google OAuth
   - メール/パスワード

7. **サインアップ** (`src/app/(auth)/signup/page.tsx`)
   - Google OAuth
   - メール登録フォーム

### コンポーネント（Components）

1. **MobileHeader** (`src/components/layout/MobileHeader.tsx`)
   - スティッキーヘッダー
   - 検索トグル
   - 通知、投稿ボタン

2. **MobileNav** (`src/components/layout/MobileNav.tsx`)
   - ボトムナビゲーション（5タブ）
   - Safe Area対応

3. **SpotCard** (`src/components/spots/SpotCard.tsx`)
   - 再利用可能なスポットカード
   - 4:3画像、アクションボタン

### ユーティリティ

1. **cn関数** (`src/lib/utils.ts`)
   - Tailwindクラス結合

2. **formatRelativeTime** (`src/lib/utils.ts`)
   - 相対時間フォーマット（「X分前」など）

---

**最終更新**: 2025-12-22 22:50 JST
**バージョン**: 1.1 - モバイルデザインモック完成版

**AI Assistantへ**: このガイドに従って開発を進めてください。不明点があればドキュメントを参照するか、ユーザーに質問してください。

**重要**: すべての開発セッションで `docs/PROGRESS.md` を必ず更新すること。TDD（Test-Driven Development）を徹底すること。
