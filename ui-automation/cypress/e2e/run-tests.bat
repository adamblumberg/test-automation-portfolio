@echo off
cd "c:\Users\the_m\cypress-project"
echo Running Playwright tests...
npx playwright test --config=cypress/e2e/playwright-working.config.js --reporter=list > test-output.txt 2>&1
echo Test completed. Check test-output.txt for results.
type test-output.txt
