import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileNav } from '@/components/layout/MobileNav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
