import Image from 'next/image'
import Link from 'next/link'
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react'

// モックデータ
const mockSpot = {
  id: '1',
  name: '弘大の隠れ家カフェ "서울의봄"',
  description:
    '韓国の春をテーマにした落ち着いた雰囲気のカフェ。手作りケーキとラテアートが人気です。窓際の席からは弘大の街並みが一望でき、ゆったりとした時間を過ごせます。',
  category: 'カフェ',
  area: 'ソウル',
  address: 'ソウル特別市 麻浦区 弘益路3キル 20',
  budget: 'MEDIUM', // 10,000~30,000ウォン
  hours: '10:00 - 22:00（月曜定休）',
  mapLink: 'https://maps.google.com',
  images: [
    { url: 'https://placehold.co/800x600/94C9A9/white?text=Cafe+1', order: 0 },
    { url: 'https://placehold.co/800x600/B8E6D0/white?text=Cafe+2', order: 1 },
    { url: 'https://placehold.co/800x600/6BAA8A/white?text=Cafe+3', order: 2 },
  ],
  tags: ['カップル', 'インスタ映え', '弘大', 'ラテアート'],
  likeCount: 234,
  commentCount: 45,
  viewCount: 1203,
  isLiked: false,
  isBookmarked: false,
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  user: {
    name: 'みお',
    image: undefined,
    bio: 'ソウル在住のカフェ巡り好き☕',
  },
  comments: [
    {
      id: '1',
      user: { name: 'さくら', image: undefined },
      content: '先週行ってきました！本当に雰囲気が良くて、ケーキも美味しかったです💕',
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: '2',
      user: { name: 'ユナ', image: undefined },
      content: 'ここのラテアート本当にすごい！写真映えします📸',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
    },
  ],
}

export default function SpotDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="-mt-4 -mx-4 pb-safe">
      {/* 戻るボタン */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-korean"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </Link>
      </div>

      {/* 画像ギャラリー */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {mockSpot.images.map((image, index) => (
            <div key={index} className="relative min-w-full aspect-[4/3] snap-center">
              <Image src={image.url} alt={`${mockSpot.name} ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* 画像インジケーター */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {mockSpot.images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${
                index === 0 ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* コンテンツ */}
      <div className="px-4 py-4 space-y-6">
        {/* ヘッダー情報 */}
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-celadon/10 text-celadon-dark text-xs font-semibold">
                  {mockSpot.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {mockSpot.area}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{mockSpot.name}</h1>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex items-center gap-2">
            <button className="flex-1 korean-btn-primary flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              <span>いいね {mockSpot.likeCount}</span>
            </button>
            <button className="korean-btn-outline flex items-center justify-center gap-2">
              <Bookmark className="w-4 h-4" />
              保存
            </button>
            <button className="p-3 rounded-korean border border-gray-200 hover:bg-gray-50">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {mockSpot.tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700">
              #{tag}
            </span>
          ))}
        </div>

        {/* 説明 */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">説明</h2>
          <p className="text-gray-700 leading-relaxed">{mockSpot.description}</p>
        </div>

        {/* 詳細情報 */}
        <div className="korean-card p-4 space-y-3">
          <h2 className="text-lg font-bold text-gray-900">詳細情報</h2>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-900">住所</div>
              <div className="text-sm text-gray-600">{mockSpot.address}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-900">営業時間</div>
              <div className="text-sm text-gray-600">{mockSpot.hours}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-900">予算</div>
              <div className="text-sm text-gray-600">₩10,000 - ₩30,000</div>
            </div>
          </div>

          <Link
            href={mockSpot.mapLink}
            target="_blank"
            className="korean-btn-outline w-full flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            地図で見る
          </Link>
        </div>

        {/* 投稿者情報 */}
        <div className="korean-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-celadon to-kpop-pink flex items-center justify-center text-white font-bold">
              {mockSpot.user.name[0]}
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-900">{mockSpot.user.name}</div>
              <div className="text-sm text-gray-600">{mockSpot.user.bio}</div>
            </div>
            <button className="korean-btn-outline text-sm py-2 px-4">フォロー</button>
          </div>
        </div>

        {/* コメント */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              コメント <span className="text-gray-500">({mockSpot.commentCount})</span>
            </h2>
          </div>

          <div className="space-y-4">
            {mockSpot.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-kpop-pink to-kpop-blue flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900">{comment.user.name}</span>
                    <span className="text-xs text-gray-500">
                      {Math.floor((Date.now() - comment.createdAt.getTime()) / 1000 / 60)}分前
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* コメント入力 */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="コメントを書く..."
              className="flex-1 px-4 py-3 rounded-korean border border-gray-200 focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent"
            />
            <button className="korean-btn-primary py-3 px-6">送信</button>
          </div>
        </div>
      </div>
    </div>
  )
}
