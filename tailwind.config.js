// const colors = require("tailwindcss/colors");
const { createPlugin } = require("windy-radix-palette");

const radixColors = createPlugin();

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./articles/**/*.{js,ts,jsx,tsx}",
    "./markdown/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css",
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundColor: {
        app: radixColors.alias("mauve.1"),
        subtle: radixColors.alias("mauve.2"),
        ui: radixColors.alias("mauve.3"),
        hover: radixColors.alias("mauve.4"),
        active: radixColors.alias("mauve.5"),
        solid: {
          DEFAULT: radixColors.alias("mauve.9"),
          hover: radixColors.alias("mauve.10"),
          active: radixColors.alias("mauve.11"),
        },
        primary: {
          app: radixColors.alias("violet.1"),
          subtle: radixColors.alias("violet.2"),
          ui: radixColors.alias("violet.3"),
          hover: radixColors.alias("violet.4"),
          active: radixColors.alias("violet.5"),
          solid: {
            DEFAULT: radixColors.alias("violet.9"),
            hover: radixColors.alias("violet.10"),
            active: radixColors.alias("violet.11"),
          },
        },
      },
      textColor: {
        DEFAULT: radixColors.alias("mauve.12"),
        low: radixColors.alias("mauve.11"),
        hover: radixColors.alias("mauve.10"),
      },
      borderColor: {
        DEFAULT: radixColors.alias("mauve.6"),
        base: radixColors.alias("mauve.6"),
        hover: radixColors.alias("mauve.8"),
        active: radixColors.alias("mauve.9"),
      },
      fontFamily: {
        sans: 'var(--font-inter),Inter,-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
        accent:
          'var(--font-calsans),-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
      },
      backgroundImage: {
        "hero-text-gradient": `linear-gradient(180deg, theme(textColor.DEFAULT) 0%, ${radixColors.alias(
          "plum.11",
        )} 100%)`,
        "hero-text-gradient-lg": `linear-gradient(96deg, theme(textColor.DEFAULT) 72%, ${radixColors.alias(
          "plum.10",
        )} 105%)`,
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        fade: "fade 4s ease infinite",
        slide: "slide 10s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    radixColors.plugin,
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
