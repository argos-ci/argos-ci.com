import {
  BookOpenIcon,
  BookTextIcon,
  LayoutTemplateIcon,
  MonitorSmartphoneIcon,
  SplitIcon,
} from "lucide-react";

import { vitest } from "@/app/assets/brands/library";
import { ScreenshotsStayInCI } from "@/app/diff/features/ScreenshotsStayInCI";
import { SnapshotFiles } from "@/app/diff/features/SnapshotFiles";
import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
} from "@/lib/constants";

import { faq } from "../inline-markdown";
import type { Integration } from "../types";

const hobby = ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US");
const included = ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US");

export const vitestIntegration: Integration = {
  slug: "vitest",
  brand: vitest,
  title: "Visual testing for Vitest",
  metaTitle: "Vitest Visual Regression Testing · Argos",
  metaDescription:
    "Visual regression testing for Vitest browser mode: capture components with argosScreenshot(), snapshot any value with argosSnapshot(), and review every change on the pull request. Vitest 4 and later.",
  summary:
    "Argos adds visual regression testing to Vitest. In browser mode, `argosScreenshot()` captures your components; in any test, `argosSnapshot()` records a value such as JSON or HTML. Argos diffs both against the baseline from your Git history and puts the review on the pull request.",
  short: "Screenshots and snapshots from your Vitest tests",
  steps: [
    {
      title: "Install the SDK",
      description:
        "The second line is only for screenshots, which run in Vitest browser mode with the Playwright provider. Snapshots work in plain Node tests.",
      filename: "Terminal",
      lang: "bash",
      code: `npm i --save-dev @argos-ci/vitest
npm i --save-dev vitest @vitest/browser @vitest/browser-playwright playwright`,
    },
    {
      title: "Add the Argos plugin",
      description:
        "The plugin registers the `argosScreenshot` browser command and uploads what your tests captured at the end of the run. The `test.browser` block is only needed for screenshots.",
      filename: "vitest.config.ts",
      lang: "ts",
      code: `import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { argosVitestPlugin } from "@argos-ci/vitest/plugin";

export default defineConfig({
  plugins: [
    argosVitestPlugin({
      // Upload to Argos on CI only.
      uploadToArgos: !!process.env.CI,
    }),
  ],
  test: {
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
  },
});`,
    },
    {
      title: "Capture screenshots and snapshots",
      description:
        "`argosScreenshot()` takes no `page`: browser tests already run in the page. `argosSnapshot()` takes any value and serializes it. Both names are optional and default to the test's name. Render components with the `vitest-browser-*` package for your framework.",
      filename: "Button.test.tsx",
      lang: "tsx",
      code: `import { test } from "vitest";
import { render } from "vitest-browser-react";
import { argosScreenshot, argosSnapshot } from "@argos-ci/vitest";
import { Button } from "./Button";
import { getUser } from "./api";

test("Button", async () => {
  render(<Button>Click me</Button>);
  await argosScreenshot("button");
});

test("user payload", async () => {
  await argosSnapshot(await getUser());
});`,
    },
    {
      title: "Run it in CI",
      description:
        "Set `ARGOS_TOKEN` to your project token, or use GitHub Actions OIDC and skip the secret.",
      filename: ".github/workflows/argos.yml",
      lang: "yaml",
      code: `- run: npx playwright install --with-deps chromium
- run: npx vitest run
  env:
    ARGOS_TOKEN: \${{ secrets.ARGOS_TOKEN }}`,
    },
  ],
  alternative: {
    title: "What Argos adds over toMatchScreenshot()",
    description:
      "Vitest 4 ships a `toMatchScreenshot()` assertion for browser mode. It works, and its own guide is clear about where it gets hard: baselines per platform, and environments that must match.",
    name: "toMatchScreenshot()",
    rows: [
      {
        topic: "Baselines",
        alternative:
          "PNG files committed per browser and platform, such as `button-chromium-darwin.png`",
        argos: "Picked from your Git history, nothing committed",
      },
      {
        topic: "Updating a baseline",
        alternative: "Re-run with `--update`, then commit the images",
        argos: "Approve the change in the review UI",
      },
      {
        topic: "Rendering differences",
        alternative:
          "The Vitest guide recommends Docker or a cloud service for consistent results",
        argos: "CI captures are compared with CI captures",
      },
      {
        topic: "Review",
        alternative: "Diff images in the test output",
        argos:
          "A diff viewer on every pull request, with comments and a GitHub check",
      },
      {
        topic: "Values that aren't pixels",
        alternative: "Text snapshot files committed next to the tests",
        argos:
          "`argosSnapshot()` reviews JSON, HTML or Markdown like a screenshot",
      },
      {
        topic: "Cost",
        alternative: "Free",
        argos: `Free for personal projects, Pro at $${ARGOS_PRO_FLAT_PRICE}/month`,
      },
    ],
    sources: [
      {
        label: "Vitest visual regression testing guide",
        href: "https://vitest.dev/guide/browser/visual-regression-testing",
      },
    ],
    checkedAt: "2026-10-05",
  },
  features: [
    {
      title: "Snapshot any value",
      description:
        "`argosSnapshot()` records objects, JSON, HTML or Markdown from browser or Node tests, and Argos shows each change as a text diff in the same review as your screenshots.",
      href: "/docs/reference/vitest#capturing-snapshots",
      illustration: <SnapshotFiles />,
    },
    {
      title: "Screenshots stay out of your repository",
      description:
        "Captures are uploaded from CI and baselines come from your Git history, so there is no folder of PNGs per platform to commit and keep in sync.",
      href: "/docs/quickstart/vitest-quickstart",
      illustration: <ScreenshotsStayInCI />,
    },
  ],
  smallFeatures: [
    {
      title: "Sharding",
      description:
        "Run `vitest --shard` with `ARGOS_PARALLEL_NONCE` set, and every shard uploads into one Argos build.",
      href: "/docs/reference/vitest#tests-sharding",
      icon: SplitIcon,
    },
    {
      title: "Viewports and full page",
      description:
        "Pass `viewports` to capture several sizes in one call, and `fullPage` to capture the whole page instead of the component.",
      href: "/docs/reference/vitest",
      icon: MonitorSmartphoneIcon,
    },
    {
      title: "Storybook on the same setup",
      description:
        "The Storybook integration builds on this plugin, so component tests and stories share one configuration.",
      href: "/integrations/storybook",
      icon: LayoutTemplateIcon,
    },
  ],
  quickstartHref: "/docs/quickstart/vitest-quickstart",
  referenceHref: "/docs/reference/vitest",
  readNext: [
    {
      title: "Vitest visual testing guide",
      description:
        "Browser mode, toMatchScreenshot() and when to add a service.",
      href: "/blog/vitest-visual-testing",
      icon: BookOpenIcon,
    },
    {
      title: "Argos + Vitest: screenshots and snapshots",
      description: "What the Vitest SDK does and why we built it.",
      href: "/blog/argos-vitest-sdk",
      icon: BookTextIcon,
    },
    {
      title: "Visual testing for Storybook",
      description: "Capture every story with the Vitest addon.",
      href: "/integrations/storybook",
      icon: LayoutTemplateIcon,
    },
  ],
  questions: [
    faq(
      "How do I add visual regression testing to Vitest?",
      "Install `@argos-ci/vitest`, add `argosVitestPlugin()` to your Vitest config, and call `argosScreenshot()` in browser tests or `argosSnapshot()` in any test. Run Vitest in CI with `ARGOS_TOKEN` set and the pull request gets the visual changes to review. See the [Vitest quickstart](/docs/quickstart/vitest-quickstart).",
    ),
    faq(
      "How is it different from toMatchScreenshot()?",
      "`toMatchScreenshot()` compares against PNG files committed to your repository, one per browser and platform, and you review failures in the test output. With Argos, baselines come from your Git history, only CI captures are compared, and changes are reviewed and approved on the pull request.",
    ),
    faq(
      "Do I need Vitest browser mode?",
      "For screenshots, yes: browser mode with the Playwright provider. `argosSnapshot()` runs in any Vitest test, including plain Node tests.",
    ),
    faq(
      "Which Vitest versions are supported?",
      "Vitest 4 and later, with `@vitest/browser` and `@vitest/browser-playwright` for screenshots.",
    ),
    faq(
      "Does it work with Vitest sharding?",
      "Yes. With `vitest --shard`, set `ARGOS_PARALLEL_NONCE` to a value shared by the shards, such as the CI run ID, and they upload into a single build.",
    ),
    faq(
      "How much does it cost?",
      `Argos is free for personal projects up to ${hobby} screenshots a month. Pro is $${ARGOS_PRO_FLAT_PRICE} a month with ${included} screenshots included, then $${ARGOS_SCREENSHOT_PRICE} per screenshot.`,
    ),
  ],
};
