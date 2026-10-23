// cypress/support/commands.js
// Reusable custom commands for the SawitPRO automation suite.

/**
 * Visit a path and assert the document title.
 * Keeps specs short and consistent across the suite.
 */
Cypress.Commands.add("visitAndCheckTitle", (path, expectedTitle) => {
  cy.visit(path);
  cy.title().should("eq", expectedTitle);
});

/**
 * Find a top-level navigation link by its visible text.
 * The site's header renders links as plain <a> tags inside the nav,
 * so matching by accessible text keeps the test resilient to class/id churn.
 */
Cypress.Commands.add("getNavLink", (label) => {
  return cy.get("header, nav").first().contains("a, button", label);
});

/**
 * Click a top-level nav link and wait for the URL to change accordingly.
 */
Cypress.Commands.add("clickNavLink", (label) => {
  // Split across two chains (rather than
  // `.scrollIntoView().click()` on one line): chaining two action
  // commands together is flagged as unsafe by cypress/unsafe-to-chain-command
  // since Cypress doesn't re-verify the subject between them.
  cy.getNavLink(label).scrollIntoView();
  cy.getNavLink(label).click({ force: true });
});

/**
 * Hover/open a dropdown menu item (e.g. "Produk") and click a submenu
 * entry inside it by its visible text.
 *
 * Uses `.realHover()` (cypress-real-events) instead of
 * `.trigger("mouseover")` because the site's dropdowns open via CSS
 * `:hover`, which a synthetic mouseover event does not trigger.
 */
Cypress.Commands.add("openSubMenu", (parentLabel, childLabel) => {
  cy.getNavLink(parentLabel).scrollIntoView();
  cy.getNavLink(parentLabel).realHover();
  cy.contains("a", childLabel, { timeout: 10000 }).should("be.visible").click({ force: true });
});

/**
 * Assert the page has loaded by checking the URL contains the given path
 * and the main content area is visible.
 */
Cypress.Commands.add("assertOnPage", (pathFragment) => {
  cy.url().should("include", pathFragment);
  cy.get("body").should("be.visible");
});
