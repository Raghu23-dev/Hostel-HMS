/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React component files
  ],
  theme: {
    extend: {colors: {
      'custom-dark': '#121822',
    },},
  },
  plugins: [],
}
