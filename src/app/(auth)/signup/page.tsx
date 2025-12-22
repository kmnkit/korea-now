'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const handleGoogleSignup = () => {
    // NextAuth Google OAuth処理（実装時）
    console.log('Google signup')
  }

  const handleEmailSignup = () => {
    // NextAuth Email/Password処理（実装時）
    if (formData.password !== formData.confirmPassword) {
      alert('パスワードが一致しません')
      return
    }
    if (!formData.agreeToTerms) {
      alert('利用規約に同意してください')
      return
    }
    console.log('Email signup', formData)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <div className="inline-flex w-20 h-20 rounded-2xl bg-primary shadow-lg items-center justify-center mb-4">
            <span className="text-4xl font-bold text-white">
              K
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Korea<span className="text-primary">Now</span>
          </h1>
          <p className="text-gray-600 text-sm">
            韓国のトレンドスポットを共有しよう
          </p>
        </div>

        {/* サインアップカード */}
        <div className="bg-white rounded-korean shadow-korean-lg p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            新規登録
          </h2>

          {/* Google サインアップ */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all font-medium text-gray-700 mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Googleで登録
          </button>

          {/* 区切り線 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">または</span>
            </div>
          </div>

          {/* メールサインアップフォーム */}
          <form onSubmit={(e) => { e.preventDefault(); handleEmailSignup(); }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  名前
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="김지수"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@korea-now.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="8文字以上"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  minLength={8}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード（確認）
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="もう一度入力"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  minLength={8}
                  required
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="agree" className="text-sm text-gray-600">
                  <Link href="/terms" className="text-primary hover:underline">
                    利用規約
                  </Link>
                  および
                  <Link href="/privacy" className="text-primary hover:underline">
                    プライバシーポリシー
                  </Link>
                  に同意します
                </label>
              </div>

              <button
                type="submit"
                className="w-full korean-btn-primary"
              >
                アカウントを作成
              </button>
            </div>
          </form>
        </div>

        {/* ログインリンク */}
        <div className="bg-white/10 backdrop-blur-sm rounded-korean p-4 text-center">
          <p className="text-white text-sm">
            すでにアカウントをお持ちですか？{' '}
            <Link
              href="/login"
              className="font-bold underline hover:no-underline"
            >
              ログイン
            </Link>
          </p>
        </div>

        {/* フッター */}
        <div className="mt-8 text-center text-white/70 text-xs">
          <p>© 2024 Korea Now. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
