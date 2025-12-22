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
        // 韓国カラーパレット
        celadon: {
          DEFAULT: '#94C9A9',
          light: '#B8E6D0',
          dark: '#6BAA8A',
        },
        dancheong: {
          DEFAULT: '#C62E2E',
          light: '#E85858',
          dark: '#A31E1E',
        },
        kpop: {
          pink: '#FF3E9A',
          blue: '#00D9FF',
          purple: '#9D4EDD',
        },
        silk: '#F8F8F8',
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
