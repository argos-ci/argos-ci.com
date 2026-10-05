import { cypressIntegration } from "./data/cypress";
import { playwrightIntegration } from "./data/playwright";
import { storybookIntegration } from "./data/storybook";
import { vitestIntegration } from "./data/vitest";
import type { Integration, IntegrationSlug } from "./types";

/** Every integration page, by slug, in the order the hub lists them. */
export const INTEGRATIONS: Record<IntegrationSlug, Integration> = {
  playwright: playwrightIntegration,
  storybook: storybookIntegration,
  vitest: vitestIntegration,
  cypress: cypressIntegration,
};

/** SDKs documented in the docs, without a page of their own yet. */
export const OTHER_SDKS = [
  {
    name: "Puppeteer",
    href: "/docs/quickstart/puppeteer-quickstart",
    description: "argosScreenshot() for Puppeteer scripts and tests.",
  },
  {
    name: "WebdriverIO",
    href: "/docs/quickstart/webdriverio-quickstart",
    description: "Visual testing in your WebdriverIO suite.",
  },
  {
    name: "Any test framework",
    href: "/docs/quickstart/any-test-framework",
    description: "Upload a folder of screenshots with the Argos CLI.",
  },
];
