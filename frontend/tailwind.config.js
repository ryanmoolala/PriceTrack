/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A2741',           // Navy Blue
      },
      fontFamily: {
        'helvetica': ['Helvetica', 'Arial', 'sans-serif'],
        // Adjust the fallback fonts as needed
      },
    },
  },
  plugins: [],
}

