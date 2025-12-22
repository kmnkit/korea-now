# オンボーディング実装計画

**作成日**: 2025-12-22
**優先度**: 🔴 高
**目的**: 新規ユーザーの初回体験を向上し、アプリの価値を明確に伝える

---

## 📋 目次

1. [オンボーディングの目的](#オンボーディングの目的)
2. [画面構成](#画面構成)
3. [実装仕様](#実装仕様)
4. [技術設計](#技術設計)
5. [実装計画](#実装計画)
6. [成功指標](#成功指標)

---

## 🎯 オンボーディングの目的

### 1. アプリの価値を明確に伝える
- 「韓国の最新トレンドスポットを発見できる」
- 「実際に行った人のリアルな情報」
- 「旅行計画が簡単になる」

### 2. 主要機能を理解してもらう
- スポット検索・閲覧
- スポット投稿
- いいね・ブックマーク

### 3. アカウント作成を促進
- 価値を理解した後にサインアップを促す
- スキップ可能（後からでもOK）

### 4. 初回体験の不安を解消
- 簡単なチュートリアル
- 何ができるかを視覚的に示す

---

## 📱 画面構成

### 全体フロー

```
スプラッシュ画面
    ↓
ウェルカム画面（#1）
    ↓
機能紹介スライド（#2-4）
    ↓
サインアップ/ログイン or スキップ
    ↓
[ログインした場合]
    ↓
初回プロフィール設定（オプション）
    ↓
ホーム画面
```

---

## 🖼 画面詳細

### 画面 #0: スプラッシュ画面（Splash Screen）

**表示時間**: 1-2秒

**デザイン**:
```tsx
- 背景: 白 or グラデーション（控えめ）
- ロゴ: 中央に大きく表示
- アニメーション: フェードイン
```

**実装ファイル**: `src/app/splash/page.tsx`

**機能**:
- アプリ起動時に自動表示
- ローディング完了後、自動的にウェルカム画面へ
- 2回目以降は表示しない（localStorage使用）

---

### 画面 #1: ウェルカム画面（Welcome Screen）

**目的**: アプリの価値提案を伝える

**デザイン**:
```tsx
┌─────────────────────┐
│                     │
│   [Hero Image]      │ ← 韓国の美しいスポット画像
│                     │
│                     │
├─────────────────────┤
│                     │
│  Korea Now へ       │
│  ようこそ 🇰🇷        │
│                     │
│  韓国の「今」を       │
│  シェアしよう        │
│                     │
│  ────────────────    │
│                     │
│  リアルな旅行情報で   │
│  あなたの韓国旅行を   │
│  もっと楽しく        │
│                     │
│  [次へ →]           │
│                     │
│  すでにアカウントを    │
│  お持ちの方           │
│  [ログイン]          │
│                     │
└─────────────────────┘
```

**実装ファイル**: `src/app/onboarding/welcome/page.tsx`

**コンテンツ**:
- **メインメッセージ**: 「Korea Now へようこそ」
- **サブメッセージ**: 「韓国の「今」をシェアしよう」
- **説明文**: 「リアルな旅行情報であなたの韓国旅行をもっと楽しく」
- **CTA**: 「次へ」ボタン
- **セカンダリCTA**: 「ログイン」リンク

**インタラクション**:
- 「次へ」をタップ → 機能紹介スライド #1へ
- 「ログイン」をタップ → ログイン画面へ

---

### 画面 #2-4: 機能紹介スライド（Feature Slides）

**目的**: 主要機能を視覚的に説明

**実装**: 横スワイプ可能なカルーセル

**実装ファイル**: `src/app/onboarding/slides/page.tsx`

#### スライド #1: 発見する

```tsx
┌─────────────────────┐
│                     │
│   [イラスト]         │ ← 虫眼鏡で検索するイメージ
│    🔍              │
│                     │
├─────────────────────┤
│                     │
│  最新スポットを       │
│  発見しよう          │
│                     │
│  カフェ、レストラン、  │
│  観光地、ショップなど  │
│  韓国の「今」を       │
│  リアルタイムで       │
│                     │
│  ●○○              │ ← ページインジケーター
│                     │
└─────────────────────┘
```

**コンテンツ**:
- **タイトル**: 「最新スポットを発見しよう」
- **説明**: 「カフェ、レストラン、観光地、ショップなど韓国の「今」をリアルタイムで」
- **イラスト**: 検索・発見のイメージ

#### スライド #2: シェアする

```tsx
┌─────────────────────┐
│                     │
│   [イラスト]         │ ← スマホで写真を撮るイメージ
│    📸              │
│                     │
├─────────────────────┤
│                     │
│  あなたの体験を       │
│  シェアしよう        │
│                     │
│  写真と一緒に         │
│  おすすめスポットを    │
│  投稿して、みんなの    │
│  旅をサポート         │
│                     │
│  ○●○              │
│                     │
└─────────────────────┘
```

**コンテンツ**:
- **タイトル**: 「あなたの体験をシェアしよう」
- **説明**: 「写真と一緒におすすめスポットを投稿して、みんなの旅をサポート」
- **イラスト**: 写真投稿のイメージ

#### スライド #3: 保存する

```tsx
┌─────────────────────┐
│                     │
│   [イラスト]         │ ← ブックマークのイメージ
│    🔖              │
│                     │
├─────────────────────┤
│                     │
│  気になるスポットを   │
│  保存しよう          │
│                     │
│  いいね＆ブックマーク  │
│  で後から見返せる。    │
│  旅行計画も簡単！     │
│                     │
│  ○○●              │
│                     │
│  [始める]           │
│  [スキップして閲覧]   │
│                     │
└─────────────────────┘
```

**コンテンツ**:
- **タイトル**: 「気になるスポットを保存しよう」
- **説明**: 「いいね＆ブックマークで後から見返せる。旅行計画も簡単！」
- **イラスト**: ブックマークのイメージ
- **CTA**: 「始める」「スキップして閲覧」

**インタラクション**:
- **横スワイプ**: 次のスライドへ
- **「始める」**: サインアップ画面へ
- **「スキップして閲覧」**: ホーム画面へ（ゲストモード）

---

### 画面 #5: 初回プロフィール設定（Optional Profile Setup）

**目的**: 最低限の情報を入力してもらう

**タイミング**: サインアップ直後（スキップ可能）

**実装ファイル**: `src/app/onboarding/profile-setup/page.tsx`

**デザイン**:
```tsx
┌─────────────────────┐
│ [← スキップ]        │
│                     │
│  プロフィール設定     │
│                     │
│  ────────────────    │
│                     │
│  [アイコン画像]      │
│  タップして変更       │
│                     │
│  ニックネーム *      │
│  ┌───────────────┐  │
│  │ 김지수          │  │
│  └───────────────┘  │
│                     │
│  自己紹介（任意）     │
│  ┌───────────────┐  │
│  │ 韓国旅行が好き   │  │
│  │ です✨         │  │
│  └───────────────┘  │
│  100/100           │
│                     │
│  [完了]             │
│                     │
└─────────────────────┘
```

**入力項目**:
- **アイコン画像**（任意）
  - デフォルト: イニシャルアイコン
  - タップで写真選択・カメラ起動
- **ニックネーム**（必須）
  - 2-20文字
  - 重複チェック
- **自己紹介**（任意）
  - 100文字以内

**CTA**:
- **「完了」**: ホーム画面へ
- **「スキップ」**: ホーム画面へ（後で設定可能）

---

## 🔧 技術設計

### 1. ルーティング

```
/splash                         # スプラッシュ画面
/onboarding
  /welcome                      # ウェルカム画面
  /slides                       # 機能紹介スライド
  /profile-setup                # 初回プロフィール設定
```

### 2. 状態管理

**LocalStorage使用**:
```typescript
interface OnboardingState {
  hasCompletedOnboarding: boolean   // オンボーディング完了フラグ
  lastCompletedStep: string          // 最後に完了したステップ
  skippedProfileSetup: boolean       // プロフィール設定をスキップしたか
}
```

**保存場所**: `localStorage.onboarding`

**初回判定**:
```typescript
// src/lib/onboarding.ts
export function hasCompletedOnboarding(): boolean {
  const state = localStorage.getItem('onboarding')
  if (!state) return false
  return JSON.parse(state).hasCompletedOnboarding
}

export function markOnboardingComplete(): void {
  localStorage.setItem('onboarding', JSON.stringify({
    hasCompletedOnboarding: true,
    lastCompletedStep: 'profile-setup',
    skippedProfileSetup: false,
  }))
}
```

### 3. リダイレクト制御

**ルートレイアウトで制御**:
```typescript
// src/app/layout.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { hasCompletedOnboarding } from '@/lib/onboarding'

export default function RootLayout({ children }) {
  const router = useRouter()

  useEffect(() => {
    // 未認証 && オンボーディング未完了
    if (!session && !hasCompletedOnboarding()) {
      router.push('/onboarding/welcome')
    }
  }, [])

  return <>{children}</>
}
```

### 4. コンポーネント設計

#### スライダーコンポーネント
```typescript
// src/components/onboarding/SlideCarousel.tsx
interface Slide {
  id: string
  title: string
  description: string
  illustration: React.ReactNode
}

interface SlideCarouselProps {
  slides: Slide[]
  onComplete: () => void
  onSkip: () => void
}
```

#### プログレスインジケーター
```typescript
// src/components/onboarding/ProgressIndicator.tsx
interface ProgressIndicatorProps {
  totalSteps: number
  currentStep: number
}
```

---

## 📐 デザイン仕様

### カラー

**新カラーパレット使用**（デザイン改善後）:
- **Primary**: `#10B981` (Emerald green)
- **Secondary**: `#F97316` (Orange)
- **Accent**: `#3B82F6` (Blue)

### タイポグラフィ

```css
/* タイトル */
.onboarding-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

/* サブタイトル */
.onboarding-subtitle {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}

/* 説明文 */
.onboarding-description {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #6B7280; /* gray-500 */
}
```

### レイアウト

```css
/* コンテナ */
.onboarding-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 24px;
}

/* スライド */
.onboarding-slide {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 24px;
}
```

### アニメーション

```css
/* フェードイン */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* スライドトランジション */
.slide-transition {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 🚀 実装計画

### Phase 1: スプラッシュ画面（1時間）

**タスク**:
- [ ] スプラッシュ画面コンポーネント作成
- [ ] ロゴアニメーション実装
- [ ] LocalStorageチェック機能
- [ ] リダイレクトロジック

**ファイル**:
- `src/app/splash/page.tsx`
- `src/lib/onboarding.ts`

### Phase 2: ウェルカム画面（1時間）

**タスク**:
- [ ] ウェルカム画面コンポーネント作成
- [ ] Hero画像選定・配置
- [ ] CTAボタン実装
- [ ] ナビゲーション実装

**ファイル**:
- `src/app/onboarding/welcome/page.tsx`

### Phase 3: 機能紹介スライド（2-3時間）

**タスク**:
- [ ] スライダーコンポーネント作成
- [ ] 3つのスライドコンテンツ作成
- [ ] スワイプジェスチャー実装
- [ ] プログレスインジケーター
- [ ] ページインジケーター（ドット）

**ファイル**:
- `src/app/onboarding/slides/page.tsx`
- `src/components/onboarding/SlideCarousel.tsx`
- `src/components/onboarding/ProgressIndicator.tsx`

**依存ライブラリ**:
- `react-swipeable` or `keen-slider` or ネイティブCSS scroll-snap

### Phase 4: 初回プロフィール設定（2時間）

**タスク**:
- [ ] プロフィール設定フォーム作成
- [ ] 画像アップロード機能
- [ ] バリデーション実装
- [ ] API連携（Server Action）
- [ ] スキップ機能

**ファイル**:
- `src/app/onboarding/profile-setup/page.tsx`
- `src/app/actions/profile.ts`

### Phase 5: 統合・テスト（1-2時間）

**タスク**:
- [ ] フロー全体のテスト
- [ ] エッジケース対応
  - ログイン済みユーザーはスキップ
  - オンボーディング完了後は表示しない
  - ブラウザバック対応
- [ ] レスポンシブ確認
- [ ] アニメーションの調整

### Phase 6: イラスト・画像（オプション）

**タスク**:
- [ ] Hero画像の選定・最適化
- [ ] スライドイラストの作成or調達
  - Undraw
  - Storyset
  - カスタムイラスト

---

## 📊 推定工数

| Phase | タスク | 工数 |
|-------|--------|------|
| Phase 1 | スプラッシュ画面 | 1時間 |
| Phase 2 | ウェルカム画面 | 1時間 |
| Phase 3 | 機能紹介スライド | 2-3時間 |
| Phase 4 | プロフィール設定 | 2時間 |
| Phase 5 | 統合・テスト | 1-2時間 |
| Phase 6 | イラスト・画像（オプション） | 2-3時間 |
| **合計** | | **7-12時間** |

**最短**: 7時間（イラスト既存素材使用）
**標準**: 9時間（イラスト調達）
**最長**: 12時間（カスタムイラスト作成）

---

## 📈 成功指標（KPI）

### 1. 完了率
- **目標**: オンボーディング完了率 70%以上
- **測定**: スプラッシュ表示数 ÷ 最後まで完了した数

### 2. サインアップ率
- **目標**: オンボーディング後のサインアップ率 40%以上
- **測定**: オンボーディング完了数 ÷ サインアップ数

### 3. スキップ率
- **目標**: スキップ率 30%以下
- **測定**: スキップした数 ÷ スプラッシュ表示数

### 4. 離脱率
- **目標**: 各ステップでの離脱率 10%以下
- **測定**: 各ステップでの離脱数

---

## 🎨 イラスト・画像リソース

### 推奨リソース

1. **Undraw** (https://undraw.co/)
   - 無料
   - カスタマイズ可能
   - 統一感のあるイラスト

2. **Storyset** (https://storyset.com/)
   - 無料（Freepikアカウント必要）
   - アニメーション可能
   - 高品質

3. **unDraw Korean** (検索: "korean", "travel", "search")

4. **カスタム作成**
   - Figma
   - Illustrator
   - Canva

### 必要な画像

- ✅ Hero画像: 韓国の美しいスポット（カフェ、街並みなど）
- ✅ スライド #1: 検索・発見のイメージ
- ✅ スライド #2: 写真投稿のイメージ
- ✅ スライド #3: ブックマークのイメージ

---

## 🔒 セキュリティ・プライバシー

### LocalStorage使用の注意点

- **機密情報は保存しない**
- **フラグのみ保存**（ユーザーID、トークンは保存しない）
- **XSS対策**: サニタイゼーション徹底

### プロフィール設定

- **画像アップロード**: Vercel Blob使用
- **サイズ制限**: 最大5MB
- **ファイル形式**: JPG, PNG, WebP
- **バリデーション**: サーバーサイドで再検証

---

## 🧪 テストケース

### ユニットテスト

```typescript
// src/lib/__tests__/onboarding.test.ts
describe('hasCompletedOnboarding', () => {
  it('should return false when no data in localStorage', () => {
    expect(hasCompletedOnboarding()).toBe(false)
  })

  it('should return true when completed', () => {
    markOnboardingComplete()
    expect(hasCompletedOnboarding()).toBe(true)
  })
})
```

### E2Eテスト

```typescript
// tests/e2e/onboarding.spec.ts
test('complete onboarding flow', async ({ page }) => {
  await page.goto('/')

  // スプラッシュ → ウェルカム
  await expect(page).toHaveURL('/onboarding/welcome')

  // 次へをクリック
  await page.click('button:has-text("次へ")')

  // スライド表示
  await expect(page).toHaveURL('/onboarding/slides')

  // スワイプして最後まで
  // ...

  // サインアップ
  await page.click('button:has-text("始める")')
  await expect(page).toHaveURL('/signup')
})
```

---

## 📝 実装チェックリスト

### Phase 1: スプラッシュ画面
- [ ] `/splash/page.tsx` 作成
- [ ] ロゴアニメーション実装
- [ ] `lib/onboarding.ts` 作成
- [ ] LocalStorageチェック機能
- [ ] 自動リダイレクト実装

### Phase 2: ウェルカム画面
- [ ] `/onboarding/welcome/page.tsx` 作成
- [ ] Hero画像配置
- [ ] コンテンツ作成
- [ ] CTAボタン実装
- [ ] ナビゲーション

### Phase 3: 機能紹介スライド
- [ ] `/onboarding/slides/page.tsx` 作成
- [ ] スライダーコンポーネント
- [ ] 3つのスライドコンテンツ
- [ ] スワイプジェスチャー
- [ ] プログレスインジケーター
- [ ] CTAボタン

### Phase 4: プロフィール設定
- [ ] `/onboarding/profile-setup/page.tsx` 作成
- [ ] フォーム実装
- [ ] 画像アップロード
- [ ] バリデーション
- [ ] Server Action連携
- [ ] スキップ機能

### Phase 5: 統合・テスト
- [ ] フロー全体のテスト
- [ ] エッジケース対応
- [ ] レスポンシブ確認
- [ ] パフォーマンス最適化

---

## 🚦 次のステップ

### 実装開始前の確認事項

1. **デザイン承認**
   - 画面構成OK？
   - カラーパレットOK？
   - コンテンツOK？

2. **優先度確認**
   - すぐに実装開始？
   - デザイン改善と並行？

3. **スコープ確認**
   - 全Phase実装？
   - Phase 1-3のみ？（MVP）

---

**承認いただければ、Phase 1から順次実装を開始します。**

**推定完了時間**: 7-9時間（イラスト素材調達込み）

---

**最終更新**: 2025-12-22 23:59 JST
