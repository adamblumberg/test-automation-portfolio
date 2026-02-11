const { expect } = require('chai');
const BaseTest = require('../../utils/BaseTest');
const ShoppingCartPage = require('../../pages/ShoppingCartPage');

describe('Shopping cart operations', function() {
    let baseTest;
    let driver;
    let cartPage;

    beforeEach(async function() {
        baseTest = new BaseTest();
        driver = await baseTest.setUp();
        cartPage = new ShoppingCartPage(driver);
    });

    afterEach(async function() {
        await baseTest.tearDown();
    });

    it('should add two products, update quantity and remove one', async function() {
        // Add first product (MacBook Air - product_id 48)
        await cartPage.navigateToProduct('48');
        await cartPage.addToCart();

        // Add second product (iPhone - product_id 31)
        await cartPage.navigateToProduct('31');
        await cartPage.addToCart();

        // Navigate to the cart page
        await cartPage.navigateToCart();

        // Wait for cart to load
        await driver.sleep(2000);

        // Ensure at least two items are present in the cart
        const hasAtLeastTwoItems = await cartPage.hasAtLeastTwoItems();
        expect(hasAtLeastTwoItems).to.be.true;

        // Update the quantity of the first item to 2
        await cartPage.updateQuantityOfFirstItem('2');

        // Wait for update to process
        await driver.sleep(2000);

        // Verify the quantity was updated
        const firstItemQuantity = await cartPage.getFirstItemQuantity();
        expect(firstItemQuantity).to.equal('2');

        // Remove the second item from the cart
        await cartPage.removeSecondItem();

        // Wait for removal to process
        await driver.sleep(3000);

        // Verify only one item remains
        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).to.equal(1);
    });
});
