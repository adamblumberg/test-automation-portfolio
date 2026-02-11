const { By, until } = require('selenium-webdriver');

class HerokuLoginPage {
    constructor(driver) {
        this.driver = driver;
        
        // Page element locators
        this.usernameField = By.id('username');
        this.passwordField = By.id('password');
        this.loginButton = By.className('radius');
        this.flashMessage = By.id('flash');
        this.logoutButton = By.xpath("//a[@class='button secondary radius']");
    }

    /**
     * Navigate to login page
     */
    async navigateToLoginPage() {
        await this.driver.get('http://the-internet.herokuapp.com/login');
    }

    /**
     * Enter username
     */
    async enterUsername(username) {
        const element = await this.driver.wait(until.elementLocated(this.usernameField), 10000);
        await element.clear();
        await element.sendKeys(username);
    }

    /**
     * Enter password
     */
    async enterPassword(password) {
        const element = await this.driver.findElement(this.passwordField);
        await element.clear();
        await element.sendKeys(password);
    }

    /**
     * Click login button
     */
    async clickLoginButton() {
        const element = await this.driver.findElement(this.loginButton);
        await element.click();
    }

    /**
     * Perform login with username and password
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Click logout button
     */
    async clickLogoutButton() {
        const element = await this.driver.wait(until.elementLocated(this.logoutButton), 10000);
        await this.driver.wait(until.elementIsEnabled(element), 10000);
        await element.click();
    }

    /**
     * Get flash message text
     */
    async getFlashMessage() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.flashMessage), 10000);
            return await element.getText();
        } catch (error) {
            return '';
        }
    }

    /**
     * Check if flash message is displayed
     */
    async isFlashMessageDisplayed() {
        try {
            const element = await this.driver.findElement(this.flashMessage);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Get current URL
     */
    async getCurrentUrl() {
        return await this.driver.getCurrentUrl();
    }

    /**
     * Check if on secure page
     */
    async isOnSecurePage() {
        const url = await this.getCurrentUrl();
        return url.includes('/secure');
    }

    /**
     * Check if on login page
     */
    async isOnLoginPage() {
        const url = await this.getCurrentUrl();
        return url.includes('/login');
    }
}

module.exports = HerokuLoginPage;
