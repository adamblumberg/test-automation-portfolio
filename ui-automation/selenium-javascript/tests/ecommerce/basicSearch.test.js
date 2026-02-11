const { expect } = require('chai');
const BaseTest = require('../../utils/BaseTest');
const EcommercePage = require('../../pages/EcommercePage');

describe('Search Functionality on eCommerce Playground', function() {
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

    it('should display results when searching for existing product', async function() {
        // Perform search for sony
        await ecommercePage.performSearch('sony');

        // Wait for search results to load
        await driver.sleep(2000);

        // Verify URL contains search parameter
        const currentUrl = await ecommercePage.getCurrentUrl();
        expect(currentUrl).to.include('search=sony');

        // Verify search results
        const isSonyVaioVisible = await ecommercePage.isSonyVaioImageVisible();
        expect(isSonyVaioVisible).to.be.true;

        const areProductsVisible = await ecommercePage.areProductsVisible();
        expect(areProductsVisible).to.be.true;
    });

    it('should display no results message for invalid search', async function() {
        // Perform search for invalid term
        await ecommercePage.performSearch('invalid');

        // Wait for search results to load
        await driver.sleep(2000);

        // Verify URL and no results message
        const currentUrl = await ecommercePage.getCurrentUrl();
        expect(currentUrl).to.include('search=invalid');

        const isNoResultsVisible = await ecommercePage.isNoResultsMessageVisible();
        expect(isNoResultsVisible).to.be.true;

        const areProductThumbsNotPresent = await ecommercePage.areProductThumbsNotPresent();
        expect(areProductThumbsNotPresent).to.be.true;
    });

    it('should handle special characters in search query', async function() {
        // Perform search with special character
        await ecommercePage.performSearch('"');

        // Wait for search results to load
        await driver.sleep(2000);

        // Verify search results with special character
        const currentUrl = await ecommercePage.getCurrentUrl();
        expect(currentUrl).to.include('search=%22');

        const areProductsVisible = await ecommercePage.areProductsVisible();
        expect(areProductsVisible).to.be.true;

        // Verify result count is shown
        const isShowingResultsVisible = await ecommercePage.isShowingResultsTextVisible();
        expect(isShowingResultsVisible).to.be.true;

        const resultText = await ecommercePage.getShowingResultsText();
        expect(resultText).to.match(/Showing \d+/);
    });
});
