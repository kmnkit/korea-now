'use client'

import Image from 'next/image'
import { ArrowLeft, Upload, X, MapPin, Clock, DollarSign } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewSpotPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categories = [
    'カフェ', 'レストラン', '観光地', 'ショッピング',
    'エンタメ', 'ホテル', '美容', 'その他'
  ]

  const areas = [
    'ソウル', '釜山', '済州島', '仁川', '大邱',
    '光州', '大田', 'その他'
  ]

  const handleImageUpload = () => {
    // Mock image upload - in real app, this would open file picker
    if (images.length < 5) {
      setImages([...images, `https://picsum.photos/seed/${Date.now()}/400/300`])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-silk to-celadon/5 pb-24">
      {/* ヘッダー */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">スポット投稿</h1>
        <button className="korean-btn-primary text-sm py-2 px-4">
          投稿
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* 画像アップロード */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            写真 <span className="text-kpop-pink">*</span>
          </label>

          <div className="grid grid-cols-3 gap-3">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={img}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900/80 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-celadon rounded text-xs text-white font-medium">
                    メイン
                  </div>
                )}
              </div>
            ))}

            {images.length < 5 && (
              <button
                onClick={handleImageUpload}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-celadon hover:bg-celadon/5 transition-colors"
              >
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {images.length}/5
                </span>
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            最大5枚まで追加できます。1枚目がメイン画像になります。
          </p>
        </div>

        {/* スポット名 */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            スポット名 <span className="text-kpop-pink">*</span>
          </label>
          <input
            type="text"
            placeholder="예) 성수동 감성 카페"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent"
          />
        </div>

        {/* カテゴリ */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            カテゴリ <span className="text-kpop-pink">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-celadon text-white shadow-korean'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* エリア */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            エリア <span className="text-kpop-pink">*</span>
          </label>
          <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent appearance-none bg-white">
            <option value="">選択してください</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* 住所 */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-celadon" />
            住所
          </label>
          <input
            type="text"
            placeholder="서울특별시 성동구 연무장길 74"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-2">
            Google マップで検索できる住所を入力してください
          </p>
        </div>

        {/* 説明 */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            説明 <span className="text-kpop-pink">*</span>
          </label>
          <textarea
            rows={6}
            placeholder="このスポットの魅力を教えてください&#10;&#10;例）&#10;・雰囲気、インテリア&#10;・おすすめメニュー&#10;・訪問時のポイント"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent resize-none"
          />
        </div>

        {/* タグ */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            タグ
          </label>
          <input
            type="text"
            placeholder="#インスタ映え #デート #カップル"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-2">
            スペース区切りで複数のタグを追加できます
          </p>
        </div>

        {/* 営業時間 */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Clock className="w-4 h-4 text-celadon" />
            営業時間
          </label>
          <input
            type="text"
            placeholder="10:00 - 22:00 (月曜定休)"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent"
          />
        </div>

        {/* 予算 */}
        <div className="bg-white rounded-korean shadow-korean p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-celadon" />
            予算（一人当たり）
          </label>
          <input
            type="text"
            placeholder="₩15,000 - ₩25,000"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-celadon focus:border-transparent"
          />
        </div>

        {/* 注意事項 */}
        <div className="bg-gradient-to-r from-celadon/10 to-kpop-blue/10 rounded-korean p-4 border border-celadon/20">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            投稿時の注意事項
          </h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• 他人の著作権を侵害する画像は投稿しないでください</li>
            <li>• 誹謗中傷や不適切な内容は含めないでください</li>
            <li>• 正確な情報を心がけてください</li>
            <li>• AI による自動モデレーションを実施しています</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
