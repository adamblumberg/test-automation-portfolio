# Selenium JavaScript Framework

This is a Selenium WebDriver framework written in JavaScript that mirrors the same test cases from your Cypress tests. The framework uses Mocha for test execution and Chai for assertions.

## Project Structure

```
selenium-js-framework/
├── pages/                      # Page Object Model classes
│   ├── EcommercePage.js       # eCommerce playground page objects
│   ├── HerokuLoginPage.js     # Heroku login page objects
│   └── ShoppingCartPage.js    # Shopping cart page objects
├── tests/                     # Test files
│   ├── ecommerce/            # eCommerce tests
│   │   ├── basicSearch.test.js
│   │   ├── cartOperations.test.js
│   │   ├── homepageLoad.test.js
│   │   └── homepageNavigation.test.js
│   └── heroku/               # Heroku tests
│       └── loginFunctionality.test.js
├── utils/                    # Utility classes
│   ├── BaseTest.js          # Base test class
│   └── DriverFactory.js     # WebDriver factory
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Prerequisites

- Node.js (version 12 or higher)
- npm or yarn
- Chrome, Firefox, or Edge browser installed

## Setup

1. Navigate to the selenium framework directory:
   ```bash
   cd selenium-js-framework
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Run all tests (default browser: Chrome):
```bash
npm test
```

### Run tests with specific browser:
```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Edge
npm run test:edge
```

### Run specific test suites:
```bash
# Run only eCommerce tests
npm run test:ecommerce

# Run only Heroku tests
npm run test:heroku
```

### Run individual test files:
```bash
# Run homepage load test
npx mocha tests/ecommerce/homepageLoad.test.js --timeout 30000

# Run login functionality test
npx mocha tests/heroku/loginFunctionality.test.js --timeout 30000
```

## Test Cases

### eCommerce Playground Tests
1. **Homepage Load Test** - Verifies the homepage loads and search field is visible
2. **Basic Search Test** - Tests search functionality with valid/invalid searches and special characters
3. **Homepage Navigation Test** - Tests navigation to different pages (Home, Special, Blog, Mega Menu)
4. **Cart Operations Test** - Tests adding products to cart, updating quantities, and removing items

### Heroku Tests
1. **Login Functionality Test** - Tests login with valid/invalid credentials and logout

## Browser Support

The framework supports the following browsers:
- Chrome (default)
- Firefox
- Microsoft Edge

## Environment Variables

You can set the browser using environment variables:
```bash
BROWSER=firefox npm test
BROWSER=edge npm test
```

## Framework Features

- **Page Object Model**: Clean separation of page elements and test logic
- **Cross-browser support**: Run tests on Chrome, Firefox, and Edge
- **Automatic driver management**: Uses selenium-webdriver for automatic driver setup
- **Mocha test runner**: Well-structured test execution with before/after hooks
- **Chai assertions**: Readable and expressive assertions
- **Parallel execution ready**: Framework structure supports parallel test execution

## Test Reports

The framework uses Mocha's built-in reporter. For enhanced reporting, you can install and configure mochawesome:

```bash
npm install mochawesome --save-dev
```

Then run tests with:
```bash
npx mocha tests/**/*.test.js --timeout 30000 --reporter mochawesome
```

## Troubleshooting

1. **Driver issues**: The framework automatically manages drivers, but ensure your browser is up to date.

2. **Timeout errors**: If tests fail due to timeouts, you can increase the timeout:
   ```bash
   npx mocha tests/**/*.test.js --timeout 60000
   ```

3. **Element not found**: Some elements might take longer to load. The framework includes explicit waits, but you may need to adjust timing for slower environments.

## Comparison with Cypress Tests

This Selenium framework provides the exact same test coverage as your Cypress tests:

| Cypress Test File | Selenium Test File |
|---|---|
| `homepageLoad.lambda.cy.js` | `homepageLoad.test.js` |
| `basicSearch.lambda.cy.js` | `basicSearch.test.js` |
| `homepageNav.lambda.cy.js` | `homepageNavigation.test.js` |
| `cartOperations.cy.js` | `cartOperations.test.js` |
| `loginFunctionality.cy.js` | `loginFunctionality.test.js` |

The test logic and assertions are equivalent, ensuring consistent test coverage across both frameworks.
