# Korea Now - Issues & Resolutions

このドキュメントは、開発中に発生した問題とその解決策を記録します。

---

## Issue #1: Vercel Build Error - Tailwind CSS Class Not Found

**発生日**: 2025-12-22
**ステータス**: ✅ 解決済み
**重要度**: 🔴 High

### 問題の詳細

Vercelデプロイ時にビルドエラーが発生：

```
Syntax error: /vercel/path0/src/app/globals.css The `bg-background` class does not exist.
If `bg-background` is a custom class, make sure it is defined within a `@layer` directive.
```

### エラーログ

```
22:59:56.721 ./src/app/globals.css:1:1
22:59:56.721 Syntax error: /vercel/path0/src/app/globals.css The `bg-background` class does not exist.
22:59:56.721 > 1 | @tailwind base;
22:59:56.721     | ^
22:59:56.721   2 | @tailwind components;
22:59:56.721   3 | @tailwind utilities;
```

### 原因

`src/app/globals.css`の中で以下のコードを使用していた：

```css
body {
  @apply bg-background text-foreground;
}
```

`bg-background`と`text-foreground`はカスタムTailwindクラスとして定義されていなかったため、Tailwindがクラスを見つけられなかった。

### 解決策

`@apply`ディレクティブを使用せず、直接CSSで指定するように修正：

```css
body {
  background-color: white;
  color: hsl(0 0% 10%);
}
```

### 関連ファイル

- `src/app/globals.css` (Line 32-35)

### 学び

1. **Tailwindの@applyディレクティブ**
   - `@apply`で使用するクラスは、Tailwindに定義されている必要がある
   - カスタムクラスを使う場合は、`tailwind.config.ts`で定義する

2. **カスタムカラーの扱い**
   - CSS変数（`--background`）とTailwindクラス（`bg-background`）は別物
   - CSS変数を使う場合は、直接CSSで指定するか、tailwind.configに追加する

3. **ビルドエラーのデバッグ**
   - ローカルとVercel環境でビルド結果が異なる場合がある
   - Vercelのビルドログを詳細に確認することが重要

### 再発防止策

- [ ] tailwind.config.tsにカスタムカラーを正しく定義
- [ ] ローカルで`npm run build`を実行して事前確認
- [ ] CIでビルドテストを自動化

### コミット

```
commit: [次のコミット]
fix(css): replace @apply with direct CSS for body styles to fix Vercel build
```

---

## Issue #2: Vercel Build Error - TypeScript Type Mismatch

**発生日**: 2025-12-22
**ステータス**: ✅ 解決済み
**重要度**: 🔴 High

### 問題の詳細

Vercelデプロイ時にTypeScriptコンパイルエラーが発生：

```
Type error: Type '{ id: string; images: string[]; name: string; category: string; area: string; likes: number; comments: number; user: { name: string; avatar: string; }; createdAt: Date; }' is missing the following properties from type '{ id: string; name: string; description: string; category: string; area: string; images: { url: string; }[]; likeCount: number; commentCount: number; viewCount?: number | undefined; createdAt: Date; user: { ...; }; }': description, likeCount, commentCount
```

### エラーログ

```
23:15:42.318 Type checking and linting...
23:15:44.680 ./src/app/(main)/profile/page.tsx:204:41
23:15:44.680 Type error: Type '{ id: string; images: string[]; name: string; category: string; area: string; likes: number; comments: number; user: { name: string; avatar: string; }; createdAt: Date; }' is missing the following properties from type '{ id: string; name: string; description: string; category: string; area: string; images: { url: string; }[]; likeCount: number; commentCount: number; viewCount?: number | undefined; createdAt: Date; user: { ...; }; }': description, likeCount, commentCount
23:15:44.681   202 |           {(activeTab === 'posts' ? mockPosts : mockBookmarks).map((spot) => (
23:15:44.681   203 |             <SpotCard
23:15:44.681 > 204 |               key={spot.id}
23:15:44.681       |                                         ^
23:15:44.681   205 |               spot={spot}
23:15:44.681   206 |             />
23:15:44.681   207 |           ))}
```

また、ESLintの警告も発生：
```
Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images.
```

### 原因

モックデータの型が `SpotCard` コンポーネントの期待する型と一致していなかった：

**問題のあったプロパティ**:
1. `description` フィールドが欠落
2. `images: string[]` → 正しくは `images: [{ url: string }]`
3. `likes` → 正しくは `likeCount`
4. `comments` → 正しくは `commentCount`
5. `user.avatar` → 正しくは `user.image`

**影響したファイル**:
- `src/app/(main)/profile/page.tsx` (モックデータ4件)
- `src/app/(main)/search/page.tsx` (モックデータ2件)

### 解決策

1. **型の修正** - SpotCardインターフェースに合わせてモックデータを更新：

```typescript
// Before (エラー)
const mockPosts = [
  {
    id: '1',
    images: ['https://picsum.photos/seed/profile1/400/300'],
    name: '성수 감성 카페',
    category: 'カフェ',
    area: 'ソウル',
    likes: 234,
    comments: 12,
    user: {
      name: user.name,
      avatar: user.avatar
    },
    createdAt: new Date('2024-01-15')
  }
]

// After (修正)
const mockPosts = [
  {
    id: '1',
    name: '성수 감성 카페',
    description: '成水洞の感性あふれるカフェ。インスタ映え間違いなし！',
    category: 'カフェ',
    area: 'ソウル',
    images: [{ url: 'https://picsum.photos/seed/profile1/400/300' }],
    likeCount: 234,
    commentCount: 12,
    user: {
      name: user.name,
      image: user.avatar
    },
    createdAt: new Date('2024-01-15')
  }
]
```

2. **画像最適化** - Next.js Imageコンポーネントに置き換え：

```tsx
// Before
<img
  src={user.avatar}
  alt={user.name}
  className="rounded-full"
/>

// After
import Image from 'next/image'

<Image
  src={user.avatar}
  alt={user.name}
  width={80}
  height={80}
  className="rounded-full"
/>
```

3. **Next.js設定** - 外部画像ドメインを許可：

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      // ... existing patterns
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
}
```

### 関連ファイル

- `src/components/spots/SpotCard.tsx` (型定義の参照元)
- `src/app/(main)/profile/page.tsx` (Line 111-159, 251-256)
- `src/app/(main)/search/page.tsx` (Line 26-59)
- `src/app/(main)/spots/new/page.tsx` (Line 174-180)
- `next.config.mjs` (Line 15-24)

### 学び

1. **型安全性の重要性**
   - TypeScript strictモードにより、早期に型の不一致を検出できる
   - モックデータも本番データと同じ型を守る必要がある

2. **コンポーネントインターフェースの一貫性**
   - コンポーネントのPropsインターフェースを変更したら、全ての使用箇所を確認
   - モックデータもインターフェース定義に従う

3. **Next.js Image最適化**
   - `<img>` より `<Image>` を使用することでLCP改善とバンドワイズ削減
   - 外部画像を使う場合は `next.config.mjs` の `remotePatterns` 設定が必須

4. **Vercelビルドエラーのデバッグ**
   - ローカルでは `next build` でTypeScriptエラーを事前チェック可能
   - エラーメッセージから欠落しているプロパティを特定し、型定義を確認

### 再発防止策

- [x] モックデータの型定義を明示的にする（`const mockPosts: SpotCardProps['spot'][]`）
- [ ] Zodなどでランタイム型検証を追加
- [ ] ESLint ruleで `<img>` 使用を警告
- [ ] Pre-commit hookでTypeScriptエラーをチェック

### コミット

```
commit: 06a08e0
fix(types): resolve TypeScript errors and ESLint warnings for Vercel build

- Fix type mismatches in profile/page.tsx mock data
- Fix type mismatches in search/page.tsx mock data
- Replace <img> with Next.js <Image> component in profile and new spot pages
- Add external image domains to next.config.mjs (picsum.photos, placehold.co, i.pravatar.cc)
```

---

## Issue #3: Vercel Build Error - TypeScript Literal Type Comparison

**発生日**: 2025-12-22
**ステータス**: ✅ 解決済み
**重要度**: 🟡 Medium

### 問題の詳細

Vercelデプロイ時にTypeScriptコンパイルエラーが発生：

```
Type error: This comparison appears to be unintentional because the types '"PREMIUM"' and '"FREE"' have no overlap.
```

### エラーログ

```
23:21:54.619 ./src/app/(main)/profile/page.tsx:246:8
23:21:54.619 Type error: This comparison appears to be unintentional because the types '"PREMIUM"' and '"FREE"' have no overlap.
23:21:54.619
23:21:54.619 [0m [90m 244 |[39m[0m
23:21:54.619 [0m [90m 245 |[39m       {[90m/* プレミアムバナー（フリーユーザーの場合表示） */[39m}[0m
23:21:54.620 [0m[31m[1m>[22m[39m[90m 246 |[39m       {user[33m.[39mplan [33m===[39m [32m'FREE'[39m [33m&&[39m ([0m
23:21:54.620 [0m [90m     |[39m        [31m[1m^[22m[39m[0m
23:21:54.620 [0m [90m 247 |[39m         [33m<[39m[33mdiv[39m className[33m=[39m[32m"mx-4 mb-4"[39m[33m>[39m[0m
```

### 原因

モックデータで `plan` プロパティを `'PREMIUM' as const` と定義していた：

```typescript
const user = {
  // ... other properties
  plan: 'PREMIUM' as const  // ← これが問題
}
```

`as const` により、TypeScriptは `plan` の型を文字列リテラル `'PREMIUM'` と推論する。そのため、後続のコードで `user.plan === 'FREE'` という比較を行うと、TypeScriptは「`'PREMIUM'` 型と `'FREE'` 型は重複がない」と警告を出す。

### 解決策

`plan` プロパティの型をユニオン型に変更：

```typescript
// Before (エラー)
const user = {
  plan: 'PREMIUM' as const
}

// After (修正)
const user = {
  plan: 'PREMIUM' as 'PREMIUM' | 'FREE'
}
```

これにより、`plan` は `'PREMIUM'` または `'FREE'` のいずれかの値を取ることができるようになり、条件分岐が可能になる。

### 関連ファイル

- `src/app/(main)/profile/page.tsx` (Line 24)

### 学び

1. **TypeScript `as const` の挙動**
   - `as const` は値を文字列リテラル型として固定する
   - 固定された文字列リテラル型は他の値と比較できない
   - 複数の値を取りうる場合はユニオン型を使用する

2. **型安全性とモックデータ**
   - モックデータも本番データと同じ型制約を持つべき
   - 条件分岐がある場合、その全てのケースをカバーする型を定義する

3. **早期エラー検出**
   - TypeScript strictモードにより、ビルド時に論理エラーを検出
   - 「絶対に真にならない比較」を事前に防げる

### 再発防止策

- [x] モックデータの型定義を見直し、実際の使用ケースに合わせる
- [ ] User型を明示的に定義し、planプロパティを型定義に含める
- [ ] モックデータ生成時に型チェックを行う

### コミット

```
commit: 8784a46
fix(types): allow both PREMIUM and FREE plan types in profile user mock data

- Change plan type from 'as const' to union type 'PREMIUM' | 'FREE'
- This fixes TypeScript error: comparison between incompatible literal types
- Allows conditional rendering of premium banner for FREE users
```

---

## テンプレート（次の問題用）

```markdown
## Issue #X: [問題のタイトル]

**発生日**: YYYY-MM-DD
**ステータス**: ⏳ 調査中 / ✅ 解決済み / ❌ 未解決
**重要度**: 🔴 High / 🟡 Medium / 🟢 Low

### 問題の詳細

### エラーログ

### 原因

### 解決策

### 関連ファイル

### 学び

### 再発防止策

### コミット
```

---

**最終更新**: 2025-12-22 23:45 JST
