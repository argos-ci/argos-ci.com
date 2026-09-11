import cypressSvgDark from "./cypress-dark.svg";
import cypressSvgLight from "./cypress.svg";
import githubSvgDark from "./github-dark.svg";
import githubSvg from "./github.svg";
import playwrightSvg from "./playwright.svg";
import slackSvg from "./slack.svg";
import storybookSvg from "./storybook.svg";
import type { Brand } from "./types";
import vitestSvg from "./vitest.svg";
import wdioSvg from "./wdio.svg";

export const github: Brand = {
  name: "GitHub",
  logo: { light: githubSvg, dark: githubSvgDark },
};

export const slack: Brand = {
  name: "Slack",
  logo: slackSvg,
};

export const cypress: Brand = {
  name: "Cypress",
  logo: {
    dark: cypressSvgDark,
    light: cypressSvgLight,
  },
};

export const playwright: Brand = {
  name: "Playwright",
  logo: playwrightSvg,
};

export const storybook: Brand = {
  name: "Storybook",
  logo: storybookSvg,
};

export const vitest: Brand = {
  name: "Vitest",
  logo: vitestSvg,
};

export const wdio: Brand = {
  name: "WebdriverIO",
  logo: wdioSvg,
};
