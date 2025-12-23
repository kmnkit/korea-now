'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { markOnboardingComplete } from '@/lib/onboarding'
import { Camera, X } from 'lucide-react'

export default function ProfileSetupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nickname: '',
    bio: '',
    avatar: null as string | null,
  })

  const [charCount, setCharCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const maxBioLength = 100

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nickname: e.target.value })
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= maxBioLength) {
      setFormData({ ...formData, bio: text })
      setCharCount(text.length)
    }
  }

  const handleImageUpload = () => {
    // 実際の実装ではfile inputを開く
    // TODO: Vercel Blob連携
    console.log('Image upload clicked')
  }

  const handleSkip = () => {
    markOnboardingComplete(true) // プロフィール設定をスキップ
    router.push('/')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nickname.trim()) {
      alert('ニックネームを入力してください')
      return
    }

    if (formData.nickname.length < 2 || formData.nickname.length > 20) {
      alert('ニックネームは2-20文字で入力してください')
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Server Action実装
      // await updateUserProfile({
      //   nickname: formData.nickname,
      //   bio: formData.bio,
      //   avatar: formData.avatar,
      // })

      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log('Profile setup completed:', formData)

      markOnboardingComplete(false) // プロフィール設定完了
      router.push('/')
    } catch (error) {
      console.error('Profile setup error:', error)
      alert('プロフィール設定に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  // イニシャルアイコンを生成
  const getInitial = () => {
    return formData.nickname ? formData.nickname[0].toUpperCase() : '?'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <button
          onClick={handleSkip}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          スキップ
        </button>
        <h1 className="text-lg font-bold text-gray-900">プロフィール設定</h1>
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 space-y-8">
          {/* Avatar */}
          <div className="text-center">
            <div className="inline-block relative">
              {formData.avatar ? (
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {getInitial()}
                  </span>
                </div>
              )}

              {/* Upload button */}
              <button
                type="button"
                onClick={handleImageUpload}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary shadow-korean flex items-center justify-center hover:bg-primary-dark transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-3">タップして写真を変更</p>
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ニックネーム <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.nickname}
              onChange={handleNicknameChange}
              placeholder="김지수"
              className="w-full px-4 py-3 border border-gray-200 rounded-korean focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={20}
              required
            />
            <p className="text-xs text-gray-500 mt-1">2-20文字</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              自己紹介 <span className="text-gray-400 font-normal">(任意)</span>
            </label>
            <textarea
              value={formData.bio}
              onChange={handleBioChange}
              placeholder="韓国旅行が好きです✨"
              className="w-full px-4 py-3 border border-gray-200 rounded-korean focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                あなたについて簡単に教えてください
              </p>
              <p
                className={`text-xs ${
                  charCount > maxBioLength * 0.9
                    ? 'text-danger'
                    : 'text-gray-500'
                }`}
              >
                {charCount}/{maxBioLength}
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-accent/5 rounded-korean p-4 border border-accent/20">
            <p className="text-xs text-gray-600 leading-relaxed">
              💡 プロフィールは後からいつでも変更できます。まずは簡単に設定してみましょう！
            </p>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full korean-btn-primary ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? '設定中...' : '完了'}
          </button>
        </div>
      </form>
    </div>
  )
}
