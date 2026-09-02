/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0F2C59',
          navyDark: '#0A1E3F',
          gold: '#C5A880',
          goldDark: '#A38456',
          green: '#1E6F5C',
          greenDark: '#134E4A',
          greenLight: '#289672',
          lightBg: '#F8FAF9',
          cardBorder: '#E2E8F0',
          warning: '#D97706',
          danger: '#DC2626',
          success: '#16A34A',
          info: '#2563EB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
