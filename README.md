# SawitPRO Web Automation (Cypress Sample Project)

Sample end-to-end test automation suite for [sawitpro.id](https://www.sawitpro.id/), built with [Cypress](https://www.cypress.io/). It demonstrates how to automate the site's main navigation menu, including dropdown submenus, using a Page Object Model structure.

## What's covered

| Area | Spec file | What it tests |
|---|---|---|
| Homepage | `cypress/e2e/homepage/homepage.cy.js` | Page load, title, nav visibility, hero CTA, footer links, social links |
| Main menu (data-driven) | `cypress/e2e/navigation/main-menu.cy.js` | Every top-level menu item (Tentang, Produk, Program, Karir, Promo, Berita, Harga Sawit), plus the Produk and Program dropdown submenus |
| Produk page | `cypress/e2e/pages/produk.cy.js` | Product cards, submenu navigation into PetaniPRO / KebunPRO |
| Karir page | `cypress/e2e/pages/karir.cy.js` | Page content and menu reachability |
| Harga Sawit page | `cypress/e2e/pages/harga-tbs.cy.js` | Page content and menu reachability |

## Project structure

```
cypress/
├── e2e/
│   ├── homepage/
│   │   └── homepage.cy.js
│   ├── navigation/
│   │   └── main-menu.cy.js
│   └── pages/
│       ├── produk.cy.js
│       ├── karir.cy.js
│       └── harga-tbs.cy.js
├── fixtures/
│   └── menu-data.json        # menu labels, paths & expected titles (data-driven tests)
└── support/
    ├── commands.js            # custom Cypress commands
    ├── e2e.js                 # global config, loaded before every spec
    └── pageObjects/
        ├── HomePage.js
        └── NavigationMenu.js  # all nav/menu locators live here
cypress.config.js
package.json
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the tests

Open the interactive Cypress Test Runner (good for development/debugging):

```bash
npm run cypress:open
```

Run all specs headlessly in the terminal (CI mode):

```bash
npm run cypress:run
```

Run a specific suite:

```bash
npm run test:menu       # only the main navigation menu spec
npm run test:homepage   # only the homepage spec
```

## Notes

- `baseUrl` is set to `https://www.sawitpro.id` in `cypress.config.js`, so specs use relative paths like `cy.visit("/produk")`.
- The site is public and may change its DOM/markup over time (menu labels, copy, product cards). If a selector breaks, the `NavigationMenu` and `HomePage` page objects in `cypress/support/pageObjects/` are the single place to update it.
- Menu items, paths, and expected page titles used by the data-driven test live in `cypress/fixtures/menu-data.json` — add a new object there to extend coverage to another menu item without touching the spec code.
- `Cypress.on("uncaught:exception")` is set to not fail tests on third-party script errors (ads, chat widgets, analytics) that are unrelated to what's under test.
- The "Produk" and "Program" header menus open via pure CSS `:hover`. Cypress's synthetic `.trigger("mouseover")` does **not** change the browser's real hover state that CSS `:hover` relies on, so it won't visually open these dropdowns. This project uses [`cypress-real-events`](https://github.com/dmtrKovalenko/cypress-real-events)'s `.realHover()` instead (see `NavigationMenu.js` / `commands.js`), which performs a genuine OS-level mouse move.

## Extending this project

- **New page tests:** add a `*.cy.js` file under `cypress/e2e/pages/`.
- **New menu item:** add an entry to `cypress/fixtures/menu-data.json` and, if it's a dropdown, add an `openXSubmenu()` method to `NavigationMenu.js`.
- **CI:** this project is ready to run in any CI environment with Node.js — e.g. `npm ci && npm run cypress:run`.
