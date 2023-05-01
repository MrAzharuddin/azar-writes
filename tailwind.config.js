/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
      circle: "circle",
    },
    extend: {
      fontFamily: {
        Mukta: ["Mukta", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
