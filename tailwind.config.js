/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF8C00", // Shalomville Orange
          50: "#FFF4E5",
          100: "#FFE8CC",
          200: "#FFD199",
          300: "#FFB966",
          400: "#FFA233",
          500: "#FF8C00",
          600: "#CC7000",
          700: "#995400",
          800: "#663800",
          900: "#331C00",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
