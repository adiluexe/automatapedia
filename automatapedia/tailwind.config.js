/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#1b100e",
        background: "#fcf9f8",
        primary: "#653834",
        secondary: "#c7ad94",
        accent: "#866e46",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Syne", "sans-serif"],
      },
    },
  },
  plugins: [],
};
