'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { hasCompletedOnboarding } from '@/lib/onboarding'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileNav } from '@/components/layout/MobileNav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // オンボーディング未完了ならスプラッシュ画面へリダイレクト
    if (!hasCompletedOnboarding()) {
      router.replace('/splash')
    } else {
      // オンボーディング完了済みならローディング状態を解除
      setIsChecking(false)
    }
  }, [router])

  // オンボーディングチェック中はローディング画面を表示（FOUC防止）
  if (isChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-lg font-bold text-primary">Korea Now</span>
          </div>

          {/* Loading spinner */}
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-silk pb-20">
      <MobileHeader />
      <main className="container mx-auto px-4 py-4 max-w-2xl">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
