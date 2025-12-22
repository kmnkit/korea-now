import { SpotCard } from '@/components/spots/SpotCard'

// モックデータ
const mockSpots = [
  {
    id: '1',
    name: '弘大の隠れ家カフェ "서울의봄"',
    description: '韓国の春をテーマにした落ち着いた雰囲気のカフェ。手作りケーキとラテアートが人気です。',
    category: 'カフェ',
    area: 'ソウル',
    images: [{ url: 'https://placehold.co/600x450/94C9A9/white?text=Cafe' }],
    likeCount: 234,
    commentCount: 45,
    viewCount: 1203,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
    user: {
      name: 'みお',
      image: undefined,
    },
  },
  {
    id: '2',
    name: '江南のモダン韓定食 "한정식 가온"',
    description: 'ミシュラン星付きの高級韓定食レストラン。伝統と革新が融合した美しい盛り付けが魅力。',
    category: 'レストラン',
    area: 'ソウル',
    images: [{ url: 'https://placehold.co/600x450/FF3E9A/white?text=Restaurant' }],
    likeCount: 892,
    commentCount: 128,
    viewCount: 4521,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5時間前
    user: {
      name: 'ユナ',
      image: undefined,
    },
  },
  {
    id: '3',
    name: '北村韓屋村の隠れた撮影スポット',
    description: '観光客が少ない静かな路地。伝統家屋と現代アートが調和した穴場スポットです。',
    category: '観光スポット',
    area: 'ソウル',
    images: [{ url: 'https://placehold.co/600x450/00D9FF/white?text=Spot' }],
    likeCount: 567,
    commentCount: 89,
    viewCount: 3102,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12時間前
    user: {
      name: 'たけし',
      image: undefined,
    },
  },
  {
    id: '4',
    name: '梨泰院の夜景バー "SKYLINE"',
    description: 'ソウルタワーが一望できる屋上バー。夜景とカクテルを楽しめる大人の空間。',
    category: 'ナイトライフ',
    area: 'ソウル',
    images: [{ url: 'https://placehold.co/600x450/9D4EDD/white?text=Bar' }],
    likeCount: 1024,
    commentCount: 203,
    viewCount: 5847,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
    user: {
      name: 'ジミン',
      image: undefined,
    },
  },
  {
    id: '5',
    name: '明洞のコスメショップ "올리브영 메가스토어"',
    description: '韓国コスメが一堂に集まる大型店舗。最新トレンドコスメをチェックするならここ！',
    category: 'ショッピング',
    area: 'ソウル',
    images: [{ url: 'https://placehold.co/600x450/C62E2E/white?text=Shopping' }],
    likeCount: 445,
    commentCount: 67,
    viewCount: 2316,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5日前
    user: {
      name: 'さくら',
      image: undefined,
    },
  },
  {
    id: '6',
    name: '益善洞の韓服レンタル "한복남"',
    description: 'インスタ映え間違いなし！伝統韓服から現代風アレンジまで豊富な品揃え。',
    category: 'その他',
    area: 'ソウル',
    images: [{ url: 'https://placehold.co/600x450/94C9A9/white?text=Hanbok' }],
    likeCount: 678,
    commentCount: 112,
    viewCount: 3891,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2日前
    user: {
      name: 'ハナ',
      image: undefined,
    },
  },
]

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* カテゴリフィルター（横スクロール） */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {['すべて', 'カフェ', 'レストラン', '観光スポット', 'ショッピング', 'ナイトライフ'].map((category) => (
          <button
            key={category}
            className={
              category === 'すべて'
                ? 'korean-btn-primary text-sm py-2 px-4 whitespace-nowrap'
                : 'px-4 py-2 rounded-korean bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary-dark transition-colors whitespace-nowrap'
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* スポットグリッド */}
      <div className="grid grid-cols-1 gap-4">
        {mockSpots.map((spot, index) => (
          <div key={spot.id}>
            <SpotCard spot={spot} />

            {/* 3枚ごとに広告プレースホルダー */}
            {(index + 1) % 3 === 0 && (
              <div className="mt-4 korean-card p-4 bg-white">
                <div className="text-xs text-gray-500 text-center mb-2">スポンサー</div>
                <div className="aspect-[320/100] bg-primary/5 rounded-korean flex items-center justify-center">
                  <span className="text-gray-400 text-sm">広告プレースホルダー</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* もっと見る */}
      <div className="text-center py-4">
        <button className="korean-btn-outline">
          もっと見る
        </button>
      </div>
    </div>
  )
}
