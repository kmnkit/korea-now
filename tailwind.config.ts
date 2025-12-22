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
        // 韓国モダンカラーパレット - 淡い青と赤
        primary: {
          DEFAULT: '#7BA4DB', // ソフトブルー - 明度高め
          light: '#A8C5E8',   // より淡いブルー
          dark: '#5B8BC9',    // 少し濃いブルー
        },
        secondary: {
          DEFAULT: '#E89BA3', // ソフトローズ - 淡いピンク/赤
          light: '#F5B5B5',   // より淡いピンク
          dark: '#D97B85',    // 少し濃いローズ
        },
        accent: {
          DEFAULT: '#93B5E1', // アクセントブルー - 情報表示用
          light: '#B5D0ED',   // より淡いアクセント
          dark: '#6B9BD1',    // 少し濃いアクセント
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
