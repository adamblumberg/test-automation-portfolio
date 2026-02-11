const { By, until } = require('selenium-webdriver');

class ShoppingCartPage {
    constructor(driver) {
        this.driver = driver;
        
        // Page element locators
        this.addToCartButton = By.xpath("//button[@title='Add to Cart']");
        this.cartItems = By.xpath("//table[@class='table']//tbody//tr");
        this.quantityInputs = By.xpath("//input[@type='number'] | //input[starts-with(@name, 'quantity')]");
        this.updateButtons = By.xpath("//button[@title='Update']");
        this.removeButtons = By.xpath("//button[@title='Remove']");
    }

    /**
     * Navigate to product page
     */
    async navigateToProduct(productId) {
        const url = `https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=${productId}`;
        await this.driver.get(url);
    }

    /**
     * Navigate to cart page
     */
    async navigateToCart() {
        await this.driver.get('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');
    }

    /**
     * Add product to cart
     */
    async addToCart() {
        const element = await this.driver.wait(until.elementLocated(this.addToCartButton), 10000);
        await this.driver.wait(until.elementIsEnabled(element), 10000);
        await element.click();
    }

    /**
     * Update quantity of first item
     */
    async updateQuantityOfFirstItem(quantity) {
        const cartItemElements = await this.driver.findElements(this.cartItems);
        if (cartItemElements.length > 0) {
            const firstRow = cartItemElements[0];
            
            // Find quantity input in first row
            const quantityInput = await firstRow.findElement(
                By.xpath(".//input[@type='number'] | .//input[starts-with(@name, 'quantity')]")
            );
            
            // Find update button in first row
            const updateButton = await firstRow.findElement(By.xpath(".//button[@title='Update']"));
            
            await quantityInput.clear();
            await quantityInput.sendKeys(quantity);
            await updateButton.click();
        }
    }

    /**
     * Remove second item from cart
     */
    async removeSecondItem() {
        const cartItemElements = await this.driver.findElements(this.cartItems);
        if (cartItemElements.length >= 2) {
            const secondRow = cartItemElements[1];
            const removeButton = await secondRow.findElement(By.xpath(".//button[@title='Remove']"));
            await removeButton.click();
        }
    }

    /**
     * Get cart item count
     */
    async getCartItemCount() {
        try {
            const elements = await this.driver.wait(until.elementsLocated(this.cartItems), 10000);
            return elements.length;
        } catch (error) {
            return 0;
        }
    }

    /**
     * Get first item quantity
     */
    async getFirstItemQuantity() {
        const cartItemElements = await this.driver.findElements(this.cartItems);
        if (cartItemElements.length > 0) {
            const firstRow = cartItemElements[0];
            const quantityInput = await firstRow.findElement(
                By.xpath(".//input[@type='number'] | .//input[starts-with(@name, 'quantity')]")
            );
            return await quantityInput.getAttribute('value');
        }
        return '';
    }

    /**
     * Check if cart has at least two items
     */
    async hasAtLeastTwoItems() {
        return (await this.getCartItemCount()) >= 2;
    }
}

module.exports = ShoppingCartPage;
