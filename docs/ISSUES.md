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

**最終更新**: 2025-12-22
