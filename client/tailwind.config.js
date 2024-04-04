/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#549CAD",
        darkWhite: "#F0F0F0",
        violet: "#654F6F",
        gold: "#CBA135",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [],
};
