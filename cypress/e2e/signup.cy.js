const viewportPresets = ["macbook-16", "ipad-2", "iphone-8"];

viewportPresets.forEach((viewportPreset) => {
  describe(viewportPreset, () => {
    beforeEach(() => {
      cy.viewport(viewportPreset);
    });
    const name = `${viewportPreset}/signup`;

    it("signup", () => {
      cy.visit("/signup");
      cy.stabilizePage();
      cy.argosScreenshot(name);
    });

    it("signup for hobby project", () => {
      cy.visit("/signup");
      cy.stabilizePage();
      cy.get('input[type="radio"][name="projectType"]').check("hobby");
      cy.argosScreenshot(`${name}-hobby-project`);

      cy.get('button[type="submit"]').click();
      cy.argosScreenshot(`${name}-hobby-missing-name`);

      cy.get('input[name="name"]').type("John Doe");
      cy.argosScreenshot(`${name}-hobby-filled-name`);
    });

    it("signup for pro project", () => {
      cy.visit("/signup");
      cy.stabilizePage();
      cy.get('input[type="radio"][name="projectType"]').check("pro");
      cy.argosScreenshot(`${name}-pro-project`);

      cy.get('button[type="submit"]').click();
      cy.argosScreenshot(`${name}-pro-missing-name`);

      cy.get('input[name="name"]').type("John Doe");
      cy.argosScreenshot(`${name}-pro-filled-name`);
    });
  });
});
