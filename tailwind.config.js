/** @type {import('tailwindcss').Config} */
const lahavColor = "#b05097";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["Helvetica", "Arial", " sans-serif"],
      },
      backgroundColor: {
        lahav: lahavColor,
      },
      borderColor: {
        lahav: lahavColor,
      },
      textColor: {
        lahav: lahavColor,
      },
    },
  },
  plugins: [],
};
