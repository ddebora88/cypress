const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.sawitpro.id",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Writes raw Allure result files (json/attachments) to allure-results/
      // as tests run. Turn those into the viewable HTML report with
      // `npm run allure:report` (see README > Allure Test Report).
      allureCypress(on, config, {
        resultsDir: "allure-results",
        // Auto-logging every low-level Cypress command (stepsFromCommands)
        // crashes with "RangeError: Invalid string length" while
        // JSON.stringify-ing the arguments of certain commands — observed
        // with cypress-real-events' realHover() in this project's dropdown
        // tests. Test-level results, suites, retries and failure
        // screenshots are unaffected; this only turns off the extra
        // per-command step breakdown inside each test.
        stepsFromCommands: {
          enabled: false,
        },
      });

      // Hard-block Electron (Cypress's bundled default browser): the
      // Produk/Program dropdowns open via CSS `:hover`, and
      // cypress-real-events' realHover() doesn't reliably render that
      // `:hover` state in Electron when run headless (it does in Chrome,
      // which has fuller CDP `Input` domain support — see README > Notes).
      // This throws early with a clear message instead of letting someone
      // run `cypress open`/`cypress run` without `--browser chrome` and
      // hit confusing dropdown-test failures.
      on("before:browser:launch", (browser) => {
        if (browser.family !== "chromium" || browser.name === "electron") {
          throw new Error(
            `This suite requires Chrome (got "${browser.name}"). Run with --browser chrome, ` +
              `e.g. "npx cypress run --browser chrome" or "npx cypress open --browser chrome" ` +
              `(the npm scripts in package.json already do this).`
          );
        }
      });

      return config;
    },
  },
});
