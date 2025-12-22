'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { hasCompletedOnboarding } from '@/lib/onboarding'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    // 1.5秒後にリダイレクト
    const timer = setTimeout(() => {
      // オンボーディング完了済みならホームへ、未完了ならウェルカム画面へ
      if (hasCompletedOnboarding()) {
        router.push('/')
      } else {
        router.push('/onboarding/welcome')
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* ロゴ */}
        <div className="inline-flex w-24 h-24 rounded-2xl bg-primary shadow-korean-lg items-center justify-center mb-6 animate-scale-in">
          <span className="text-5xl font-bold text-white">
            K
          </span>
        </div>

        {/* アプリ名 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Korea<span className="text-primary">Now</span>
        </h1>

        <p className="text-gray-600 text-sm">
          「今の韓国」が、ここにある
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  )
}
