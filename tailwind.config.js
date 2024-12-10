/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',
        secondary: '#000000',
        accent: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
