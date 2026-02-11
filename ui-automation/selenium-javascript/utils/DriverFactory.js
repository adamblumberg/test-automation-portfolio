const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');

class DriverFactory {
    constructor() {
        this.driver = null;
    }

    /**
     * Initialize WebDriver based on browser type
     * @param {string} browserName - Browser name (chrome, firefox, edge)
     */
    async initializeDriver(browserName = 'chrome') {
        const browser = browserName.toLowerCase();
        
        switch (browser) {
            case 'chrome':
                const chromeOptions = new chrome.Options();
                chromeOptions.addArguments('--disable-notifications');
                chromeOptions.addArguments('--disable-popup-blocking');
                chromeOptions.addArguments('--disable-dev-shm-usage');
                chromeOptions.addArguments('--no-sandbox');
                
                this.driver = await new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(chromeOptions)
                    .build();
                break;
                
            case 'firefox':
                const firefoxOptions = new firefox.Options();
                firefoxOptions.setPreference('dom.webnotifications.enabled', false);
                
                this.driver = await new Builder()
                    .forBrowser('firefox')
                    .setFirefoxOptions(firefoxOptions)
                    .build();
                break;
                
            case 'edge':
                const edgeOptions = new edge.Options();
                edgeOptions.addArguments('--disable-notifications');
                
                this.driver = await new Builder()
                    .forBrowser('MicrosoftEdge')
                    .setEdgeOptions(edgeOptions)
                    .build();
                break;
                
            default:
                throw new Error(`Browser not supported: ${browserName}`);
        }
        
        await this.driver.manage().window().maximize();
        await this.driver.manage().setTimeouts({ implicit: 10000 });
        
        return this.driver;
    }

    /**
     * Get current WebDriver instance
     */
    getDriver() {
        return this.driver;
    }

    /**
     * Quit WebDriver and clean up
     */
    async quitDriver() {
        if (this.driver) {
            await this.driver.quit();
            this.driver = null;
        }
    }

    /**
     * Navigate to URL
     */
    async navigateTo(url) {
        await this.driver.get(url);
    }

    /**
     * Get current URL
     */
    async getCurrentUrl() {
        return await this.driver.getCurrentUrl();
    }

    /**
     * Get page title
     */
    async getPageTitle() {
        return await this.driver.getTitle();
    }

    /**
     * Wait for element to be located
     */
    async waitForElement(locator, timeout = 10000) {
        return await this.driver.wait(until.elementLocated(locator), timeout);
    }

    /**
     * Wait for element to be visible
     */
    async waitForElementVisible(locator, timeout = 10000) {
        const element = await this.waitForElement(locator, timeout);
        return await this.driver.wait(until.elementIsVisible(element), timeout);
    }

    /**
     * Wait for element to be clickable
     */
    async waitForElementClickable(locator, timeout = 10000) {
        const element = await this.waitForElement(locator, timeout);
        return await this.driver.wait(until.elementIsEnabled(element), timeout);
    }
}

module.exports = DriverFactory;
