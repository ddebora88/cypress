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
      return config;
    },
  },
});
