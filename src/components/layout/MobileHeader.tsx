'use client'

import Link from 'next/link'
import { Search, Menu, Plus, User, Bell } from 'lucide-react'
import { useState } from 'react'

export function MobileHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      {/* メインヘッダー */}
      <div className="px-4 h-14 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-korean">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            Korea<span className="text-primary">Now</span>
          </span>
        </Link>

        {/* アクション */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full"></span>
          </button>

          <Link
            href="/spots/new"
            className="korean-btn-primary text-sm py-2 px-3 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            投稿
          </Link>
        </div>
      </div>

      {/* 検索バー（展開時） */}
      {isSearchOpen && (
        <div className="px-4 pb-3 border-t border-gray-100">
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="スポット、エリアを検索..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}
