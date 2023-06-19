/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'ColorNav': '#705f34',
        'ColorHover': '#8e7b3a',
      }
    },
  },
  plugins: [],
}

