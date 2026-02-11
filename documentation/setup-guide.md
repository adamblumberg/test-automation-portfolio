# Setup Guide - Test Automation Portfolio

This guide will help you set up and run all the test automation frameworks in this portfolio.

## 📋 Prerequisites

### Required Software
- **Node.js** 16+ (for JavaScript frameworks)
- **Java** 11+ (for Selenium Java tests) 
- **Maven** 3.8+ (for Java project management)
- **Git** (for cloning the repository)

### Recommended IDE/Editors
- **VS Code** (with extensions for each framework)
- **IntelliJ IDEA** (for Java Selenium tests)
- **Postman** (for API collection development)

## 🚀 Quick Setup (5 minutes)

### 1. Clone and Install Dependencies
```bash
# Clone the portfolio
git clone <repository-url>
cd test-automation-portfolio

# Install root dependencies
npm install

# Install JavaScript framework dependencies
cd ui-automation/selenium-javascript
npm install
cd ../..
```

### 2. Verify Java Setup (for Selenium Java)
```bash
# Check Java version
java -version

# Check Maven version  
mvn -version

# Test Java Selenium setup
cd ui-automation/selenium-java
mvn clean compile
```

### 3. Quick Test Run
```bash
# Run a quick Playwright test
cd ui-automation/playwright
npx playwright test --headed
```

## 🎯 Framework-Specific Setup

### Cypress Setup
```bash
cd ui-automation/cypress

# Verify Cypress installation
npx cypress verify

# Open Cypress Test Runner (interactive)
npx cypress open

# Run tests headlessly
npx cypress run
```

**Configuration Files:**
- `cypress.config.js` - Main configuration
- `cypress/support/e2e.js` - Global hooks and commands

### Playwright Setup
```bash
cd ui-automation/playwright

# Install browsers (first time only)
npx playwright install

# Run all tests
npx playwright test

# Run with UI mode
npx playwright test --ui

# Generate and view report
npx playwright show-report
```

**Configuration Files:**
- `playwright.config.js` - Test configuration and browser settings

### Selenium Java Setup
```bash
cd ui-automation/selenium-java

# Clean and compile
mvn clean compile

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=HomepageNavigationTest

# Run with specific browser
mvn test -Dbrowser=firefox
```

**Key Files:**
- `pom.xml` - Maven configuration and dependencies
- `testng.xml` - TestNG test suite configuration
- `src/test/resources/config.properties` - Test configuration

### Selenium JavaScript Setup
```bash
cd ui-automation/selenium-javascript

# Install dependencies
npm install

# Run all tests
npm test

# Run specific test suite
npm run test:ecommerce

# Run with specific browser
BROWSER=firefox npm test
```

**Configuration Files:**
- `package.json` - Dependencies and test scripts
- `mocha.opts` - Mocha test runner configuration

## 🔧 API Testing Setup (Postman + Newman)

### Newman Installation
```bash
# Install Newman globally
npm install -g newman

# Verify installation
newman --version
```

### Running API Tests
```bash
cd api-automation/postman

# Run single collection
newman run collections/ecommerce-api.json -e environments/staging.json

# Run all collections with HTML report
newman run collections/*.json \
  -e environments/staging.json \
  --reporters html \
  --reporter-html-export reports/api-report.html
```

## 🌐 Browser Management

### Automatic Browser Management
- **Cypress**: Manages browsers internally
- **Playwright**: `npx playwright install` downloads all browsers

### Manual Browser Setup (Selenium)
If you encounter browser driver issues:

```bash
# Download ChromeDriver (latest)
# Place in PATH or specify in code

# Firefox GeckoDriver
# Download from GitHub releases

# Edge WebDriver  
# Available through Windows Update
```

## 🏃‍♂️ Running All Tests

### Sequential Execution
```bash
# From root directory
npm run test:cypress
npm run test:playwright  
npm run test:selenium-js

# Java tests separately
cd ui-automation/selenium-java && mvn test
```

### Quick Smoke Tests
```bash
# Run one test from each framework (fast validation)
cd ui-automation/cypress && npx cypress run --spec "cypress/e2e/homepage.cy.js"
cd ../playwright && npx playwright test tests/homepage.spec.js
cd ../selenium-javascript && npm test -- --grep "Homepage"
cd ../selenium-java && mvn test -Dtest=HomepageNavigationTest
```

## 📊 Viewing Test Reports

### Report Locations
- **Cypress**: `ui-automation/cypress/cypress/reports/`
- **Playwright**: `ui-automation/playwright/playwright-report/`
- **Selenium JS**: `ui-automation/selenium-javascript/reports/`
- **Selenium Java**: `ui-automation/selenium-java/target/surefire-reports/`
- **API Tests**: `api-automation/postman/reports/`

### Opening Reports
```bash
# Playwright (opens in browser)
cd ui-automation/playwright && npx playwright show-report

# Cypress (if dashboard configured)
cd ui-automation/cypress && npx cypress open

# HTML reports (open in browser)
open test-reports/playwright-report/index.html
```

## 🚨 Troubleshooting

### Common Issues

#### Node.js Version Issues
```bash
# Check Node version
node --version

# If version < 16, update Node.js
```

#### Browser Launch Failures
```bash
# Playwright browser issues
npx playwright install --force

# Selenium ChromeDriver issues  
# Update ChromeDriver to match Chrome version
```

#### Java/Maven Issues
```bash
# Set JAVA_HOME
export JAVA_HOME=/path/to/java

# Verify Maven settings
mvn help:system
```

#### Port Conflicts
If tests fail due to port issues:
```bash
# Check for processes using ports 3000, 4444, etc.
lsof -i :3000
netstat -an | grep :4444
```

### Test Environment Issues

#### Network/Firewall
- Tests require internet access for external sites
- Some corporate firewalls may block WebDriver communications

#### System Resources
- Ensure adequate RAM (4GB+ recommended for parallel execution)
- Close unnecessary applications during test runs

## 🎯 Best Practices for Running Tests

### Development Environment
1. **Run tests frequently** during development
2. **Use headed mode** for debugging
3. **Run single tests** when developing new features
4. **Check reports** after each run

### CI/CD Environment  
1. **Use headless mode** for faster execution
2. **Configure parallel execution** where supported
3. **Set appropriate timeouts** for slower environments
4. **Archive test reports** as build artifacts

### Performance Optimization
1. **Use test tags** to run specific subsets
2. **Configure browser options** for faster execution
3. **Implement smart waiting strategies**
4. **Use data-driven approaches** for test variations

## 📞 Getting Help

### Documentation Links
- [Cypress Docs](https://docs.cypress.io/)
- [Playwright Docs](https://playwright.dev/)
- [Selenium WebDriver Docs](https://selenium.dev/documentation/)
- [TestNG Documentation](https://testng.org/doc/)

### Debug Mode Activation
```bash
# Cypress debug mode
DEBUG=cypress:* npx cypress run

# Playwright debug mode
PWDEBUG=1 npx playwright test

# Node.js debugging
node --inspect-brk ./node_modules/.bin/mocha test.js
```

---

This setup guide covers all frameworks in the portfolio. For framework-specific advanced configuration, refer to the README files in each framework directory.