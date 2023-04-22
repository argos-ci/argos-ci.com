const pages = {
  homepage: "/",
  login: "/login",
  terms: "/terms",
  privacy: "/privacy",
  security: "/security",
  blog: "/blog",
  "blog-post-1": "/blog/visual-testing",
  "blog-post-2": "/blog/improve-dx",
  "blog-post-3": "/blog/playwright",
};

const viewportPresets = ["macbook-16", "ipad-2", "iphone-8"];

viewportPresets.forEach((viewportPreset) => {
  describe(viewportPreset, () => {
    beforeEach(() => {
      cy.viewport(viewportPreset);
    });
    Object.keys(pages).forEach((pageName) => {
      const name = `${viewportPreset}/${pageName}`;

      it(pageName, () => {
        cy.visit(pages[pageName]);
        cy.wait(200);
        cy.stabilizePage();
        cy.argosScreenshot(name);
      });
    });
  });
});
