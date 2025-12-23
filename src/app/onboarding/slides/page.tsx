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

  // スクロール位置からcurrentSlideを更新（デバウンス付き）
  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const scrollLeft = scrollContainerRef.current.scrollLeft
    const slideWidth = scrollContainerRef.current.offsetWidth
    const newSlide = Math.round(scrollLeft / slideWidth)

    if (newSlide !== currentSlide && newSlide >= 0 && newSlide < slides.length) {
      setCurrentSlide(newSlide)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let timeoutId: NodeJS.Timeout
    const debouncedScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 100)
    }

    container.addEventListener('scroll', debouncedScroll)
    return () => {
      clearTimeout(timeoutId)
      container.removeEventListener('scroll', debouncedScroll)
    }
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
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Skip button */}
      <div className="absolute top-4 right-4 z-20">
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
        className="flex-1 flex overflow-x-auto scrollbar-hide"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full flex-shrink-0 flex flex-col items-center px-6 py-16"
            style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
          >
            {/* Top spacer */}
            <div className="flex-1 flex items-center justify-center">
              <div className="space-y-10">
                {/* Icon */}
                <div
                  className={`w-36 h-36 rounded-3xl ${slide.bgColor} flex items-center justify-center mx-auto`}
                >
                  <span className="text-7xl">{slide.icon}</span>
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900 whitespace-pre-line leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto text-base">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs for last slide */}
            {index === slides.length - 1 && (
              <div className="w-full max-w-sm space-y-3 mt-8 mb-20">
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

      {/* Page indicators - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 pb-safe pb-8 pt-4 flex justify-center gap-2 bg-white z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-primary w-8'
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
            aria-label={`スライド ${index + 1} へ移動`}
          />
        ))}
      </div>
    </div>
  )
}
