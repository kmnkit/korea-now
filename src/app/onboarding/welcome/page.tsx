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
      {/* Hero Image with Korean street background */}
      <div className="relative h-[50vh] overflow-hidden">
        {/* Background Image - Korean street scene */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2000"
            alt="Korean street"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        </div>

        {/* Text content on top of image */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
          {/* Logo badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 self-start">
            <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center">
              <span className="text-primary font-bold text-xs">K</span>
            </div>
            <span className="text-sm font-semibold text-white">Korea Now</span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl font-bold text-white leading-tight mb-3">
            Korea Now へ<br />
            ようこそ
          </h1>

          <p className="text-xl font-semibold text-white/90 mb-2">
            韓国の「今」をシェアしよう
          </p>

          <p className="text-white/80 leading-relaxed text-sm">
            リアルな旅行情報であなたの韓国旅行をもっと楽しく
          </p>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between px-6 py-6">
        <div className="space-y-5">
          {/* Features */}
          <div className="space-y-3.5">
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
