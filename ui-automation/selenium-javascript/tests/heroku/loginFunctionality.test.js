const { expect } = require('chai');
const BaseTest = require('../../utils/BaseTest');
const HerokuLoginPage = require('../../pages/HerokuLoginPage');

describe('Login Functionality', function() {
    let baseTest;
    let driver;
    let loginPage;

    beforeEach(async function() {
        baseTest = new BaseTest();
        driver = await baseTest.setUp();
        loginPage = new HerokuLoginPage(driver);
    });

    afterEach(async function() {
        await baseTest.tearDown();
    });

    it('should display an error for invalid credentials', async function() {
        // Navigate to login page
        await loginPage.navigateToLoginPage();

        // Enter invalid credentials and login
        await loginPage.login('invalidUser', 'invalidPass');

        // Wait for response
        await driver.sleep(2000);

        // Verify error message
        const flashMessage = await loginPage.getFlashMessage();
        expect(flashMessage).to.include('Your username is invalid!');
    });

    it('should successfully log in with valid credentials', async function() {
        // Navigate to login page
        await loginPage.navigateToLoginPage();

        // Enter valid credentials and login
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        // Wait for response
        await driver.sleep(2000);

        // Verify successful login
        const isOnSecurePage = await loginPage.isOnSecurePage();
        expect(isOnSecurePage).to.be.true;

        const flashMessage = await loginPage.getFlashMessage();
        expect(flashMessage).to.include('You logged into a secure area!');
    });

    it('should successfully log out', async function() {
        // Navigate to login page and log in first
        await loginPage.navigateToLoginPage();
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        // Wait for login to complete
        await driver.sleep(2000);

        // Log out
        await loginPage.clickLogoutButton();

        // Wait for logout to complete
        await driver.sleep(2000);

        // Verify successful logout
        const isOnLoginPage = await loginPage.isOnLoginPage();
        expect(isOnLoginPage).to.be.true;

        const flashMessage = await loginPage.getFlashMessage();
        expect(flashMessage).to.include('You logged out of the secure area!');
    });
});
