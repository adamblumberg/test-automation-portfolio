package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import utils.DriverFactory;

/**
 * Page Object Model for Heroku Login Page
 */
public class HerokuLoginPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Page elements
    @FindBy(id = "username")
    private WebElement usernameField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(className = "radius")
    private WebElement loginButton;
    
    @FindBy(id = "flash")
    private WebElement flashMessage;
    
    @FindBy(xpath = "//a[@class='button secondary radius']")
    private WebElement logoutButton;
    
    // Constructor
    public HerokuLoginPage() {
        this.driver = DriverFactory.getDriver();
        this.wait = DriverFactory.getWait();
        PageFactory.initElements(driver, this);
    }
    
    // Navigation methods
    public void navigateToLoginPage() {
        driver.get("http://the-internet.herokuapp.com/login");
    }
    
    // Login functionality
    public void enterUsername(String username) {
        wait.until(ExpectedConditions.visibilityOf(usernameField)).clear();
        usernameField.sendKeys(username);
    }
    
    public void enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
    }
    
    public void clickLoginButton() {
        loginButton.click();
    }
    
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }
    
    public void clickLogoutButton() {
        wait.until(ExpectedConditions.elementToBeClickable(logoutButton)).click();
    }
    
    // Verification methods
    public String getFlashMessage() {
        return wait.until(ExpectedConditions.visibilityOf(flashMessage)).getText();
    }
    
    public boolean isFlashMessageDisplayed() {
        return flashMessage.isDisplayed();
    }
    
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
    
    public boolean isOnSecurePage() {
        return getCurrentUrl().contains("/secure");
    }
    
    public boolean isOnLoginPage() {
        return getCurrentUrl().contains("/login");
    }
}
