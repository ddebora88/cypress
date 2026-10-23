# SawitPRO Web Automation (Cypress Sample Project)

[![E2E Tests](https://github.com/ddebora88/cypress/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/ddebora88/cypress/actions/workflows/e2e-tests.yml)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-view-blue)](https://ddebora88.github.io/cypress/)
[![License: MIT](https://img.shields.io/github/license/ddebora88/cypress)](LICENSE)
[![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E?logo=cypress&logoColor=white)](https://www.cypress.io/)

Sample end-to-end test automation suite for [sawitpro.id](https://www.sawitpro.id/), built with [Cypress](https://www.cypress.io/). It demonstrates how to automate a real production site's main navigation menu — including CSS-`:hover`-only dropdowns — using a Page Object Model structure, data-driven tests, a CI pipeline, and an Allure report published on every run.

**[→ View the latest Allure report](https://ddebora88.github.io/cypress/)** (updated automatically by CI on every push to `main`)

## Skills demonstrated

- **Page Object Model** — all locators live in `cypress/support/pageObjects/`, specs stay declarative
- **Data-driven testing** — the full top-level menu is verified from one fixture (`cypress/fixtures/menu-data.json`), not hardcoded per test
- **Debugging a real flaky-test cause** — diagnosed that `cy.trigger("mouseover")` doesn't satisfy CSS `:hover` (it only dispatches an event, it doesn't change the browser's real hover state), and fixed it with genuine mouse-move simulation (`cypress-real-events`) instead of papering over it with `{ force: true }`
- **Custom commands** — reusable nav interactions (`cy.clickNavLink`, `cy.openSubMenu`, `cy.visitAndCheckTitle`) shared across specs
- **CI/CD** — GitHub Actions runs lint + the full suite on every push/PR, uploads screenshots on failure, and auto-publishes the Allure report to GitHub Pages
- **Test reporting** — Allure integration (`allure-cypress`) for a stakeholder-readable pass/fail report with steps and failure screenshots, not just terminal output
- **Code quality tooling** — ESLint (`eslint-plugin-cypress`) + Prettier, enforced in CI

## What's covered

| Area                    | Spec file                                | What it tests                                                                                                                          |
| ----------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage                | `cypress/e2e/homepage/homepage.cy.js`    | Page load, title, nav visibility, hero CTA, footer links, social links                                                                 |
| Main menu (data-driven) | `cypress/e2e/navigation/main-menu.cy.js` | Every top-level menu item (Tentang, Produk, Program, Karir, Promo, Berita, Harga Sawit), plus the Produk and Program dropdown submenus |
| Produk page             | `cypress/e2e/pages/produk.cy.js`         | Product cards, submenu navigation into PetaniPRO / KebunPRO                                                                            |
| Karir page              | `cypress/e2e/pages/karir.cy.js`          | Page content and menu reachability                                                                                                     |
| Harga Sawit page        | `cypress/e2e/pages/harga-tbs.cy.js`      | Page content and menu reachability                                                                                                     |

## Project structure

```
.github/workflows/
└── e2e-tests.yml          # CI: lint + Cypress run + Allure publish to GitHub Pages
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
eslint.config.js
.prettierrc.json
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

## Code quality

```bash
npm run lint           # ESLint (base rules + eslint-plugin-cypress)
npm run lint:fix        # ESLint, auto-fixing what it can
npm run format          # Prettier, writes changes
npm run format:check    # Prettier, check only (what CI runs)
```

Both run in CI on every push/PR (see `.github/workflows/e2e-tests.yml`).

## CI/CD

Every push and pull request to `main` triggers `.github/workflows/e2e-tests.yml`, which:

1. **Lints** the project (ESLint + Prettier check)
2. **Runs the full Cypress suite** headlessly (via [`cypress-io/github-action`](https://github.com/cypress-io/github-action))
3. **Generates the Allure report** from the run's results
4. **Uploads** the Allure report and, on failure, Cypress screenshots as workflow artifacts (kept 30 days)
5. **Publishes the Allure report to GitHub Pages** (from `main` only) — see the badge/link at the top of this README

You can also trigger a run manually from the **Actions** tab (`workflow_dispatch`).

> **First-time setup note:** GitHub Pages needs to be enabled once in this repo's **Settings → Pages**, with the source set to the `gh-pages` branch (root) that this workflow creates on its first successful run on `main`.

## Allure Test Report

Test runs are recorded by [`allure-cypress`](https://allurereport.org/docs/cypress/) and rendered into a browsable HTML report (pass/fail per test, steps, screenshots on failure, history/trends across runs). CI publishes this automatically (see above); to generate it locally:

**Prerequisite:** generating/opening the report needs a **Java Runtime (JRE 8+)** on your machine — that's what the Allure commandline tool runs on. `npm install` alone doesn't need Java, only the two `allure:*` steps below.

### 1. Run the tests (writes raw results to `allure-results/`)

```bash
npm run cypress:run
```

### 2. Generate and open the HTML report

```bash
npm run allure:report
```

This builds static HTML into `allure-report/` and opens it in your browser. You can also run the two steps separately: `npm run allure:generate` then `npm run allure:open`.

### Or do it all in one go

```bash
npm run test:report
```

Cleans old results, runs every spec, then generates and opens the report — even if some tests fail, since seeing the failures is the point.

`allure-results/` and `allure-report/` are generated output and are git-ignored; each teammate (or CI run) regenerates them locally.

## Notes

- `baseUrl` is set to `https://www.sawitpro.id` in `cypress.config.js`, so specs use relative paths like `cy.visit("/produk")`.
- The site is public and may change its DOM/markup over time (menu labels, copy, product cards). If a selector breaks, the `NavigationMenu` and `HomePage` page objects in `cypress/support/pageObjects/` are the single place to update it.
- Menu items, paths, and expected page titles used by the data-driven test live in `cypress/fixtures/menu-data.json` — add a new object there to extend coverage to another menu item without touching the spec code.
- `Cypress.on("uncaught:exception")` is set to not fail tests on third-party script errors (ads, chat widgets, analytics) that are unrelated to what's under test.
- The "Produk" and "Program" header menus open via pure CSS `:hover`. Cypress's synthetic `.trigger("mouseover")` does **not** change the browser's real hover state that CSS `:hover` relies on, so it won't visually open these dropdowns. This project uses [`cypress-real-events`](https://github.com/dmtrKovalenko/cypress-real-events)'s `.realHover()` instead (see `NavigationMenu.js` / `commands.js`), which performs a genuine OS-level mouse move.
- **Chrome, not Electron, is the default browser** (`cypress:run` / `test` / CI all pass `--browser chrome`): `realHover()`'s CDP-simulated mouse move doesn't reliably render the `:hover` state in Cypress's bundled Electron when run headless, but does in Chrome, which has fuller CDP `Input` domain support. The submenu _navigation_ tests don't depend on this (they force-click the link either way — see `openProdukSubmenu`/`openProgramSubmenu`), but "opens the Produk dropdown and shows PetaniPRO as an option" specifically asserts the dropdown becomes visible, so it needs a browser where the hover genuinely renders. Use `npm run test:electron` if you need to run against Electron instead (e.g. to compare).
- Allure's `stepsFromCommands` auto-step-logging (every low-level Cypress command becomes an Allure step) is turned off in `cypress.config.js` — it crashed with `RangeError: Invalid string length` while serializing a `realHover()` command's arguments. Test-level results, suites, retries, and failure screenshots are unaffected; only the extra per-command step breakdown inside each test is skipped.
- **Known `allure-cypress` limitation:** separately from the above, when a `.should("be.visible")` (or similar) assertion _fails_ on a DOM/jQuery subject, `allure-cypress`'s failure-reporting path also `JSON.stringify`s that subject with no depth/length limit, which can throw the same `RangeError: Invalid string length` on a DOM-heavy page — masking the real assertion failure behind a crash instead of a readable error. Where a test's whole point is asserting visibility (e.g. "opens the Produk dropdown..." in `main-menu.cy.js`), this project asserts against a plain CSS string (`$el.css("display")`) instead of chaining `.should("be.visible")` directly on the element, which keeps any real failure there readable.
- `npm run test:report` chains commands with `;` so the report still generates after a run with failing tests; that syntax needs a POSIX shell (macOS/Linux/Git Bash/WSL). On plain Windows `cmd`/PowerShell, run the steps separately instead: `npm run cypress:run` then `npm run allure:report`.
- `cypress/unsafe-to-chain-command` (an ESLint rule from `eslint-plugin-cypress`) flags chaining two Cypress _action_ commands together, e.g. `.scrollIntoView().click()`, because Cypress doesn't re-verify the subject between them. This project splits those into two statements instead (re-querying the cheap, static nav link) — see `NavigationMenu.js` / `commands.js` for the pattern.

## Extending this project

- **New page tests:** add a `*.cy.js` file under `cypress/e2e/pages/`.
- **New menu item:** add an entry to `cypress/fixtures/menu-data.json` and, if it's a dropdown, add an `openXSubmenu()` method to `NavigationMenu.js`.
- **CI:** already wired up (see [CI/CD](#cicd) above) — `.github/workflows/e2e-tests.yml` runs on every push/PR with no extra setup beyond enabling GitHub Pages once.
