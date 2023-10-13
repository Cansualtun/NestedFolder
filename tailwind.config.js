/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      primary:{
        folder : "#eab308",
        file: "#0096FF",
        button : "#FFBF00",
      },
    },
    extend: {},
  },
  plugins: [],
}

