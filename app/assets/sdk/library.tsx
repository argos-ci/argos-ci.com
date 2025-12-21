import cypressSvgDark from "./cypress-dark.svg";
import cypressSvgLight from "./cypress.svg";
import playwrightSvg from "./playwright.svg";
import storybookSvg from "./storybook.svg";
import type { SDK } from "./types";
import wdioSvg from "./wdio.svg";

export const cypress: SDK = {
  name: "Cypress",
  logo: {
    dark: cypressSvgDark,
    light: cypressSvgLight,
  },
};

export const playwright: SDK = {
  name: "Playwright",
  logo: playwrightSvg,
};

export const storybook: SDK = {
  name: "Storybook",
  logo: storybookSvg,
};

export const wdio: SDK = {
  name: "Storybook",
  logo: wdioSvg,
};
