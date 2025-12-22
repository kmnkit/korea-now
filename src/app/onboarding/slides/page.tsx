'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { markOnboardingComplete } from '@/lib/onboarding'

const slides = [
  {
    id: 'discover',
    icon: '🔍',
    title: '最新スポットを\n発見しよう',
    description:
      'カフェ、レストラン、観光地、ショップなど韓国の「今」をリアルタイムで',
    bgColor: 'bg-primary/5',
  },
  {
    id: 'share',
    icon: '📸',
    title: 'あなたの体験を\nシェアしよう',
    description: '写真と一緒におすすめスポットを投稿して、みんなの旅をサポート',
    bgColor: 'bg-secondary/5',
  },
  {
    id: 'save',
    icon: '🔖',
    title: '気になるスポットを\n保存しよう',
    description: 'いいね＆ブックマークで後から見返せる。旅行計画も簡単！',
    bgColor: 'bg-accent/5',
  },
]

export default function SlidesPage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // スクロール位置からcurrentSlideを更新
  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const scrollLeft = scrollContainerRef.current.scrollLeft
    const slideWidth = scrollContainerRef.current.offsetWidth
    const newSlide = Math.round(scrollLeft / slideWidth)

    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentSlide])

  const handleGetStarted = () => {
    router.push('/signup')
  }

  const handleSkip = () => {
    markOnboardingComplete(true) // スキップしたことを記録
    router.push('/')
  }

  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return

    const slideWidth = scrollContainerRef.current.offsetWidth
    scrollContainerRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          スキップ
        </button>
      </div>

      {/* Slides container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full flex-shrink-0 snap-center flex flex-col items-center justify-center px-8 py-12"
          >
            {/* Icon */}
            <div
              className={`w-32 h-32 rounded-3xl ${slide.bgColor} flex items-center justify-center mb-8`}
            >
              <span className="text-6xl">{slide.icon}</span>
            </div>

            {/* Content */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 whitespace-pre-line leading-tight">
                {slide.title}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {slide.description}
              </p>
            </div>

            {/* CTAs for last slide */}
            {index === slides.length - 1 && (
              <div className="w-full max-w-sm space-y-3 mt-auto">
                <button onClick={handleGetStarted} className="w-full korean-btn-primary">
                  始める
                </button>
                <button
                  onClick={handleSkip}
                  className="w-full px-6 py-3 rounded-korean font-semibold text-gray-600 hover:bg-gray-100 transition-all"
                >
                  スキップして閲覧
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Page indicators */}
      <div className="pb-8 pt-4 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-primary w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`スライド ${index + 1} へ移動`}
          />
        ))}
      </div>
    </div>
  )
}
