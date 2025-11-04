import { argosScreenshot } from "@argos-ci/playwright";
import { Page, test } from "@playwright/test";

const NAV_LINKS = {
  pricing: "Pricing",
  changelog: "Changelog",
  blog: "Blog",
  customers: "Customers",
};

const FOOTER_LINKS = {
  "playwright+argos": "Playwright + Argos",
  security: "Security",
  soc2: "SOC 2",
  gdpr: "GDPR",
  terms: "Terms",
  privacy: "Privacy",
  "percy-vs-argos": "Percy",
  "applitools-vs-argos": "Applitools",
  "chromatic-vs-argos": "Chromatic",
  "oss-friends": "OSS Friends",
};

async function screenshot(page: Page, name: string, suffix = "") {
  await argosScreenshot(page, `${name}+${suffix}`, {
    viewports: ["macbook-16", "ipad-2", "iphone-8"],
    ariaSnapshot: true,
  });
}

function runScreenshotTests(colorScheme?: "light" | "dark") {
  const screenshotSuffix = colorScheme === "dark" ? "-dark" : "";
  const textSuffix = colorScheme === "dark" ? " (dark)" : "";

  test(`Screenshots for homepage ${textSuffix}`, async ({ page }) => {
    await page.goto("/");
    await screenshot(page, "homepage", screenshotSuffix);
  });

  for (const [pageName, linkLabel] of Object.entries(NAV_LINKS)) {
    test(`Screenshots for ${pageName} ${textSuffix}`, async ({ page }) => {
      await page.goto("/");
      const link = page
        .getByRole("navigation")
        .getByRole("link", { name: linkLabel });
      const href = await link.evaluate((el) => el.getAttribute("href"));
      if (!href) {
        throw new Error("No href on the link");
      }
      await link.click();
      await page.waitForURL(href);
      await screenshot(page, pageName, screenshotSuffix);
    });
  }

  for (const [pageName, linkLabel] of Object.entries(FOOTER_LINKS)) {
    test(`Screenshots for ${pageName} ${textSuffix}`, async ({ page }) => {
      await page.goto("/");
      const link = page
        .getByRole("contentinfo")
        .getByRole("link", { name: linkLabel })
        .last();
      const href = await link.evaluate((el) => el.getAttribute("href"));
      if (!href) {
        throw new Error("No href on the link");
      }
      await link.click();
      await page.waitForURL(href);
      await screenshot(page, pageName, screenshotSuffix);
    });
  }

  test(`Screenshots for blog post ${textSuffix}`, async ({ page }) => {
    await page.goto("/blog/visual-testing");
    await screenshot(page, "blog-post-1", screenshotSuffix);
  });

  test(`Screenshots for customer feedback ${textSuffix}`, async ({ page }) => {
    await page.goto("/customers/mermaid");
    await screenshot(page, "customer-feedback", screenshotSuffix);
  });
}

test.describe("Screenshot pages", () => {
  runScreenshotTests();
});

test.describe("Screenshot pages dark mode", () => {
  const colorScheme = "dark";
  test.use({ colorScheme });
  runScreenshotTests(colorScheme);
});
