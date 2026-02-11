const { By, until } = require('selenium-webdriver');

class EcommercePage {
    constructor(driver) {
        this.driver = driver;
        
        // Page element locators
        this.searchInput = By.name('search');
        this.homeButton = By.xpath("//span[@class='title' and contains(text(), ' Home')]");
        this.specialButton = By.xpath("//div[@id='widget-navbar-217834']//li[contains(text(), ' Special')]");
        this.blogButton = By.xpath("//div[@id='widget-navbar-217834']//li[contains(text(), ' Blog')]");
        this.megaMenuButton = By.xpath("//div[@id='widget-navbar-217834']//li[contains(text(), ' Mega Menu')]");
        this.specialOffersHeader = By.xpath("//h1[@class='h3' and contains(text(), 'Special Offers')]");
        this.latestArticlesHeader = By.xpath("//h3[contains(text(), 'Latest Articles')]");
        this.sonyVaioImage = By.xpath("//img[@alt='Sony VAIO']");
        this.productThumb = By.className('product-thumb');
        this.productLayout = By.className('product-layout');
        this.noResultsMessage = By.xpath("//div[contains(text(), 'There is no product that matches the search criteria.')]");
        this.showingResultsText = By.xpath("//div[@class='text-right' and contains(text(), 'Showing')]");
    }

    /**
     * Navigate to homepage
     */
    async navigateToHomepage() {
        await this.driver.get('https://ecommerce-playground.lambdatest.io/');
    }

    /**
     * Click home button
     */
    async clickHomeButton() {
        const element = await this.driver.wait(until.elementLocated(this.homeButton), 10000);
        await this.driver.wait(until.elementIsEnabled(element), 10000);
        await element.click();
    }

    /**
     * Click special button
     */
    async clickSpecialButton() {
        const element = await this.driver.wait(until.elementLocated(this.specialButton), 10000);
        await this.driver.wait(until.elementIsEnabled(element), 10000);
        await element.click();
    }

    /**
     * Click blog button
     */
    async clickBlogButton() {
        const element = await this.driver.wait(until.elementLocated(this.blogButton), 10000);
        await this.driver.wait(until.elementIsEnabled(element), 10000);
        await element.click();
    }

    /**
     * Click mega menu button
     */
    async clickMegaMenuButton() {
        const element = await this.driver.wait(until.elementLocated(this.megaMenuButton), 10000);
        await this.driver.wait(until.elementIsEnabled(element), 10000);
        await element.click();
    }

    /**
     * Perform search
     */
    async performSearch(searchTerm) {
        const searchElement = await this.driver.wait(until.elementLocated(this.searchInput), 10000);
        await searchElement.click();
        await searchElement.clear();
        await searchElement.sendKeys(searchTerm);
        await searchElement.submit();
    }

    /**
     * Check if search input is visible
     */
    async isSearchInputVisible() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.searchInput), 10000);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if home button is visible
     */
    async isHomeButtonVisible() {
        try {
            const element = await this.driver.findElement(this.homeButton);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if special offers header is visible
     */
    async isSpecialOffersHeaderVisible() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.specialOffersHeader), 10000);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if latest articles header is visible
     */
    async isLatestArticlesHeaderVisible() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.latestArticlesHeader), 10000);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if Sony VAIO image is visible
     */
    async isSonyVaioImageVisible() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.sonyVaioImage), 10000);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if products are visible
     */
    async areProductsVisible() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.productLayout), 10000);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if no results message is visible
     */
    async isNoResultsMessageVisible() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.noResultsMessage), 10000);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if product thumbs are not present
     */
    async areProductThumbsNotPresent() {
        try {
            const elements = await this.driver.findElements(this.productThumb);
            return elements.length === 0;
        } catch (error) {
            return true;
        }
    }

    /**
     * Check if showing results text is visible
     */
    async isShowingResultsTextVisible() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.showingResultsText), 10000);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Get showing results text
     */
    async getShowingResultsText() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.showingResultsText), 10000);
            return await element.getText();
        } catch (error) {
            return '';
        }
    }

    /**
     * Get current URL
     */
    async getCurrentUrl() {
        return await this.driver.getCurrentUrl();
    }
}

module.exports = EcommercePage;
