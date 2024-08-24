/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['"Fredoka One"', 'cursive'],
        'body': ['Quicksand', 'sans-serif'],
        'ui': ['Poppins', 'sans-serif'],
      },
    },
    plugins: [],
  }
}