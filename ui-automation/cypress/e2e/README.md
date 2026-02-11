# Cypress & Playwright Test Suites

This project contains both Cypress and Playwright test suites for the ecommerce-playground website.

## Directory Structure

```
cypress/
├── e2e/
│   ├── cypress/           # Cypress support files
│   ├── ecommerce-playground/  # Original Cypress tests
│   │   ├── AddCheckoutTests.lambda.spec.js
│   │   ├── basicNavigation.lambda.spec.js
│   │   ├── basicSearch.lambda.spec.js
│   │   ├── HomepageLoad.lambda.spec.js
│   │   ├── HomepageNav.lambda.spec.js
│   │   └── ShoppingCart.spec.js
│   └── playwright/        # Playwright tests (converted from Cypress)
│       ├── ecommerce-playground/
│       │   ├── AddCheckoutTests.spec.js
│       │   ├── basicNavigation.spec.js
│       │   ├── basicSearch.spec.js
│       │   ├── HomepageLoad.spec.js
│       │   ├── HomepageNav.spec.js
│       │   └── ShoppingCart.spec.js
│       └── playwright.config.js
├── cypress.config.js      # Cypress configuration
└── package.json
```

## Test Coverage

Both test suites cover the same functionality:

1. **Homepage Load Tests**: Basic homepage loading and element visibility
2. **Homepage Navigation Tests**: Navigation between different pages from the homepage
3. **Basic Navigation Tests**: Site navigation, category browsing, search functionality
4. **Basic Search Tests**: Search functionality including autocomplete, special characters, and error handling
5. **Shopping Cart Tests**: End-to-end checkout process as a guest user
6. **Add Checkout Tests**: Additional checkout-related functionality

## Setup and Installation

### Prerequisites
```bash
npm install
```

### Installing Playwright (if not already installed)
```bash
npm install --save-dev @playwright/test
npx playwright install
```

## Running Tests

### Cypress Tests
```bash
# Run Cypress tests interactively
npx cypress open

# Run Cypress tests in headless mode
npx cypress run

# Run specific Cypress test suite
npx cypress run --spec "cypress/e2e/ecommerce-playground/**/*.spec.js"
```

### Playwright Tests
```bash
# Run Playwright tests
npx playwright test --config=cypress/e2e/playwright.config.js

# Run Playwright tests with UI mode
npx playwright test --config=cypress/e2e/playwright.config.js --ui

# Run specific Playwright test suite
npx playwright test --config=cypress/e2e/playwright.config.js cypress/e2e/playwright/ecommerce-playground/

# Run Playwright tests in headed mode
npx playwright test --config=cypress/e2e/playwright.config.js --headed
```

## Key Differences Between Implementations

### Cypress → Playwright Conversions

1. **Test Structure**:
   - Cypress: `describe()` and `it()` with `cy.` commands
   - Playwright: `test.describe()` and `test()` with `await` syntax

2. **Element Selection**:
   - Cypress: `cy.get('.selector')`
   - Playwright: `page.locator('.selector')`

3. **Text-based Selection**:
   - Cypress: `cy.contains('text')`
   - Playwright: `page.locator(':has-text("text")')`

4. **Assertions**:
   - Cypress: `cy.url().should('include', 'text')`
   - Playwright: `await expect(page).toHaveURL(/text/)`

5. **Actions**:
   - Cypress: `cy.get('input').type('text{enter}')`
   - Playwright: `await page.locator('input').fill('text'); await page.locator('input').press('Enter')`

## Test Target

All tests target the LambdaTest eCommerce Playground: `https://ecommerce-playground.lambdatest.io`

## Notes

- The original Cypress tests are preserved in their original location
- Playwright tests provide the same functionality with modern async/await syntax
- Both test suites can be run independently
- Playwright tests include improved error handling and more explicit wait strategies
