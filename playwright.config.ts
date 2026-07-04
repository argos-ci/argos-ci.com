import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */

/**
 * When BASE_URL is set (the Vercel preview, tested on deployment) we run against
 * that deployment. Otherwise we run against a local build that Playwright boots
 * for us, both locally and in CI on the branch.
 */
const isLocal = !process.env.BASE_URL;
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";

/**
 * Keep local/branch runs on a separate Argos build so they never overwrite the
 * baselines produced by the Vercel deployment tests. Override with
 * ARGOS_BUILD_NAME when needed.
 */
const buildName =
  process.env.ARGOS_BUILD_NAME ?? (isLocal ? "local" : undefined);

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI, or locally when an Argos token is available.
        uploadToArgos: !!process.env.CI || !!process.env.ARGOS_TOKEN,
        buildName,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    // Capture screenshot after each test failure.
    screenshot: "only-on-failure",
  },

  /* Boot a local production server when we are not testing a deployment. */
  webServer: isLocal
    ? {
        command: "pnpm build && pnpm start",
        url: "http://127.0.0.1:3000",
        timeout: 240_000,
        reuseExistingServer: !process.env.CI,
      }
    : undefined,

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        extraHTTPHeaders: {
          "x-vercel-skip-toolbar": "1",
        },
      },
    },
  ],
});
