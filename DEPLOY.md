# Korea Now - Vercel デプロイ手順

このドキュメントは、Korea NowアプリをVercelにデプロイする手順です。

---

## 📋 前提条件

- GitHubリポジトリにコードがプッシュ済み ✅
- Vercelアカウント（https://vercel.com）

---

## 🚀 デプロイ手順

### オプション1: Vercel Dashboard（推奨）

1. **Vercel Dashboardにアクセス**
   - https://vercel.com/dashboard にアクセス
   - GitHubアカウントでログイン

2. **新規プロジェクトをインポート**
   - 「Add New...」→「Project」をクリック
   - GitHubリポジトリ `kmnkit/korea-now` を選択
   - ブランチ: `claude/korea-travel-app-Btzzd` を選択

3. **プロジェクト設定**
   ```
   Project Name: korea-now
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **環境変数の設定（後で設定可能）**
   現在はモックデータのみなので、環境変数は不要です。
   将来的に以下の環境変数を追加：
   ```
   DATABASE_URL=<Vercel Postgres接続文字列>
   NEXTAUTH_URL=<デプロイされたURL>
   NEXTAUTH_SECRET=<ランダムな文字列>
   NEXT_PUBLIC_APP_URL=<デプロイされたURL>
   ```

5. **デプロイ実行**
   - 「Deploy」ボタンをクリック
   - ビルドログを確認
   - デプロイ完了後、URLが発行されます

### オプション2: Vercel CLI

```bash
# 認証（初回のみ）
npx vercel login

# デプロイ
npx vercel --prod

# または開発環境
npx vercel
```

---

## 🌐 デプロイ後の確認

デプロイが成功すると、以下のURLでアクセスできます：
- **Production**: `https://korea-now-<random>.vercel.app`
- **ブランチプレビュー**: `https://korea-now-<branch>-<random>.vercel.app`

### 確認ページ

| ページ | パス |
|--------|------|
| ホーム | `/` |
| スポット詳細 | `/spots/1` |
| 投稿フォーム | `/spots/new` |
| 検索 | `/search` |
| プロフィール | `/profile` |
| ログイン | `/login` |
| サインアップ | `/signup` |

### モバイル表示確認

ブラウザの開発者ツールでデバイスモード:
- iPhone 14 Pro: 393×852
- iPhone SE: 375×667
- Galaxy S21: 360×800

---

## 🔧 トラブルシューティング

### ビルドエラー: Google Fonts

Vercel環境では正常にビルドされるはずです。もしエラーが出る場合：

1. **ビルドログを確認**
   - Vercel Dashboard → プロジェクト → Deployments → 最新デプロイ → Build Logs

2. **環境変数の確認**
   - Settings → Environment Variables

3. **Node.jsバージョン**
   - 現在のプロジェクトは Node.js 20+ を推奨
   - Settings → General → Node.js Version で設定可能

### PWAアイコンエラー

manifest.jsonでアイコンを指定していますが、実際のアイコンファイルはまだ作成していません。
これはワーニングのみで、アプリは正常に動作します。

---

## 📱 カスタムドメイン設定（オプション）

1. Vercel Dashboard → プロジェクト → Settings → Domains
2. 「Add Domain」をクリック
3. ドメイン名を入力（例: korea-now.com）
4. DNSレコードを設定
5. SSL証明書が自動発行されます

---

## 🔄 自動デプロイ

GitHubリポジトリにプッシュすると、自動的にデプロイされます：
- **main ブランチ** → Production環境
- **その他のブランチ** → Preview環境

---

## 📊 現在の状態

- ✅ フロントエンド完成（モックデータ）
- ⏳ データベース未接続
- ⏳ 認証未実装
- ⏳ 実際の画像アップロード未実装

**次のステップ**:
1. デザイン確認
2. フィードバック反映
3. Vercel Postgresセットアップ
4. NextAuth.js設定
5. 本番機能実装

---

**最終更新**: 2025-12-22
