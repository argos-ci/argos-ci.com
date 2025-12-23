import cloudflareSvg from "./cloudflare.svg";
import chromeSvg from "./chrome.svg";
import cypressSvgDark from "./cypress-dark.svg";
import cypressSvgLight from "./cypress.svg";
import edgeSvg from "./edge.svg";
import firefoxSvg from "./firefox.svg";
import githubSvgDark from "./github-dark.svg";
import githubSvg from "./github.svg";
import gitlabSvg from "./gitlab.svg";
import playwrightSvg from "./playwright.svg";
import safariSvg from "./safari.svg";
import slackSvg from "./slack.svg";
import storybookSvg from "./storybook.svg";
import type { Brand } from "./types";
import vercelSvgDark from "./vercel-dark.svg";
import vercelSvg from "./vercel.svg";
import vitestSvg from "./vitest.svg";
import wdioSvg from "./wdio.svg";

export const gitlab: Brand = {
  name: "GitLab",
  logo: gitlabSvg,
};

export const github: Brand = {
  name: "GitHub",
  logo: { light: githubSvg, dark: githubSvgDark },
};

export const chrome: Brand = {
  name: "Chrome",
  logo: chromeSvg,
};

export const slack: Brand = {
  name: "Slack",
  logo: slackSvg,
};

export const vercel: Brand = {
  name: "Vercel",
  logo: { light: vercelSvg, dark: vercelSvgDark },
};

export const cloudflare: Brand = {
  name: "Cloudflare",
  logo: cloudflareSvg,
};

export const cypress: Brand = {
  name: "Cypress",
  logo: {
    dark: cypressSvgDark,
    light: cypressSvgLight,
  },
};

export const edge: Brand = {
  name: "Edge",
  logo: edgeSvg,
};

export const firefox: Brand = {
  name: "Firefox",
  logo: firefoxSvg,
};

export const playwright: Brand = {
  name: "Playwright",
  logo: playwrightSvg,
};

export const safari: Brand = {
  name: "Safari",
  logo: safariSvg,
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
