/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
      width: {
        '75': '300px',
      },
      height: {
        '79': '316px',
      },
    },
  },
  plugins: [],
}
