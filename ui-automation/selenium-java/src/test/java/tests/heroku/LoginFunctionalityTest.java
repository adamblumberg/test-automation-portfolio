package tests.heroku;

import org.testng.annotations.Test;
import org.testng.Assert;
import pages.HerokuLoginPage;
import utils.BaseTest;

/**
 * Test class for Login Functionality
 * Mirrors the loginFunctionality.cy.js Cypress test
 */
public class LoginFunctionalityTest extends BaseTest {
    
    @Test(description = "Should display an error for invalid credentials")
    public void shouldDisplayErrorForInvalidCredentials() {
        HerokuLoginPage loginPage = new HerokuLoginPage();
        
        // Navigate to login page
        loginPage.navigateToLoginPage();
        
        // Enter invalid credentials
        loginPage.login("invalidUser", "invalidPass");
        
        // Verify error message
        Assert.assertTrue(loginPage.getFlashMessage().contains("Your username is invalid!"), 
            "Flash message should contain 'Your username is invalid!'");
    }
    
    @Test(description = "Should successfully log in with valid credentials")
    public void shouldSuccessfullyLogInWithValidCredentials() {
        HerokuLoginPage loginPage = new HerokuLoginPage();
        
        // Navigate to login page
        loginPage.navigateToLoginPage();
        
        // Enter valid credentials
        loginPage.login("tomsmith", "SuperSecretPassword!");
        
        // Verify successful login
        Assert.assertTrue(loginPage.isOnSecurePage(), 
            "Should be on secure page after successful login");
        Assert.assertTrue(loginPage.getFlashMessage().contains("You logged into a secure area!"), 
            "Flash message should contain 'You logged into a secure area!'");
    }
    
    @Test(description = "Should successfully log out")
    public void shouldSuccessfullyLogOut() {
        HerokuLoginPage loginPage = new HerokuLoginPage();
        
        // Navigate to login page and log in first
        loginPage.navigateToLoginPage();
        loginPage.login("tomsmith", "SuperSecretPassword!");
        
        // Log out
        loginPage.clickLogoutButton();
        
        // Verify successful logout
        Assert.assertTrue(loginPage.isOnLoginPage(), 
            "Should be back on login page after logout");
        Assert.assertTrue(loginPage.getFlashMessage().contains("You logged out of the secure area!"), 
            "Flash message should contain 'You logged out of the secure area!'");
    }
}
