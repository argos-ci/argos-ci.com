const pages = [
  { name: "homepage", path: "/" },
  { name: "playwright+argos", path: "/playwright" },

  // Customers pages
  { name: "customers", path: "/customers" },
  { name: "customers-mermaid", path: "/customers/mermaid" },
  { name: "customers-lemonde", path: "/customers/lemonde" },
  { name: "customers-gitbook", path: "/customers/gitbook" },

  { name: "pricing", path: "/pricing" },
  { name: "changelog", path: "/changelog" },

  // Blog pages
  { name: "blog", path: "/blog" },
  { name: "blog-post-1", path: "/blog/visual-testing" },
  { name: "blog-post-2", path: "/blog/improve-dx" },
  { name: "blog-post-3", path: "/blog/playwright" },

  // Security pages
  { name: "security", path: "/security" },
  { name: "security-soc-2", path: "/security/soc-2" },
  { name: "security-gdpr", path: "/security/gdpr" },

  { name: "terms", path: "/terms" },
  { name: "privacy", path: "/privacy" },

  // Compare pages
  { name: "percy-vs-argos", path: "/compare/percy" },
  { name: "applitools-vs-argos", path: "/compare/applitools" },
  { name: "chromatic-vs-argos", path: "/compare/chromatic" },

  { name: "oss-friends", path: "/oss-friends" },
];

describe("Screenshot pages", () => {
  for (const { name, path } of pages) {
    it(`Screenshots for ${name}`, () => {
      cy.visit(path);
      cy.argosScreenshot(name, {
        viewports: ["macbook-16", "ipad-2", "iphone-8"],
      });
    });
  }
});

describe("Screenshot pages dark mode", () => {
  before(() => {
    cy.visit("/");
    const darkModeToggle = cy.get('button[aria-label="Dark mode"]');
    darkModeToggle.click();
    darkModeToggle.should("have.attr", "aria-pressed", "true");
  });

  for (const { name, path } of pages) {
    it(`Screenshots for ${name}`, () => {
      cy.visit(path);
      cy.argosScreenshot(`${name}-dark`, {
        viewports: ["macbook-16", "ipad-2", "iphone-8"],
      });
    });
  }
});
