/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'accent-gold': '#C5A47E',
        'text-primary': '#111111',
        'text-secondary': '#666666',
        'bg-light': '#F9F9F9',
      },
    },
  },
  plugins: [
    typography,
  ],
}
