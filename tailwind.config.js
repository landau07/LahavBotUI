/** @type {import('tailwindcss').Config} */
const lahavColorPink = "#b05097";

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
        lahavPink: { DEFAULT: lahavColorPink, dark: "#d879bf" },
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", " sans-serif"],
      },
    },
  },
  plugins: [],
};
