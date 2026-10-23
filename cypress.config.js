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
      });
      return config;
    },
  },
});
