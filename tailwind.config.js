const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./articles/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./markdown/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        on: colors.slate[100],
        "on-light": colors.slate[400],
        primary: colors.purple,
        neutral: colors.slate,
        border: colors.slate[700],

        tooltip: {
          bg: colors.slate[900],
          border: colors.slate[700],
          on: colors.slate[50],
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
