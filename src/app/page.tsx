export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-celadon via-kpop-blue to-kpop-pink">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* ロゴ */}
          <div className="mb-8 inline-flex items-center justify-center">
            <div className="w-20 h-20 rounded-korean-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-korean-lg">
              <span className="text-4xl font-bold bg-gradient-to-br from-celadon to-kpop-pink bg-clip-text text-transparent">
                K
              </span>
            </div>
          </div>

          {/* タイトル */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            Korea Now
          </h1>

          <p className="text-2xl md:text-3xl text-white/90 mb-4">
            「今の韓国」が、ここにある
          </p>

          <p className="text-lg md:text-xl text-white/80 mb-12">
            日本在住の韓国人や韓国好きのための<br />
            最新トレンドスポット共有アプリ
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-korean-lg bg-white text-celadon-dark font-bold text-lg hover:shadow-korean-lg transition-all hover:scale-105">
              無料で始める
            </button>
            <button className="px-8 py-4 rounded-korean-lg bg-white/10 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30">
              詳しく見る
            </button>
          </div>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section className="py-20 px-4 bg-silk">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            主な機能
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 機能カード1 */}
            <div className="korean-card p-8 hover:shadow-korean-lg">
              <div className="w-16 h-16 rounded-korean bg-celadon/10 flex items-center justify-center mb-6">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                スポット投稿
              </h3>
              <p className="text-gray-600">
                カフェ、レストラン、観光地など、韓国の最新トレンドスポットを簡単に投稿・共有できます。
              </p>
            </div>

            {/* 機能カード2 */}
            <div className="korean-card p-8 hover:shadow-korean-lg">
              <div className="w-16 h-16 rounded-korean bg-kpop-pink/10 flex items-center justify-center mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                検索・フィルター
              </h3>
              <p className="text-gray-600">
                カテゴリ、エリア、タグで簡単に絞り込み。あなたにぴったりのスポットがすぐ見つかります。
              </p>
            </div>

            {/* 機能カード3 */}
            <div className="korean-card p-8 hover:shadow-korean-lg">
              <div className="w-16 h-16 rounded-korean bg-kpop-blue/10 flex items-center justify-center mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                安全なコミュニティ
              </h3>
              <p className="text-gray-600">
                AI + ユーザー通報 + 管理者の3層モデレーションで、健全なコミュニティを維持します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-korean bg-gradient-to-br from-celadon to-kpop-blue flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-xl font-bold">Korea Now</span>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            「今の韓国」を共有しよう
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Korea Now. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
