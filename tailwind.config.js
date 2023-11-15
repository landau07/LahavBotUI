/** @type {import('tailwindcss').Config} */
const lahavColor = "#b05097";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      phone: "432px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      colors: {
        lahav: { DEFAULT: lahavColor, dark: "#d879bf" },
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", " sans-serif"],
      },
    },
  },
  plugins: [],
};
