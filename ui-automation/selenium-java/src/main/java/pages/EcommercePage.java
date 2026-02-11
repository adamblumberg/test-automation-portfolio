package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import utils.DriverFactory;

/**
 * Page Object Model for eCommerce Playground Homepage
 */
public class EcommercePage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Page elements
    @FindBy(name = "search")
    private WebElement searchInput;
    
    @FindBy(xpath = "//span[@class='title' and contains(text(), ' Home')]")
    private WebElement homeButton;
    
    @FindBy(xpath = "//li[contains(text(), ' Special')]")
    private WebElement specialButton;
    
    @FindBy(xpath = "//li[contains(text(), ' Blog')]")
    private WebElement blogButton;
    
    @FindBy(xpath = "//li[contains(text(), ' Mega Menu')]")
    private WebElement megaMenuButton;
    
    @FindBy(xpath = "//h1[@class='h3' and contains(text(), 'Special Offers')]")
    private WebElement specialOffersHeader;
    
    @FindBy(xpath = "//h3[contains(text(), 'Latest Articles')]")
    private WebElement latestArticlesHeader;
    
    @FindBy(xpath = "//img[@alt='Sony VAIO']")
    private WebElement sonyVaioImage;
    
    @FindBy(className = "product-thumb")
    private WebElement productThumb;
    
    @FindBy(className = "product-layout")
    private WebElement productLayout;
    
    @FindBy(xpath = "//div[contains(text(), 'There is no product that matches the search criteria.')]")
    private WebElement noResultsMessage;
    
    @FindBy(xpath = "//div[@class='text-right' and contains(text(), 'Showing')]")
    private WebElement showingResultsText;
    
    // Constructor
    public EcommercePage() {
        this.driver = DriverFactory.getDriver();
        this.wait = DriverFactory.getWait();
        PageFactory.initElements(driver, this);
    }
    
    // Navigation methods
    public void navigateToHomepage() {
        driver.get("https://ecommerce-playground.lambdatest.io/");
    }
    
    public void clickHomeButton() {
        wait.until(ExpectedConditions.elementToBeClickable(homeButton)).click();
    }
    
    public void clickSpecialButton() {
        WebElement specialElement = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@id='widget-navbar-217834']//li[contains(text(), ' Special')]")));
        specialElement.click();
    }
    
    public void clickBlogButton() {
        WebElement blogElement = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@id='widget-navbar-217834']//li[contains(text(), ' Blog')]")));
        blogElement.click();
    }
    
    public void clickMegaMenuButton() {
        WebElement megaMenuElement = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@id='widget-navbar-217834']//li[contains(text(), ' Mega Menu')]")));
        megaMenuElement.click();
    }
    
    // Search functionality
    public void performSearch(String searchTerm) {
        wait.until(ExpectedConditions.elementToBeClickable(searchInput)).click();
        searchInput.clear();
        searchInput.sendKeys(searchTerm);
        searchInput.submit();
    }
    
    // Verification methods
    public boolean isSearchInputVisible() {
        return wait.until(ExpectedConditions.visibilityOf(searchInput)).isDisplayed();
    }
    
    public boolean isHomeButtonVisible() {
        return homeButton.isDisplayed();
    }
    
    public boolean isSpecialOffersHeaderVisible() {
        return wait.until(ExpectedConditions.visibilityOf(specialOffersHeader)).isDisplayed();
    }
    
    public boolean isLatestArticlesHeaderVisible() {
        return wait.until(ExpectedConditions.visibilityOf(latestArticlesHeader)).isDisplayed();
    }
    
    public boolean isSonyVaioImageVisible() {
        return wait.until(ExpectedConditions.visibilityOf(sonyVaioImage)).isDisplayed();
    }
    
    public boolean areProductsVisible() {
        return wait.until(ExpectedConditions.visibilityOf(productLayout)).isDisplayed();
    }
    
    public boolean isNoResultsMessageVisible() {
        return wait.until(ExpectedConditions.visibilityOf(noResultsMessage)).isDisplayed();
    }
    
    public boolean areProductThumbsNotPresent() {
        try {
            return driver.findElements(By.className("product-thumb")).isEmpty();
        } catch (Exception e) {
            return true;
        }
    }
    
    public boolean isShowingResultsTextVisible() {
        return wait.until(ExpectedConditions.visibilityOf(showingResultsText)).isDisplayed();
    }
    
    public String getShowingResultsText() {
        return showingResultsText.getText();
    }
    
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
}
