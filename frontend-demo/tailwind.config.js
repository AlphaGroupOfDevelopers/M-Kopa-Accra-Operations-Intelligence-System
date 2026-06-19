/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mkopa: {
          green: '#39B54A',
          'deep-green': '#1F3E35',
          'light-green': '#F2FBF2',
          black: '#000000',
          white: '#FFFFFF',
        },
        primary: {
          50: '#F2FBF2',
          100: '#E5F7E7',
          200: '#C2EBCD',
          300: '#9FDFB3',
          400: '#6CCB82',
          500: '#39B54A',
          600: '#2E9339',
          700: '#247129',
          800: '#1A4F1B',
          900: '#0F2E0F',
        },
      },
    },
  },
  plugins: [],
}
