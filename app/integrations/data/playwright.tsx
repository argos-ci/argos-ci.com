import {
  AccessibilityIcon,
  BookOpenIcon,
  EyeOffIcon,
  GitCompareArrowsIcon,
  ScaleIcon,
  SplitIcon,
} from "lucide-react";

import { playwright } from "@/app/assets/brands/library";
import { Stabilization } from "@/app/diff/features/Stabilization";
import { FailureScreenshotsLarge } from "@/app/stabilize/features/FailureScreenshotsLarge";
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

export const playwrightIntegration: Integration = {
  slug: "playwright",
  brand: playwright,
  title: "Visual testing for Playwright",
  metaTitle: "Playwright Visual Regression Testing · Argos",
  metaDescription:
    "Add visual regression testing to your Playwright tests: install @argos-ci/playwright, call argosScreenshot(), and review every visual change on the pull request. Open source, baselines from Git, no committed PNGs.",
  summary:
    "Argos adds visual regression testing to your Playwright suite. Install `@argos-ci/playwright`, call `argosScreenshot()` in your tests, and every pull request gets its visual changes diffed against a baseline from your Git history, with traces for the tests that fail. Open source, and free for personal projects.",
  short: "argosScreenshot() in your Playwright tests",
  steps: [
    {
      title: "Install the SDK",
      description:
        "The Playwright SDK ships a reporter that uploads your screenshots and the `argosScreenshot()` helper that captures them.",
      filename: "Terminal",
      lang: "bash",
      code: "npm i --save-dev @argos-ci/playwright",
    },
    {
      title: "Add the Argos reporter",
      description:
        "The reporter uploads the screenshots when the tests run in CI, along with the traces and failure screenshots Playwright records. The launch options make text render the same on macOS and on Linux CI.",
      filename: "playwright.config.ts",
      lang: "ts",
      code: `import { defineConfig } from "@playwright/test";
import { createArgosReporterOptions } from "@argos-ci/playwright/reporter";

export default defineConfig({
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      createArgosReporterOptions({
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
      }),
    ],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    launchOptions: {
      args: ["--disable-lcd-text", "--font-render-hinting=none"],
    },
  },
});`,
    },
    {
      title: "Capture screenshots",
      description:
        "Call `argosScreenshot()` wherever you want a screenshot. It waits for fonts, images and `aria-busy` to settle and hides carets and scrollbars before it captures. Pass `viewports` to capture several sizes in one call.",
      filename: "tests/homepage.spec.ts",
      lang: "ts",
      code: `import { test } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

test("homepage", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await argosScreenshot(page, "homepage");
});`,
    },
    {
      title: "Run it in CI",
      description:
        "Set `ARGOS_TOKEN` to your project token, or use GitHub Actions OIDC and skip the secret. Argos posts a check on the pull request that links to the diffs to review.",
      filename: ".github/workflows/argos.yml",
      lang: "yaml",
      code: `name: Argos
on:
  pull_request:
  push:
    branches: [main]
jobs:
  argos:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
        env:
          ARGOS_TOKEN: \${{ secrets.ARGOS_TOKEN }}`,
    },
  ],
  alternative: {
    title: "What Argos adds over toHaveScreenshot()",
    description:
      "Playwright's built-in assertion is a good start on a solo project. In a team, committed baselines and per-platform rendering are what slow it down.",
    name: "toHaveScreenshot()",
    rows: [
      {
        topic: "Baselines",
        alternative:
          "PNG files committed to the repository, one set per browser and operating system",
        argos: "Picked from your Git history, nothing committed",
      },
      {
        topic: "Updating a baseline",
        alternative: "Re-run with `--update-snapshots`, then commit the images",
        argos: "Approve the change in the review UI",
      },
      {
        topic: "Rendering differences",
        alternative:
          "Baselines only match the machine that produced them, so teams regenerate them in Docker",
        argos:
          "CI captures are compared with CI captures, so a laptop never produces a baseline",
      },
      {
        topic: "Review",
        alternative: "Diff images in the HTML report or the Git diff",
        argos:
          "A diff viewer on every pull request, with comments and a GitHub check",
      },
      {
        topic: "Noise",
        alternative: "Tune `maxDiffPixels` and retry",
        argos:
          "Capture stabilization, a 0 to 1 threshold, flaky test detection",
      },
      {
        topic: "Cost",
        alternative: "Free",
        argos: `Free for personal projects, Pro at $${ARGOS_PRO_FLAT_PRICE}/month`,
      },
    ],
    sources: [
      {
        label: "Playwright visual comparisons",
        href: "https://playwright.dev/docs/test-snapshots",
      },
    ],
    checkedAt: "2026-10-05",
  },
  features: [
    {
      title: "Screenshots that don't flake",
      description:
        "Before each capture, the SDK waits for fonts, images and `aria-busy` to settle, hides carets and scrollbars, pauses GIFs on their first frame and pins sticky elements. The same page gives the same pixels on every run.",
      href: "/docs/reference/playwright#api-overview",
      illustration: <Stabilization compact />,
    },
    {
      title: "Failed tests come with their trace",
      description:
        "The reporter uploads Playwright traces and failure screenshots, so you open a failing test in Argos and step through it instead of downloading CI artifacts.",
      href: "/docs/reference/playwright#setup-tests-debugging",
      illustration: <FailureScreenshotsLarge />,
    },
  ],
  smallFeatures: [
    {
      title: "Sharding works as is",
      description:
        "Argos detects Playwright's `--shard` and merges the shards into one build. Nothing to configure.",
      href: "/docs/reference/playwright#tests-sharding",
      icon: SplitIcon,
    },
    {
      title: "Mask what changes on every run",
      description:
        '`data-visual-test="blackout"` masks a date or an avatar, `transparent` hides it and keeps its space, `removed` drops it from the layout.',
      href: "/docs/reference/playwright#helper-attributes-for-visual-testing",
      icon: EyeOffIcon,
    },
    {
      title: "ARIA snapshots too",
      description:
        "Pass `ariaSnapshot: true` to capture the accessibility tree along with the screenshot and review it as a text diff.",
      href: "/docs/reference/playwright#aria-snapshots",
      icon: AccessibilityIcon,
    },
  ],
  quickstartHref: "/docs/quickstart/playwright-quickstart",
  referenceHref: "/docs/reference/playwright",
  readNext: [
    {
      title: "Playwright visual regression testing in CI",
      description:
        "The full setup: sharding, baselines, stabilization and review.",
      href: "/blog/playwright-visual-regression-testing-ci",
      icon: BookOpenIcon,
    },
    {
      title: "Argos vs toHaveScreenshot()",
      description:
        "When the built-in assertion is enough, and when it stops scaling.",
      href: "/compare/playwright",
      icon: ScaleIcon,
    },
    {
      title: "Why Playwright visual testing doesn't scale",
      description: "What committed baselines cost a team over time.",
      href: "/blog/playwright-visual-testing-limits",
      icon: GitCompareArrowsIcon,
    },
  ],
  questions: [
    faq(
      "How do I add visual testing to Playwright?",
      "Install `@argos-ci/playwright`, add the Argos reporter to `playwright.config.ts`, and call `argosScreenshot(page, name)` where you want a screenshot. Run the tests in CI with `ARGOS_TOKEN` set: Argos compares each screenshot with its baseline and posts the result on the pull request. The [quickstart](/docs/quickstart/playwright-quickstart) walks through it.",
    ),
    faq(
      "Do I still need toHaveScreenshot()?",
      "No. `argosScreenshot()` replaces it: Argos stores the baselines and runs the comparison, so you stop committing PNG files and keeping one set per operating system. You can switch test by test; the [migration guide](/docs/learn/how-to-guides/migrate-to-argos/from-playwright-native-screenshots) shows the swap.",
    ),
    faq(
      "Where do the baselines come from?",
      "From your Git history. For each build, Argos picks the most recent approved build on the commits your branch started from (the merge base with your base branch), so every change is compared with the code you branched from. Nothing is committed to your repository.",
    ),
    faq(
      "Does Argos work with Playwright sharding?",
      "Yes. The reporter detects `--shard` and merges every shard into a single Argos build, with no extra configuration.",
    ),
    faq(
      "Which CI providers are supported?",
      "Any CI that runs Playwright. The SDK detects GitHub Actions, GitLab CI, CircleCI, Buildkite, Travis CI, Bitrise and Heroku on its own; anywhere else, set `ARGOS_COMMIT` and `ARGOS_BRANCH`. On GitHub Actions you can authenticate with OIDC instead of a token.",
    ),
    faq(
      "How much does it cost?",
      `Argos is free for personal projects up to ${hobby} screenshots a month. Teams use Pro: $${ARGOS_PRO_FLAT_PRICE} a month with ${included} screenshots included, then $${ARGOS_SCREENSHOT_PRICE} per screenshot. Argos is open source under the MIT license.`,
    ),
  ],
};
