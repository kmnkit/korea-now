'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function WelcomePage() {
  const router = useRouter()

  const handleNext = () => {
    router.push('/onboarding/slides')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Image */}
      <div className="relative h-[45vh] bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder for hero image */}
          <div className="text-center px-4">
            <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
              <span className="text-6xl">🇰🇷</span>
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between px-6 py-8">
        <div className="space-y-6">
          {/* Logo badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="text-sm font-semibold text-primary">Korea Now</span>
          </div>

          {/* Main message */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Korea Now へ<br />
              ようこそ 🇰🇷
            </h1>

            <p className="text-xl font-semibold text-primary">
              韓国の「今」をシェアしよう
            </p>

            <p className="text-gray-600 leading-relaxed">
              リアルな旅行情報で<br />
              あなたの韓国旅行をもっと楽しく
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📍</span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">最新スポット</span>をリアルタイムで発見
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📸</span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">あなたの体験</span>を簡単にシェア
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🔖</span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">気になる場所</span>をブックマーク保存
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={handleNext}
            className="w-full korean-btn-primary flex items-center justify-center gap-2"
          >
            次へ
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              すでにアカウントをお持ちの方
            </p>
            <Link
              href="/login"
              className="text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
