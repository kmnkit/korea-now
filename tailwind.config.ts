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
        // 韓国モダンカラーパレット
        primary: {
          DEFAULT: '#10B981', // Emerald green - 洗練された緑
          light: '#6EE7B7',   // 明るいミント
          dark: '#059669',    // 深い緑
        },
        secondary: {
          DEFAULT: '#F97316', // Warm orange - いいね、CTA
          light: '#FDBA74',   // 柔らかいオレンジ
          dark: '#EA580C',    // 深いオレンジ
        },
        accent: {
          DEFAULT: '#3B82F6', // Standard blue - リンク、情報
          light: '#93C5FD',   // 明るい青
          dark: '#1D4ED8',    // 深い青
        },
        // 警告・エラー用に残す
        danger: {
          DEFAULT: '#EF4444', // 警告色
          light: '#FCA5A5',
          dark: '#DC2626',
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
