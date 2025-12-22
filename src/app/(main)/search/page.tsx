'use client'

import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { SpotCard } from '@/components/spots/SpotCard'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'likes'>('latest')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    'カフェ', 'レストラン', '観光地', 'ショッピング',
    'エンタメ', 'ホテル', '美容', 'その他'
  ]

  const areas = [
    'ソウル', '釜山', '済州島', '仁川', '大邱',
    '光州', '大田', 'その他'
  ]

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleArea = (area: string) => {
    setSelectedAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedAreas([])
    setSortBy('latest')
  }

  // モックデータ（実際はAPIから取得）
  const mockSpots = [
    {
      id: '1',
      name: '성수 감성 카페',
      description: '成水洞の感性あふれるカフェ。インスタ映え間違いなし！',
      category: 'カフェ',
      area: 'ソウル',
      images: [{ url: 'https://picsum.photos/seed/search1/400/300' }],
      likeCount: 1234,
      commentCount: 56,
      user: {
        name: '김지수',
        image: 'https://i.pravatar.cc/150?img=1'
      },
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: '광안리 바다뷰 카페',
      description: '広安里のオーシャンビューカフェ。海を眺めながらゆったり。',
      category: 'カフェ',
      area: '釜山',
      images: [{ url: 'https://picsum.photos/seed/search2/400/300' }],
      likeCount: 892,
      commentCount: 34,
      user: {
        name: '박민준',
        image: 'https://i.pravatar.cc/150?img=2'
      },
      createdAt: new Date('2024-01-14')
    }
  ]

  const activeFilterCount = selectedCategories.length + selectedAreas.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 検索ヘッダー */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-3">
          {/* 検索バー */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="スポット、エリア、タグを検索..."
              className="w-full pl-11 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* フィルターボタン */}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                showFilters || activeFilterCount > 0
                  ? 'bg-primary text-white shadow-korean'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              フィルター
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* ソート */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border-none focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="latest">最新順</option>
              <option value="popular">人気順</option>
              <option value="likes">いいね順</option>
            </select>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="ml-auto text-sm text-gray-500 hover:text-gray-700"
              >
                クリア
              </button>
            )}
          </div>
        </div>

        {/* フィルターパネル */}
        {showFilters && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-4">
            {/* カテゴリフィルター */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                カテゴリ
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-primary text-white shadow-korean'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* エリアフィルター */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                エリア
              </h3>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => toggleArea(area)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedAreas.includes(area)
                        ? 'bg-accent text-white shadow-korean'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 検索結果 */}
      <div className="px-4 py-4">
        {searchQuery || activeFilterCount > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{mockSpots.length}</span>
                件のスポットが見つかりました
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {mockSpots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          </>
        ) : (
          // 検索前の状態
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-celadon/20 to-kpop-blue/20 flex items-center justify-center">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              スポットを検索
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              気になるスポット、エリア、タグで検索してみましょう
            </p>

            {/* 人気タグ */}
            <div className="max-w-md mx-auto">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-left">
                人気タグ
              </h4>
              <div className="flex flex-wrap gap-2">
                {['#インスタ映え', '#カップル', '#デート', '#一人旅', '#穴場', '#夜景'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-gray-700 hover:bg-primary/20 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 最近の検索 */}
            <div className="max-w-md mx-auto mt-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 text-left">
                最近の検索
              </h4>
              <div className="space-y-2">
                {['성수동 카페', '광안리 맛집', '제주도 관광지'].map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(query)}
                    className="w-full px-4 py-3 rounded-lg bg-white shadow-korean text-left flex items-center justify-between group hover:shadow-korean-lg transition-all"
                  >
                    <span className="text-sm text-gray-700">{query}</span>
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
