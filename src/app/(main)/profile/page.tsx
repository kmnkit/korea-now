'use client'

import Image from 'next/image'
import { Settings, MapPin, Calendar, Grid3x3, Bookmark } from 'lucide-react'
import { useState } from 'react'
import { SpotCard } from '@/components/spots/SpotCard'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'bookmarks'>('posts')

  // モックデータ
  const user = {
    name: '김지수',
    username: '@jisoo_kr',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: '韓国の素敵なスポットを共有しています ✨\n美味しいもの、綺麗な場所が大好き 🇰🇷',
    location: 'Seoul, Korea',
    joinedAt: new Date('2023-06-15'),
    stats: {
      posts: 42,
      followers: 1234,
      following: 567
    },
    plan: 'PREMIUM' as 'PREMIUM' | 'FREE'
  }

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
    },
    {
      id: '2',
      name: '한강 야경 명소',
      description: '漢江の夜景スポット。夕暮れ時が特におすすめ。',
      category: '観光地',
      area: 'ソウル',
      images: [{ url: 'https://picsum.photos/seed/profile2/400/300' }],
      likeCount: 567,
      commentCount: 34,
      user: {
        name: user.name,
        image: user.avatar
      },
      createdAt: new Date('2024-01-14')
    },
    {
      id: '3',
      name: '명동 맛집',
      description: '明洞の人気グルメスポット。本場の韓国料理を堪能。',
      category: 'レストラン',
      area: 'ソウル',
      images: [{ url: 'https://picsum.photos/seed/profile3/400/300' }],
      likeCount: 432,
      commentCount: 28,
      user: {
        name: user.name,
        image: user.avatar
      },
      createdAt: new Date('2024-01-13')
    },
    {
      id: '4',
      name: '북촌 한옥마을',
      description: '北村韓屋村。伝統的な韓屋が並ぶ美しい街並み。',
      category: '観光地',
      area: 'ソウル',
      images: [{ url: 'https://picsum.photos/seed/profile4/400/300' }],
      likeCount: 891,
      commentCount: 45,
      user: {
        name: user.name,
        image: user.avatar
      },
      createdAt: new Date('2024-01-12')
    }
  ]

  const formatJoinDate = (date: Date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月から利用`
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* プロフィールヘッダー */}
      <div className="bg-white border-b border-gray-200">
        {/* 設定ボタン */}
        <div className="px-4 pt-4 flex justify-end">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="px-4 pb-6">
          {/* アバター */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative w-20 h-20">
              <Image
                src={user.avatar}
                alt={user.name}
                width={80}
                height={80}
                className="rounded-full object-cover border-4 border-white shadow-korean"
              />
              {user.plan === 'PREMIUM' && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
              )}
            </div>

            {/* 統計 */}
            <div className="flex-1 flex justify-around pt-2">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.posts}</div>
                <div className="text-xs text-gray-600">投稿</div>
              </div>
              <div className="text-center cursor-pointer hover:opacity-70 transition-opacity">
                <div className="text-xl font-bold text-gray-900">{user.stats.followers}</div>
                <div className="text-xs text-gray-600">フォロワー</div>
              </div>
              <div className="text-center cursor-pointer hover:opacity-70 transition-opacity">
                <div className="text-xl font-bold text-gray-900">{user.stats.following}</div>
                <div className="text-xs text-gray-600">フォロー中</div>
              </div>
            </div>
          </div>

          {/* 名前とユーザー名 */}
          <div className="mb-3">
            <h1 className="text-lg font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.username}</p>
          </div>

          {/* バイオ */}
          <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">
            {user.bio}
          </p>

          {/* メタ情報 */}
          <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {user.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatJoinDate(user.joinedAt)}
            </div>
          </div>

          {/* プロフィール編集ボタン */}
          <button className="w-full korean-btn-outline text-sm py-2.5">
            プロフィールを編集
          </button>
        </div>
      </div>

      {/* タブ */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 font-medium text-sm transition-colors relative ${
              activeTab === 'posts'
                ? 'text-gray-900'
                : 'text-gray-500'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            投稿
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 font-medium text-sm transition-colors relative ${
              activeTab === 'bookmarks'
                ? 'text-gray-900'
                : 'text-gray-500'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            ブックマーク
            {activeTab === 'bookmarks' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="px-4 py-4">
        {activeTab === 'posts' ? (
          mockPosts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {mockPosts.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Grid3x3 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                まだ投稿がありません
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                素敵なスポットを見つけたら共有してみましょう
              </p>
              <button className="korean-btn-primary">
                最初のスポットを投稿
              </button>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
              <Bookmark className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              ブックマークがありません
            </h3>
            <p className="text-sm text-gray-600">
              気になるスポットを保存して後で見返しましょう
            </p>
          </div>
        )}
      </div>

      {/* プレミアムバナー（フリーユーザーの場合表示） */}
      {user.plan === 'FREE' && (
        <div className="mx-4 mb-4">
          <div className="bg-primary rounded-korean p-4 text-white">
            <h3 className="text-lg font-bold mb-1">
              プレミアムにアップグレード
            </h3>
            <p className="text-sm opacity-90 mb-3">
              無制限の投稿、優先表示、詳細な分析など
            </p>
            <button className="w-full bg-white text-primary font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
              詳しく見る
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
