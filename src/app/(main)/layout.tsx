'use client'

import { useEffect } from 'react'
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

  useEffect(() => {
    // オンボーディング未完了ならスプラッシュ画面へリダイレクト
    if (!hasCompletedOnboarding()) {
      router.push('/splash')
    }
  }, [router])

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
