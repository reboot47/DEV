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
          DEFAULT: '#1B1464',
          light: '#4834d4',
        },
        'gray': {
          DEFAULT: '#718093',
        },
        'pink': {
          light: '#FDA7DF',
        }
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'system-ui'],
        heading: ['var(--font-zen-kaku-gothic-new)'],
      },
    },
  },
  plugins: [],
}
