/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/*.{html,ts}",
    "./src/app/**/*.{html,ts}",
    "./src/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif'],
        viaoda: ['viaoda', 'serif'],
        tiempos: ['tiempos', 'serif']
      },
    },
  },
  plugins: [
  ],
}