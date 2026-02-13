const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'ui-automation/cypress/e2e/**/*.cy.js',
    screenshotsFolder: 'reports/screenshots/cypress',
    videosFolder: 'reports/cypress-reports/videos',
    screenshotOnRunFailure: true,
    video: true
  },
});
