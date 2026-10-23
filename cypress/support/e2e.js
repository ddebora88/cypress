// cypress/support/e2e.js
// This file is processed and loaded automatically before test files.
// Put global configuration and behavior that modifies Cypress here.

import "./commands";

// SawitPRO's header dropdown menus (Produk, Program) open via pure CSS
// `:hover`. Cypress's synthetic `.trigger("mouseover")` dispatches a
// mouseover event but does NOT change the browser's real hover state that
// CSS `:hover` selectors key off, so it never visually opens those menus.
// cypress-real-events performs a genuine OS-level mouse move instead, which
// does trigger `:hover` correctly (see NavigationMenu.js / commands.js).
import "cypress-real-events/support";

// SawitPRO's site may load third-party scripts (ads, chat widgets, analytics)
// that sometimes throw uncaught exceptions unrelated to the app under test.
// We don't want those to fail our navigation/menu tests.
Cypress.on("uncaught:exception", () => {
  return false;
});
