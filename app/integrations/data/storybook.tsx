import {
  BookOpenIcon,
  LayersIcon,
  MousePointerClickIcon,
  RocketIcon,
  ScaleIcon,
} from "lucide-react";

import { storybook } from "@/app/assets/brands/library";
import { StorybookSnapshots } from "@/app/diff/features/StorybookSnapshots";
import { StoryModes } from "@/app/diff/features/StoryModes";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "@/lib/constants";

import { faq } from "../inline-markdown";
import type { Integration } from "../types";

const hobby = ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US");
const included = ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US");

export const storybookIntegration: Integration = {
  slug: "storybook",
  brand: storybook,
  title: "Visual testing for Storybook",
  metaTitle: "Storybook Visual Regression Testing · Argos",
  metaDescription:
    "Visual testing for Storybook with the Vitest addon: Argos captures every story in your CI browser, diffs it against the baseline from Git, and deploys your Storybook to a preview URL on every pull request.",
  summary: `Argos captures every story through the Storybook Vitest addon, in the browser your CI already runs, and compares it with the baseline from your Git history. Each pull request also gets a preview URL of your Storybook. Open source, with Storybook screenshots at $${ARGOS_STORYBOOK_SCREENSHOT_PRICE} each beyond the plan.`,
  short: "Every story, captured with the Vitest addon",
  steps: [
    {
      title: "Install the SDK",
      description:
        "Argos works with Storybook 9 and later through the Vitest addon. If your Vitest addon setup doesn't include the browser-mode packages yet, add them too.",
      filename: "Terminal",
      lang: "bash",
      code: `npm i --save-dev @argos-ci/storybook
npm i --save-dev vitest @vitest/browser @vitest/browser-playwright playwright`,
    },
    {
      title: "Add the Argos plugin next to storybookTest()",
      description:
        "`storybookTest()` turns every story into a test, and the Argos plugin captures each one and uploads it from CI.",
      filename: "vitest.config.ts",
      lang: "ts",
      code: `import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { argosVitestPlugin } from "@argos-ci/storybook/vitest-plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
          argosVitestPlugin({
            // Upload to Argos on CI only.
            uploadToArgos: !!process.env.CI,
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              launchOptions: {
                args: ["--disable-lcd-text", "--font-render-hinting=none"],
              },
            }),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});`,
    },
    {
      title: "Capture more inside play functions",
      description:
        "Stories are captured without any code change. To capture a state after an interaction, such as an open menu or an error, call `argosScreenshot()` in the play function.",
      filename: "Menu.stories.ts",
      lang: "ts",
      code: `import { argosScreenshot } from "@argos-ci/storybook/vitest";

export const Opened: Story = {
  play: async (ctx) => {
    // ...open the menu, then:
    await argosScreenshot(ctx, "menu-opened");
  },
};`,
    },
    {
      title: "Test and deploy in CI",
      description:
        "Run the stories, then deploy the built Storybook. The pull request gets the visual check and a link to the live Storybook.",
      filename: ".github/workflows/argos.yml",
      lang: "yaml",
      code: `- run: npx playwright install --with-deps chromium
- run: npx vitest run --project=storybook
  env:
    ARGOS_TOKEN: \${{ secrets.ARGOS_TOKEN }}
- run: npm run build-storybook
- run: npx --no-install argos deploy ./storybook-static
  env:
    ARGOS_TOKEN: \${{ secrets.ARGOS_TOKEN }}`,
    },
  ],
  alternative: {
    title: "Argos or Chromatic for Storybook",
    description:
      "Chromatic is made by the Storybook maintainers and is the default many teams start with. These are the differences that matter when you choose.",
    name: "Chromatic",
    rows: [
      {
        topic: "Where stories are captured",
        alternative: "In Chromatic's cloud browsers",
        argos: "In your CI browser, through the Vitest addon",
      },
      {
        topic: "Entry paid plan",
        alternative: "$179/month for 35,000 snapshots",
        argos: `$${ARGOS_PRO_FLAT_PRICE}/month for ${included} screenshots, then $${ARGOS_STORYBOOK_SCREENSHOT_PRICE} per Storybook screenshot`,
      },
      {
        topic: "Screenshots in play functions",
        alternative: "One snapshot after the play function ends",
        argos:
          "`argosScreenshot(ctx)` wherever you need it, as many as you need",
      },
      {
        topic: "Interaction time limit",
        alternative: "15 seconds to render, 15 seconds for interactions",
        argos: "Your Vitest test timeout",
      },
      {
        topic: "Deployments",
        alternative: "Storybook",
        argos: "Storybook or any static build",
      },
      {
        topic: "Source code",
        alternative: "Proprietary",
        argos: "Open source (MIT)",
      },
    ],
    sources: [
      { label: "Chromatic pricing", href: "https://www.chromatic.com/pricing" },
      {
        label: "Chromatic interaction tests",
        href: "https://www.chromatic.com/docs/interactions/",
      },
    ],
    checkedAt: "2026-10-04",
  },
  features: [
    {
      title: "Every story, captured",
      description:
        "With the Vitest addon, each story is a test and Argos screenshots it. A new story is covered the moment it exists, and its baseline comes from your Git history.",
      href: "/docs/reference/storybook",
      illustration: <StorybookSnapshots />,
    },
    {
      title: "Themes and viewports with story modes",
      description:
        "Define modes, such as light and dark or mobile and desktop, and Argos captures each story in every mode from the globals your stories already use.",
      href: "/docs/learn/how-to-guides/visual-coverage/storybook-story-modes",
      illustration: <StoryModes />,
    },
  ],
  smallFeatures: [
    {
      title: "A preview URL per pull request",
      description:
        "`argos deploy ./storybook-static` publishes the build, and reviewers open the live Storybook from the pull request.",
      href: "/deploy",
      icon: RocketIcon,
    },
    {
      title: "Screenshots inside play functions",
      description:
        "Call `argosScreenshot(ctx, name)` after an interaction to capture menus, dialogs and error states.",
      href: "/docs/reference/storybook#interactions-using-the-play-function",
      icon: MousePointerClickIcon,
    },
    {
      title: "Storybook 8 to 11",
      description:
        "The Vitest addon needs Storybook 9 or later. Storybook 8 projects use the test runner integration instead.",
      href: "/docs/quickstart/storybook-quickstart/storybook-test-runner-quickstart",
      icon: LayersIcon,
    },
  ],
  quickstartHref: "/docs/quickstart/storybook-quickstart",
  referenceHref: "/docs/reference/storybook",
  readNext: [
    {
      title: "Storybook visual testing without Chromatic",
      description: "The two ways to do it, and what each one costs you.",
      href: "/blog/storybook-visual-testing-without-chromatic",
      icon: BookOpenIcon,
    },
    {
      title: "Argos vs Chromatic",
      description: "Pricing, capture model and reviews, side by side.",
      href: "/compare/chromatic",
      icon: ScaleIcon,
    },
    {
      title: "Deploy your Storybook on every pull request",
      description: "Free preview URLs for Storybook and any static build.",
      href: "/deploy",
      icon: RocketIcon,
    },
  ],
  questions: [
    faq(
      "How do I add visual testing to Storybook?",
      "Install `@argos-ci/storybook` and add `argosVitestPlugin()` next to `storybookTest()` in your Vitest config. Every story becomes a test, Argos captures it, and when the tests run in CI with `ARGOS_TOKEN` set, the pull request gets a check with the visual changes to review. See the [Storybook quickstart](/docs/quickstart/storybook-quickstart).",
    ),
    faq(
      "Is Argos a Chromatic alternative?",
      "Yes. Argos covers the same workflow: stories captured on every pull request, changes reviewed and approved in a web UI, and a check on GitHub. The differences are that stories are captured in your CI browser through the Vitest addon rather than in a vendor's cloud, and that Argos is open source. The [migration guide](/docs/learn/how-to-guides/migrate-to-argos/from-chromatic) maps Chromatic's concepts to Argos.",
    ),
    faq(
      "Do I need the Storybook test runner?",
      "Not on Storybook 9 or later: the Vitest addon runs your stories as tests and Argos captures them. On Storybook 8, use the [test runner integration](/docs/quickstart/storybook-quickstart/storybook-test-runner-quickstart).",
    ),
    faq(
      "Can Argos host my Storybook?",
      "Yes. `argos deploy ./storybook-static` uploads the build to a preview URL on every pull request, with a branch URL that follows the latest build. A push to your production branch updates the production URL. See [Deploy](/deploy).",
    ),
    faq(
      "How much does visual testing for Storybook cost?",
      `Personal projects are free up to ${hobby} screenshots a month. Pro is $${ARGOS_PRO_FLAT_PRICE} a month with ${included} screenshots included, and Storybook screenshots beyond that cost $${ARGOS_STORYBOOK_SCREENSHOT_PRICE} each.`,
    ),
  ],
};
