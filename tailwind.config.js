/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          dark: '#1B1464',
          light: '#4834d4',
        },
        'gray': {
          light: '#f5f6fa',
          medium: '#718093',
          dark: '#2f3640',
        },
        'pink': {
          light: '#FDA7DF',
        },
        'error': '#ff4757',
        'success': '#2ed573',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'system-ui'],
        heading: ['var(--font-zen-kaku-gothic-new)'],
      },
    },
  },
  plugins: [],
}
