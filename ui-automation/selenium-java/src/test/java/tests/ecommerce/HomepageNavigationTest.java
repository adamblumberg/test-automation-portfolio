package tests.ecommerce;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.Assert;
import pages.EcommercePage;
import utils.BaseTest;

/**
 * Test class for Homepage Navigation
 * Mirrors the homepageNav.lambda.cy.js Cypress test
 */
public class HomepageNavigationTest extends BaseTest {
    private EcommercePage ecommercePage;
    
    @BeforeMethod
    public void setUpTest() {
        ecommercePage = new EcommercePage();
        ecommercePage.navigateToHomepage();
    }
    
    @Test(description = "Test 1: Home button should navigate to Home page and load")
    public void homeButtonShouldNavigateToHomePageAndLoad() {
        // Click the home button
        ecommercePage.clickHomeButton();
        
        // Validate the URL is correct
        Assert.assertTrue(ecommercePage.getCurrentUrl().contains("route=common/home"), 
            "URL should contain route=common/home");
        
        // Validate the home button loads in
        Assert.assertTrue(ecommercePage.isHomeButtonVisible(), 
            "Home button should be visible");
    }
    
    @Test(description = "Test 2: Special button functions and page loads")
    public void specialButtonFunctionsAndPageLoads() {
        // Click the special button
        ecommercePage.clickSpecialButton();
        
        // Validate the URL is correct
        Assert.assertTrue(ecommercePage.getCurrentUrl().contains("route=product/special"), 
            "URL should contain route=product/special");
        
        // Validate that special offers header loads in
        Assert.assertTrue(ecommercePage.isSpecialOffersHeaderVisible(), 
            "Special Offers header should be visible");
    }
    
    @Test(description = "Test 3: Blog button loads the blog")
    public void blogButtonLoadsTheBlog() {
        // Click the blog button
        ecommercePage.clickBlogButton();
        
        // Validate the URL is correct
        Assert.assertTrue(ecommercePage.getCurrentUrl().contains("blog/home"), 
            "URL should contain blog/home");
        
        // Validate that latest articles header loads in
        Assert.assertTrue(ecommercePage.isLatestArticlesHeaderVisible(), 
            "Latest Articles header should be visible");
    }
    
    @Test(description = "Test 4: Mega Menu button loads the About us page")
    public void megaMenuButtonLoadsTheAboutUsPage() {
        // Click the mega menu button
        ecommercePage.clickMegaMenuButton();
        
        // Validate the URL is correct
        Assert.assertTrue(ecommercePage.getCurrentUrl().contains("route=information/information&information_id=4"), 
            "URL should contain route=information/information&information_id=4");
    }
}
