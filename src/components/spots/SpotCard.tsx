'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Bookmark, MapPin, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'

interface SpotCardProps {
  spot: {
    id: string
    name: string
    description: string
    category: string
    area: string
    images: { url: string }[]
    likeCount: number
    commentCount: number
    viewCount?: number
    createdAt: Date
    user: {
      name: string
      image?: string
    }
  }
  onLike?: () => void
  onBookmark?: () => void
  isLiked?: boolean
  isBookmarked?: boolean
}

export function SpotCard({
  spot,
  onLike,
  onBookmark,
  isLiked = false,
  isBookmarked = false,
}: SpotCardProps) {
  return (
    <Link href={`/spots/${spot.id}`} className="block">
      <div className="korean-card group">
        {/* 画像 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={spot.images[0]?.url || '/placeholder.jpg'}
            alt={spot.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* カテゴリバッジ */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-celadon-dark shadow-sm">
              {spot.category}
            </span>
          </div>

          {/* エリアバッジ */}
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
              <MapPin className="w-3 h-3" />
              {spot.area}
            </span>
          </div>

          {/* ユーザー情報（画像上） */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden border border-white/40">
              {spot.user.image ? (
                <Image
                  src={spot.user.image}
                  alt={spot.user.name}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary" />
              )}
            </div>
            <span className="text-xs text-white/90 font-medium drop-shadow">
              {spot.user.name}
            </span>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-3 space-y-2">
          {/* タイトル */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-celadon-dark transition-colors">
            {spot.name}
          </h3>

          {/* 説明 */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {spot.description}
          </p>

          {/* メタ情報とアクション */}
          <div className="flex items-center justify-between pt-2">
            {/* 時間 */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(spot.createdAt)}</span>
            </div>

            {/* アクション */}
            <div className="flex items-center gap-3">
              {/* いいね */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onLike?.()
                }}
                className={cn(
                  'flex items-center gap-1 text-xs transition-colors',
                  isLiked ? 'text-secondary' : 'text-gray-500 hover:text-secondary'
                )}
              >
                <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
                <span className="font-medium">{spot.likeCount}</span>
              </button>

              {/* コメント */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MessageCircle className="w-4 h-4" />
                <span>{spot.commentCount}</span>
              </div>

              {/* ブックマーク */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onBookmark?.()
                }}
                className={cn(
                  'transition-colors',
                  isBookmarked ? 'text-accent' : 'text-gray-500 hover:text-accent'
                )}
              >
                <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-current')} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
