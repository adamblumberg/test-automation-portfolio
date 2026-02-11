const { expect } = require('chai');
const BaseTest = require('../../utils/BaseTest');
const EcommercePage = require('../../pages/EcommercePage');

describe('Homepage Navigation Tests', function() {
    let baseTest;
    let driver;
    let ecommercePage;

    beforeEach(async function() {
        baseTest = new BaseTest();
        driver = await baseTest.setUp();
        ecommercePage = new EcommercePage(driver);
        await ecommercePage.navigateToHomepage();
    });

    afterEach(async function() {
        await baseTest.tearDown();
    });

    it('Test 1: Home button should navigate to Home page and load', async function() {
        // Click the home button
        await ecommercePage.clickHomeButton();

        // Wait for navigation
        await driver.sleep(2000);

        // Validate the URL is correct
        const currentUrl = await ecommercePage.getCurrentUrl();
        expect(currentUrl).to.include('route=common/home');

        // Validate the home button loads in
        const isHomeButtonVisible = await ecommercePage.isHomeButtonVisible();
        expect(isHomeButtonVisible).to.be.true;
    });

    it('Test 2: Special button functions and page loads', async function() {
        // Click the special button
        await ecommercePage.clickSpecialButton();

        // Wait for navigation
        await driver.sleep(2000);

        // Validate the URL is correct
        const currentUrl = await ecommercePage.getCurrentUrl();
        expect(currentUrl).to.include('route=product/special');

        // Validate that special offers header loads in
        const isSpecialOffersVisible = await ecommercePage.isSpecialOffersHeaderVisible();
        expect(isSpecialOffersVisible).to.be.true;
    });

    it('Test 3: Blog button loads the blog', async function() {
        // Click the blog button
        await ecommercePage.clickBlogButton();

        // Wait for navigation
        await driver.sleep(2000);

        // Validate the URL is correct
        const currentUrl = await ecommercePage.getCurrentUrl();
        expect(currentUrl).to.include('blog/home');

        // Validate that latest articles header loads in
        const isLatestArticlesVisible = await ecommercePage.isLatestArticlesHeaderVisible();
        expect(isLatestArticlesVisible).to.be.true;
    });

    it('Test 4: Mega Menu button loads the About us page', async function() {
        // Click the mega menu button
        await ecommercePage.clickMegaMenuButton();

        // Wait for navigation
        await driver.sleep(2000);

        // Validate the URL is correct
        const currentUrl = await ecommercePage.getCurrentUrl();
        expect(currentUrl).to.include('route=information/information&information_id=4');
    });
});
