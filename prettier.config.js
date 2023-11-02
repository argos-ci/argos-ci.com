module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: ["^@/", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
