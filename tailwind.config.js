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
        "on-danger": colors.red[400],
        primary: colors.purple,
        neutral: colors.slate,
        danger: colors.red,
        link: colors.blue[500],

        border: colors.slate[600],
        active: colors.slate[500],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
