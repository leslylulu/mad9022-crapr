/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        light: "#FFF7D1",
        DEFAULT: "#6A42C2",
        dark: "#563A9C",
      },
      secondary: {
        DEFAULT: "#F8F4E1",
      },
      ...colors,
      white: "#fff",
      black: "#000",
      transparent: "transparent",
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      lg: "clamp(1.2rem, 2vw, 1.333rem)",
      xl: "clamp(1.44rem, 3vw, 1.777rem)",
      "2xl": "clamp(1.728rem, 4.5vw, 2.369rem)",
      "3xl": ["clamp(2.074rem, 5.75vw, 3.157rem)", "1.3"],
      "4xl": ["clamp(2.488rem, 6.75vw, 4.209rem)", "1.2"],
      "5xl": ["clamp(2.986rem, 7.5vw, 5.61rem)", "1.1"],
    },
    screens: {
      sm: "25em",
      md: "45em",
      lg: "60em",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
