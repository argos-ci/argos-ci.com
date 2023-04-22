// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@argos-ci/cypress/support";

function injectStyles(document, styles) {
  const css = document.createElement("style");
  css.type = "text/css";
  css.textContent = styles;
  document.body.appendChild(css);
}

Cypress.Commands.add("stabilizePage", () => {
  cy.wait(200);
  cy.document().then((document) => {
    injectStyles(
      document,
      `
            /* No sticky header */
            nav {
              position: initial !important;
            }
          `
    );
  });
  cy.waitUntil(() =>
    cy.document().then((document) => {
      const allImages = Array.from(document.images);
      allImages.forEach((img) => {
        img.loading = "eager";
        img.decoding = "sync";
      });
      return allImages.every((img) => img.complete && img.naturalWidth > 0);
    })
  );
});
