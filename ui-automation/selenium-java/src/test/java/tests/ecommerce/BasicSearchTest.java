package tests.ecommerce;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.Assert;
import pages.EcommercePage;
import utils.BaseTest;

/**
 * Test class for Search Functionality
 * Mirrors the basicSearch.lambda.cy.js Cypress test
 */
public class BasicSearchTest extends BaseTest {
    private EcommercePage ecommercePage;
    
    @BeforeMethod
    public void setUpTest() {
        ecommercePage = new EcommercePage();
        ecommercePage.navigateToHomepage();
    }
    
    @Test(description = "Should display results when searching for existing product")
    public void shouldDisplayResultsWhenSearchingForExistingProduct() {
        // Perform search for sony
        ecommercePage.performSearch("sony");
        
        // Verify URL contains search parameter
        Assert.assertTrue(ecommercePage.getCurrentUrl().contains("search=sony"), 
            "URL should contain search parameter");
        
        // Verify search results
        Assert.assertTrue(ecommercePage.isSonyVaioImageVisible(), 
            "Sony VAIO image should be visible");
        Assert.assertTrue(ecommercePage.areProductsVisible(), 
            "Product layout should exist");
    }
    
    @Test(description = "Should display no results message for invalid search")
    public void shouldDisplayNoResultsMessageForInvalidSearch() {
        // Perform search for invalid term
        ecommercePage.performSearch("invalid");
        
        // Verify URL and no results message
        Assert.assertTrue(ecommercePage.getCurrentUrl().contains("search=invalid"), 
            "URL should contain invalid search parameter");
        Assert.assertTrue(ecommercePage.isNoResultsMessageVisible(), 
            "No results message should be visible");
        Assert.assertTrue(ecommercePage.areProductThumbsNotPresent(), 
            "Product thumbs should not exist");
    }
    
    @Test(description = "Should handle special characters in search query")
    public void shouldHandleSpecialCharactersInSearchQuery() {
        // Perform search with special character
        ecommercePage.performSearch("\"");
        
        // Verify search results with special character
        Assert.assertTrue(ecommercePage.getCurrentUrl().contains("search=%22"), 
            "URL should contain encoded special character");
        Assert.assertTrue(ecommercePage.areProductsVisible(), 
            "Product layout should exist");
        
        // Verify result count is shown
        Assert.assertTrue(ecommercePage.isShowingResultsTextVisible(), 
            "Showing results text should be visible");
        String resultText = ecommercePage.getShowingResultsText();
        Assert.assertTrue(resultText.matches(".*Showing \\d+.*"), 
            "Result text should match pattern 'Showing [number]'");
    }
}
