import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 韓国モダンカラーパレット - 鮮やかな青と赤（彩度向上版）
        primary: {
          DEFAULT: '#4A90E2', // ビビッドブルー - 彩度向上
          light: '#7AB3F5',   // より淡いブルー
          dark: '#2C6BB8',    // 濃いブルー
        },
        secondary: {
          DEFAULT: '#E75F73', // ビビッドローズ - 彩度向上
          light: '#F98CA0',   // より淡いピンク
          dark: '#C53D52',    // 濃いローズ
        },
        accent: {
          DEFAULT: '#5BA3E0', // アクセントブルー - 情報表示用（彩度向上）
          light: '#8FC4EB',   // より淡いアクセント
          dark: '#3577B8',    // 濃いアクセント
        },
        // 警告・エラー用
        danger: {
          DEFAULT: '#E57373', // 淡めの赤（明度高め）
          light: '#EF9A9A',
          dark: '#D32F2F',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'var(--font-noto-sans-jp)', 'sans-serif'],
        display: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        korean: '12px',
        'korean-lg': '16px',
      },
      boxShadow: {
        korean: '0 2px 8px rgba(0, 0, 0, 0.06)',
        'korean-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
