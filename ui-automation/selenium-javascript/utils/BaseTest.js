const DriverFactory = require('./DriverFactory');

class BaseTest {
    constructor() {
        this.driverFactory = new DriverFactory();
        this.driver = null;
    }

    /**
     * Set up test - initialize driver
     */
    async setUp(browserName = process.env.BROWSER || 'chrome') {
        this.driver = await this.driverFactory.initializeDriver(browserName);
        return this.driver;
    }

    /**
     * Tear down test - quit driver
     */
    async tearDown() {
        await this.driverFactory.quitDriver();
    }

    /**
     * Get driver instance
     */
    getDriver() {
        return this.driver;
    }

    /**
     * Navigate to URL
     */
    async navigateTo(url) {
        await this.driverFactory.navigateTo(url);
    }

    /**
     * Get current URL
     */
    async getCurrentUrl() {
        return await this.driverFactory.getCurrentUrl();
    }

    /**
     * Get page title
     */
    async getPageTitle() {
        return await this.driverFactory.getPageTitle();
    }

    /**
     * Wait for element
     */
    async waitForElement(locator, timeout = 10000) {
        return await this.driverFactory.waitForElement(locator, timeout);
    }

    /**
     * Wait for element to be visible
     */
    async waitForElementVisible(locator, timeout = 10000) {
        return await this.driverFactory.waitForElementVisible(locator, timeout);
    }

    /**
     * Wait for element to be clickable
     */
    async waitForElementClickable(locator, timeout = 10000) {
        return await this.driverFactory.waitForElementClickable(locator, timeout);
    }
}

module.exports = BaseTest;
