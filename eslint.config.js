import { fixupPluginRules } from "@eslint/compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import * as espree from "espree";

// eslint-plugin-react (<= 7.37.5) still calls context APIs removed in
// ESLint 10 (context.getFilename, getScope, …). Remove the fixup once
// eslint-config-next ships an ESLint 10 compatible eslint-plugin-react.
const nextVitalsFixedUp = nextVitals.map((entry) =>
  entry.plugins?.react
    ? {
        ...entry,
        plugins: {
          ...entry.plugins,
          react: fixupPluginRules(entry.plugins.react),
        },
      }
    : entry,
);

const eslintConfig = defineConfig([
  ...nextVitalsFixedUp,
  // eslint-config-next parses JS files with next/dist/compiled/babel/eslint-parser,
  // whose scope manager predates the scopeManager.addGlobals API required by
  // ESLint 10 and crashes. Parse them with espree (ESLint's default parser)
  // instead; remove once next ships an ESLint 10 compatible compiled parser.
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parser: espree,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
