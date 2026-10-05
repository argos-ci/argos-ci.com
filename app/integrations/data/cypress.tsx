import {
  BookOpenIcon,
  EyeOffIcon,
  MonitorSmartphoneIcon,
  ScaleIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
} from "lucide-react";

import { cypress } from "@/app/assets/brands/library";
import { Stabilization } from "@/app/diff/features/Stabilization";
import { GitHubChecks } from "@/app/review/features/GitHubChecks";
import { faq } from "@/components/InlineMarkdown";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
} from "@/lib/constants";

import type { Integration } from "../types";

const hobby = ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US");
const included = ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US");

export const cypressIntegration: Integration = {
  slug: "cypress",
  brand: cypress,
  title: "Visual testing for Cypress",
  metaTitle: "Cypress Visual Regression Testing · Argos",
  metaDescription:
    "Visual regression testing for Cypress: add cy.argosScreenshot() to your tests and review every visual change on the pull request, with stable captures and baselines from Git. Cypress 12 to 15.",
  summary:
    "Argos adds visual regression testing to Cypress. Register the Argos task, call `cy.argosScreenshot()` in your tests, and every pull request gets its visual changes diffed against the baseline from your Git history and reviewed on GitHub. Open source, and free for personal projects.",
  short: "cy.argosScreenshot() in your Cypress tests",
  steps: [
    {
      title: "Install the SDK",
      description:
        "The Cypress SDK adds the `cy.argosScreenshot()` command and a task that uploads the screenshots.",
      filename: "Terminal",
      lang: "bash",
      code: "npm i --save-dev @argos-ci/cypress",
    },
    {
      title: "Add the command",
      description:
        "Import the support file to register `cy.argosScreenshot()`. With TypeScript, also add `@argos-ci/cypress/support` to the `types` of your `tsconfig.json`.",
      filename: "cypress/support/e2e.js",
      lang: "js",
      code: `import "@argos-ci/cypress/support";`,
    },
    {
      title: "Register the Argos task",
      description:
        "The task uploads the screenshots once the run is over. Register it in `component` too if you visual-test components.",
      filename: "cypress.config.js",
      lang: "js",
      code: `const { defineConfig } = require("cypress");
const { registerArgosTask } = require("@argos-ci/cypress/task");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      registerArgosTask(on, config, {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
      });
    },
  },
});`,
    },
    {
      title: "Capture screenshots",
      description:
        "`cy.argosScreenshot()` waits for fonts, images and `aria-busy` to settle and hides carets and scrollbars before it captures.",
      filename: "cypress/e2e/homepage.cy.js",
      lang: "js",
      code: `it("homepage", () => {
  cy.visit("http://localhost:3000/");
  cy.argosScreenshot("homepage");
});`,
    },
    {
      title: "Run it in CI",
      description:
        "Set `ARGOS_TOKEN` to your project token, or use GitHub Actions OIDC and skip the secret.",
      filename: ".github/workflows/argos.yml",
      lang: "yaml",
      code: `- uses: cypress-io/github-action@v6
  with:
    start: npm start # serves your app
  env:
    ARGOS_TOKEN: \${{ secrets.ARGOS_TOKEN }}`,
    },
  ],
  alternative: {
    title: "What Argos adds over image snapshot plugins",
    description:
      "Cypress has no visual assertion of its own. Teams usually start with a plugin such as cypress-image-snapshot, which compares against images in the repository.",
    name: "Image snapshot plugins",
    rows: [
      {
        topic: "Baselines",
        alternative: "Image files committed to the repository",
        argos: "Picked from your Git history, nothing committed",
      },
      {
        topic: "Updating a baseline",
        alternative: "Re-run in update mode, then commit the images",
        argos: "Approve the change in the review UI",
      },
      {
        topic: "Stable captures",
        alternative: "Up to you: waits, `cy.clock()`, hiding elements",
        argos:
          "Built in: waits for fonts, images and `aria-busy`, hides carets and scrollbars",
      },
      {
        topic: "Several viewports",
        alternative: "One `cy.viewport()` and one capture per size",
        argos: "`viewports` captures every size in one call",
      },
      {
        topic: "Review",
        alternative: "Diff images in the run's artifacts",
        argos:
          "A diff viewer on every pull request, with comments and a GitHub check",
      },
      {
        topic: "Cost",
        alternative: "Free",
        argos: `Free for personal projects, Pro at $${ARGOS_PRO_FLAT_PRICE}/month`,
      },
    ],
    sources: [
      {
        label: "Cypress visual testing guide",
        href: "https://docs.cypress.io/app/tooling/visual-testing",
      },
    ],
    checkedAt: "2026-10-05",
  },
  features: [
    {
      title: "Screenshots that don't flake",
      description:
        "Before each capture, the SDK waits for fonts, images and `aria-busy` to settle, hides carets and scrollbars and pins sticky elements, so the same page gives the same pixels on every run.",
      href: "/docs/reference/cypress",
      illustration: <Stabilization compact />,
    },
    {
      title: "The verdict lands on the pull request",
      description:
        "Argos posts a GitHub check you can make required. Reviewers open the diffs from it, approve or request changes, and the check follows their verdict.",
      href: "/review",
      illustration: <GitHubChecks />,
    },
  ],
  smallFeatures: [
    {
      title: "Several viewports per call",
      description:
        "`cy.argosScreenshot(name, { viewports })` captures each size, so responsive layouts take one line.",
      href: "/docs/learn/how-to-guides/visual-coverage/responsive-viewports",
      icon: MonitorSmartphoneIcon,
    },
    {
      title: "A threshold you set",
      description:
        "`threshold` runs from 0 to 1 (default 0.5): the higher it is, the less sensitive the comparison.",
      href: "/docs/reference/cypress",
      icon: SlidersHorizontalIcon,
    },
    {
      title: "Mask what changes on every run",
      description:
        '`data-visual-test="blackout"` masks dynamic content, `transparent` hides it and keeps its space.',
      href: "/docs/learn/reliability-and-flakiness/flaky-tests/argos-helpers",
      icon: EyeOffIcon,
    },
  ],
  quickstartHref: "/docs/quickstart/cypress-quickstart",
  referenceHref: "/docs/reference/cypress",
  readNext: [
    {
      title: "Cypress visual regression testing guide",
      description: "Plugins, services and the setup that holds up in CI.",
      href: "/blog/cypress-visual-regression-testing",
      icon: BookOpenIcon,
    },
    {
      title: "Argos vs Percy",
      description: "The other service Cypress teams often compare.",
      href: "/compare/percy",
      icon: ScaleIcon,
    },
    {
      title: "How to fix flaky visual tests",
      description: "Every root cause of a flaky screenshot, and its fix.",
      href: "/blog/fix-flaky-visual-tests",
      icon: SparklesIcon,
    },
  ],
  questions: [
    faq(
      "How do I add visual testing to Cypress?",
      "Install `@argos-ci/cypress`, import `@argos-ci/cypress/support` in your support file, register the Argos task in `cypress.config.js`, and call `cy.argosScreenshot(name)` in your tests. Run Cypress in CI with `ARGOS_TOKEN` set and Argos posts the visual changes on the pull request. See the [Cypress quickstart](/docs/quickstart/cypress-quickstart).",
    ),
    faq("Which Cypress versions are supported?", "Cypress 12 to 15."),
    faq(
      "Does it work with component testing?",
      "Yes. Register the Argos task in the `component` section of `cypress.config.js` as well, and call `cy.argosScreenshot()` in your component tests.",
    ),
    faq(
      "Do I need a plugin like cypress-image-snapshot?",
      "No. `cy.argosScreenshot()` replaces it: Argos stores the baselines and compares the screenshots, so nothing is committed to your repository and changes are reviewed on the pull request.",
    ),
    faq(
      "How much does it cost?",
      `Argos is free for personal projects up to ${hobby} screenshots a month. Pro is $${ARGOS_PRO_FLAT_PRICE} a month with ${included} screenshots included, then $${ARGOS_SCREENSHOT_PRICE} per screenshot.`,
    ),
  ],
};
