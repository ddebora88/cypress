// cypress/support/e2e.js
// This file is processed and loaded automatically before test files.
// Put global configuration and behavior that modifies Cypress here.

import "./commands";

// SawitPRO's site may load third-party scripts (ads, chat widgets, analytics)
// that sometimes throw uncaught exceptions unrelated to the app under test.
// We don't want those to fail our navigation/menu tests.
Cypress.on("uncaught:exception", () => {
  return false;
});
