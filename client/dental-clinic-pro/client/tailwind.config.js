/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // Sets Outfit as the default font
      },
      colors: {
        primary: '#4ade80',
        secondary: '#1e293b',
        accent: '#3b82f6',
      }
    },
  },
  plugins: [],
}