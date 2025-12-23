import cloudflareSvg from "./cloudflare.svg";
import cypressSvgDark from "./cypress-dark.svg";
import cypressSvgLight from "./cypress.svg";
import githubSvgDark from "./github-dark.svg";
import githubSvg from "./github.svg";
import gitlabSvg from "./gitlab.svg";
import playwrightSvg from "./playwright.svg";
import slackSvg from "./slack.svg";
import storybookSvg from "./storybook.svg";
import type { Brand } from "./types";
import vercelSvgDark from "./vercel-dark.svg";
import vercelSvg from "./vercel.svg";
import wdioSvg from "./wdio.svg";

export const gitlab: Brand = {
  name: "GitLab",
  logo: gitlabSvg,
};

export const github: Brand = {
  name: "GitHub",
  logo: { light: githubSvg, dark: githubSvgDark },
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

export const playwright: Brand = {
  name: "Playwright",
  logo: playwrightSvg,
};

export const storybook: Brand = {
  name: "Storybook",
  logo: storybookSvg,
};

export const wdio: Brand = {
  name: "Storybook",
  logo: wdioSvg,
};
