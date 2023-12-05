const pages = [
  { name: "homepage", path: "/" },
  { name: "terms", path: "/terms" },
  { name: "privacy", path: "/privacy" },
  { name: "security", path: "/security" },
  { name: "blog", path: "/blog" },
  { name: "pricing", path: "/pricing" },
  { name: "blog-post-1", path: "/blog/visual-testing" },
  { name: "blog-post-2", path: "/blog/improve-dx" },
  { name: "blog-post-3", path: "/blog/playwright" },
];

const viewports = ["macbook-16", "ipad-2", "iphone-8"];

describe("Screenshot pages", () => {
  for (const { name, path } of pages) {
    it(`Screenshots for ${name}`, () => {
      cy.visit(path);
      cy.argosScreenshot(name, { viewports });
    });
  }
});
