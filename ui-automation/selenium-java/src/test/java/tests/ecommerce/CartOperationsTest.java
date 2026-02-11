package tests.ecommerce;

import org.testng.annotations.Test;
import org.testng.Assert;
import pages.ShoppingCartPage;
import utils.BaseTest;

/**
 * Test class for Shopping Cart Operations
 * Mirrors the cartOperations.cy.js Cypress test
 */
public class CartOperationsTest extends BaseTest {
    
    @Test(description = "Should add two products, update quantity and remove one")
    public void shouldAddTwoProductsUpdateQuantityAndRemoveOne() {
        ShoppingCartPage cartPage = new ShoppingCartPage();
        
        // Add first product (MacBook Air - product_id 48)
        cartPage.navigateToProduct("48");
        cartPage.addToCart();
        
        // Add second product (iPhone - product_id 31)
        cartPage.navigateToProduct("31");
        cartPage.addToCart();
        
        // Navigate to the cart page
        cartPage.navigateToCart();
        
        // Ensure at least two items are present in the cart
        Assert.assertTrue(cartPage.hasAtLeastTwoItems(), 
            "Cart should have at least two items");
        
        // Update the quantity of the first item to 2
        cartPage.updateQuantityOfFirstItem("2");
        
        // Verify the quantity was updated
        Assert.assertEquals(cartPage.getFirstItemQuantity(), "2", 
            "First item quantity should be updated to 2");
        
        // Remove the second item from the cart
        cartPage.removeSecondItem();
        
        // Verify only one item remains
        // Note: Adding a small wait for the page to update after removal
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        Assert.assertEquals(cartPage.getCartItemCount(), 1, 
            "Cart should have only one item after removal");
    }
}
