# 広告戦略とデザイン統合

## 📊 概要

Korea Nowの広告収益を最大化するための戦略とデザイン統合ガイド。韓国の主要サービス（Naver、Daum、Coupang等）のベストプラクティスを参考に設計。

---

## 💰 広告収益モデル

### フリーミアム戦略
- **無料プラン**: 広告表示あり
- **プレミアムプラン（¥480/月）**: 広告非表示
- **プロプラン（¥2,980/月）**: 広告非表示 + スポンサー投稿可能

### 収益目標
- **Year 1**: 広告収益目標 ¥100,000-150,000/月
- **Year 2**: 広告収益目標 ¥300,000-500,000/月

---

## 🎯 広告プラットフォーム

### 主要プラットフォーム
1. **Google AdSense** (優先)
   - 導入が簡単
   - 自動最適化
   - レスポンシブ広告対応

2. **Google Ad Manager** (将来)
   - 複数広告ネットワーク管理
   - プログラマティック広告
   - 高度なターゲティング

3. **直接広告販売** (Phase 6以降)
   - 韓国関連企業（航空会社、ホテル、旅行代理店）
   - 高単価（CPM ¥500-2,000）

---

## 📐 広告配置デザイン

### デスクトップレイアウト

```
┌─────────────────────────────────────────────────┐
│  Header (Logo, Search, User Menu)              │
├──────────────┬──────────────────────┬───────────┤
│              │                      │           │
│  Sidebar     │  Main Content        │  Right    │
│  Filter      │  - Spot Cards Grid   │  Sidebar  │
│              │  - 3 columns         │           │
│  [Ad Unit    │                      │  [Ad Unit │
│   300x250]   │  ※ Every 6 cards:    │   300x600]│
│              │  [In-Feed Ad 728x90] │           │
│              │                      │  [Ad Unit │
│              │  - More Cards        │   300x250]│
│              │                      │           │
└──────────────┴──────────────────────┴───────────┘
```

### モバイルレイアウト

```
┌──────────────────────┐
│  Header (Sticky)     │
├──────────────────────┤
│  Search Bar (Sticky) │
├──────────────────────┤
│  [Ad Unit 320x50]    │  ← Top Banner
├──────────────────────┤
│  Spot Card 1         │
│  Spot Card 2         │
│  Spot Card 3         │
├──────────────────────┤
│  [In-Feed Ad 320x100]│  ← Every 3 cards
├──────────────────────┤
│  Spot Card 4         │
│  Spot Card 5         │
│  Spot Card 6         │
├──────────────────────┤
│  [In-Feed Ad 320x100]│
├──────────────────────┤
│  ...                 │
│                      │
├──────────────────────┤
│  [Ad Unit 320x50]    │  ← Bottom (Sticky可)
└──────────────────────┘
```

---

## 🎨 広告ユニット設計

### 1. ヘッダー広告（モバイル）
**サイズ**: 320x50 (Banner)
**配置**: ヘッダー直下、スティッキー可能
**頻度**: 1ページあたり1つ
**特徴**:
- スクロール時は非表示にしてUX向上
- 韓国スタイルの角丸適用

```tsx
// components/ads/MobileBanner.tsx
export function MobileBanner() {
  return (
    <div className="md:hidden w-full bg-silk/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="rounded-korean overflow-hidden">
          {/* Google AdSense */}
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-xxxxx"
               data-ad-slot="xxxxx"
               data-ad-format="horizontal"
               data-full-width-responsive="true" />
        </div>
      </div>
    </div>
  )
}
```

### 2. インフィード広告
**サイズ**:
- デスクトップ: 728x90 (Leaderboard)
- モバイル: 320x100

**配置**: スポットカード6枚ごと（モバイルは3枚ごと）
**頻度**: 無制限（ただし密度調整可能）

```tsx
// components/ads/InFeedAd.tsx
export function InFeedAd({ index }: { index: number }) {
  // 無料プランユーザーのみ表示
  const { user } = useSession()
  if (user?.plan !== 'FREE') return null

  // 韓国スタイルのカードとして表示
  return (
    <div className="korean-card p-4 bg-gradient-to-br from-silk to-celadon/5">
      <div className="text-xs text-gray-500 mb-2">スポンサー</div>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-format="fluid"
           data-ad-layout-key="xxxxx"
           data-ad-client="ca-pub-xxxxx"
           data-ad-slot="xxxxx" />
    </div>
  )
}
```

### 3. サイドバー広告（デスクトップ）
**サイズ**:
- 300x250 (Medium Rectangle) - 標準
- 300x600 (Half Page) - プレミアム

**配置**: 右サイドバー、スティッキー
**頻度**: 1-2ユニット

```tsx
// components/ads/SidebarAd.tsx
export function SidebarAd({ size = '300x250' }: { size?: '300x250' | '300x600' }) {
  return (
    <div className="hidden lg:block sticky top-20">
      <div className="korean-card p-4">
        <div className="text-xs text-gray-500 mb-2 text-center">スポンサー</div>
        <ins className="adsbygoogle"
             style={{
               display: 'inline-block',
               width: '300px',
               height: size === '300x600' ? '600px' : '250px'
             }}
             data-ad-client="ca-pub-xxxxx"
             data-ad-slot="xxxxx" />
      </div>
    </div>
  )
}
```

### 4. スポット詳細ページ広告
**配置**:
- コンテンツ上部: 728x90 (Desktop) / 320x50 (Mobile)
- コンテンツ下部: 336x280 (Large Rectangle)
- サイドバー: 300x250

---

## 🎨 韓国スタイル広告デザイン

### デザイン原則
1. **角丸適用**: 広告コンテナに `rounded-korean`
2. **シャドウ**: 柔らかい `shadow-korean`
3. **背景グラデーション**: `from-silk to-celadon/5` で自然に溶け込む
4. **「スポンサー」ラベル**: 小さく控えめに、透明性確保

### CSS実装
```css
/* src/app/globals.css に追加 */
@layer components {
  /* 広告コンテナ */
  .ad-container {
    @apply rounded-korean overflow-hidden bg-gradient-to-br from-silk to-celadon/5;
  }

  .ad-label {
    @apply text-xs text-gray-500 mb-2;
  }

  /* プレミアム広告エリア（目立たせる） */
  .ad-premium {
    @apply korean-card p-6 border-2 border-kpop-pink/20;
  }
}
```

---

## 📱 レスポンシブ戦略

### ブレークポイント別広告
```typescript
// lib/ads.ts
export const adSizes = {
  mobile: {
    banner: { width: 320, height: 50 },
    inFeed: { width: 320, height: 100 },
    rectangle: { width: 300, height: 250 },
  },
  tablet: {
    leaderboard: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
  },
  desktop: {
    leaderboard: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    skyscraper: { width: 300, height: 600 },
  },
}

export function getAdSize(breakpoint: 'mobile' | 'tablet' | 'desktop') {
  return adSizes[breakpoint]
}
```

---

## 🚀 実装手順

### Phase 1: Google AdSense統合（Week 1）
1. **Google AdSense申請**
   - サイト審査（10-20記事以上推奨）
   - プライバシーポリシー作成
   - 広告コード取得

2. **基本広告コンポーネント作成**
   ```bash
   src/components/ads/
   ├── AdScript.tsx          # AdSense script loader
   ├── MobileBanner.tsx      # 320x50
   ├── InFeedAd.tsx          # Fluid
   ├── SidebarAd.tsx         # 300x250, 300x600
   └── AdContainer.tsx       # Wrapper
   ```

3. **広告表示ロジック実装**
   ```typescript
   // lib/ads.ts
   export function shouldShowAd(user: User | null): boolean {
     if (!user) return true  // 未ログインユーザーには表示
     return user.plan === 'FREE'  // 無料プランのみ表示
   }
   ```

### Phase 2: レイアウト調整（Week 2）
1. **グリッドレイアウト修正**
   - 6枚ごとにインフィード広告挿入
   - サイドバー追加（デスクトップ）

2. **モバイル最適化**
   - スティッキーバナー実装
   - スクロール時の表示/非表示切り替え

### Phase 3: パフォーマンス最適化（Week 3）
1. **遅延読み込み**
   - Intersection Observer APIで可視領域のみ読み込み
2. **広告ブロック検知**
   - 広告ブロッカー利用者にプレミアム誘導

### Phase 4: A/Bテスト（Week 4）
1. **配置テスト**
   - 広告密度（3枚ごと vs 6枚ごと）
   - サイズバリエーション
2. **収益最適化**
   - CTR、RPMの分析

---

## 📊 収益予測

### 前提条件
- **月間PV**: 50,000（Year 1） → 500,000（Year 2）
- **無料ユーザー比率**: 80%
- **広告表示PV**: 40,000（Year 1） → 400,000（Year 2）
- **RPM（1,000 PVあたり収益）**: ¥250-500

### Year 1 予測
- 月間広告収益: 40,000 PV × ¥0.25-0.5 = **¥10,000-20,000/月**
- 年間: **¥120,000-240,000**

### Year 2 予測
- 月間広告収益: 400,000 PV × ¥0.3-0.6 = **¥120,000-240,000/月**
- 年間: **¥1,440,000-2,880,000**

### 最適化後（Year 2+）
- ヘッダービディング導入
- プログラマティック広告
- RPM向上: ¥500-1,000
- 月間収益: **¥200,000-400,000**

---

## 🛡️ ユーザー体験への配慮

### 広告ポリシー
1. **適度な広告密度**
   - モバイル: 3スポットカードごと
   - デスクトップ: 6スポットカードごと

2. **侵入的でない**
   - ポップアップ禁止
   - 自動再生動画禁止
   - インタースティシャル広告は最小限

3. **透明性**
   - 「スポンサー」ラベル明示
   - プレミアムプランで広告非表示をアピール

4. **パフォーマンス**
   - 広告読み込みで初期表示を遅延させない
   - 遅延読み込み（Lazy Loading）
   - CLS（Cumulative Layout Shift）対策

---

## 🔧 技術実装

### Google AdSense統合
```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxx"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 広告コンポーネント（React）
```tsx
// components/ads/AdUnit.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
  className?: string
}

export function AdUnit({ slot, format = 'auto', responsive = true, className }: AdUnitProps) {
  const { data: session } = useSession()
  const adRef = useRef<HTMLDivElement>(null)

  // 無料ユーザーのみ表示
  if (session?.user?.plan !== 'FREE') return null

  useEffect(() => {
    try {
      if (adRef.current) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
```

### スポットグリッドへの統合
```tsx
// components/spots/SpotGrid.tsx
import { AdUnit } from '@/components/ads/AdUnit'

export function SpotGrid({ spots }: { spots: Spot[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spots.map((spot, index) => (
        <>
          <SpotCard key={spot.id} spot={spot} />

          {/* 6枚ごとに広告挿入（デスクトップ） */}
          {(index + 1) % 6 === 0 && (
            <div className="hidden lg:block lg:col-span-3">
              <AdUnit
                slot="xxxxx"
                format="horizontal"
                className="ad-container p-4"
              />
            </div>
          )}

          {/* 3枚ごとに広告挿入（モバイル） */}
          {(index + 1) % 3 === 0 && (
            <div className="lg:hidden">
              <AdUnit
                slot="yyyyy"
                format="rectangle"
                className="ad-container p-4"
              />
            </div>
          )}
        </>
      ))}
    </div>
  )
}
```

---

## 📈 分析・最適化

### 追跡指標
1. **RPM** (Revenue Per Mille): 1,000 PVあたりの収益
2. **CTR** (Click-Through Rate): クリック率
3. **Viewability**: 広告の可視率
4. **CLS** (Cumulative Layout Shift): レイアウトシフト

### Google Analytics統合
```typescript
// lib/analytics.ts
export function trackAdView(adUnit: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ad_view', {
      ad_unit: adUnit,
      page_path: window.location.pathname,
    })
  }
}
```

---

## ✅ チェックリスト

### 実装前
- [ ] Google AdSenseアカウント作成・審査
- [ ] プライバシーポリシー作成（GDPR対応）
- [ ] 広告配置計画承認
- [ ] デザインモックアップ作成

### 実装中
- [ ] AdScript コンポーネント
- [ ] AdUnit コンポーネント（各サイズ）
- [ ] プラン別表示ロジック
- [ ] レスポンシブ対応
- [ ] CLS対策

### 実装後
- [ ] テスト広告で動作確認
- [ ] 本番広告コード切り替え
- [ ] A/Bテスト実施
- [ ] パフォーマンス監視

---

**作成日**: 2025-12-22
**バージョン**: 1.0
