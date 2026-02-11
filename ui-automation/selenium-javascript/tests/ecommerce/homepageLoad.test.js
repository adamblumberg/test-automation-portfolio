const { expect } = require('chai');
const BaseTest = require('../../utils/BaseTest');
const EcommercePage = require('../../pages/EcommercePage');

describe('Homepage Load Test', function() {
    let baseTest;
    let driver;
    let ecommercePage;

    beforeEach(async function() {
        baseTest = new BaseTest();
        driver = await baseTest.setUp();
        ecommercePage = new EcommercePage(driver);
    });

    afterEach(async function() {
        await baseTest.tearDown();
    });

    it('should navigate to ecommerce-playground and verify search field is visible', async function() {
        // Navigate to the ecommerce playground
        await ecommercePage.navigateToHomepage();
        
        // Verify the search field is visible
        const isSearchVisible = await ecommercePage.isSearchInputVisible();
        expect(isSearchVisible).to.be.true;
    });
});
