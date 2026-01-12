import { argosScreenshot } from "@argos-ci/playwright";
import { Page, test } from "@playwright/test";

const FOOTER_LINKS = {
  "visual-testing": "Visual Testing",
  "flaky-management": "Flaky Management",
  "test-debugging": "Test Debugging",
  pricing: "Pricing",
  "oss-friends": "OSS Friends",
  about: "About",
  security: "Security",
  contact: "Contact",
  privacy: "Privacy",
  terms: "Terms",
  "percy-vs-argos": "Percy",
  "applitools-vs-argos": "Applitools",
  "chromatic-vs-argos": "Chromatic",
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

  test(`Screenshots for customers page ${textSuffix}`, async ({ page }) => {
    await page.goto("/customers");
    await screenshot(page, "customers", screenshotSuffix);
  });

  test(`Screenshots for soc-2 ${textSuffix}`, async ({ page }) => {
    await page.goto("/security/soc-2");
    await screenshot(page, "soc-2", screenshotSuffix);
  });

  test(`Screenshots for gdpr ${textSuffix}`, async ({ page }) => {
    await page.goto("/security/gdpr");
    await screenshot(page, "gdpr", screenshotSuffix);
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
