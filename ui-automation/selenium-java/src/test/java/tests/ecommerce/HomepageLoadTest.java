package tests.ecommerce;

import org.testng.annotations.Test;
import org.testng.Assert;
import pages.EcommercePage;
import utils.BaseTest;

/**
 * Test class for Homepage Load functionality
 * Mirrors the homepageLoad.lambda.cy.js Cypress test
 */
public class HomepageLoadTest extends BaseTest {
    
    @Test(description = "Should navigate to ecommerce-playground and verify search field is visible")
    public void shouldNavigateToEcommercePlayground() {
        EcommercePage ecommercePage = new EcommercePage();
        
        // Navigate to the ecommerce playground
        ecommercePage.navigateToHomepage();
        
        // Verify the search field is visible
        Assert.assertTrue(ecommercePage.isSearchInputVisible(), 
            "Search field should be visible on the homepage");
    }
}
