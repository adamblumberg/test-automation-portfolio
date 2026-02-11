package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import utils.DriverFactory;
import java.util.List;

/**
 * Page Object Model for eCommerce Shopping Cart
 */
public class ShoppingCartPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Page elements
    @FindBy(xpath = "//button[@title='Add to Cart']")
    private WebElement addToCartButton;
    
    @FindBy(xpath = "//table[@class='table']//tbody//tr")
    private List<WebElement> cartItems;
    
    @FindBy(xpath = "//input[@type='number'] | //input[starts-with(@name, 'quantity')]")
    private List<WebElement> quantityInputs;
    
    @FindBy(xpath = "//button[@title='Update']")
    private List<WebElement> updateButtons;
    
    @FindBy(xpath = "//button[@title='Remove']")
    private List<WebElement> removeButtons;
    
    // Constructor
    public ShoppingCartPage() {
        this.driver = DriverFactory.getDriver();
        this.wait = DriverFactory.getWait();
        PageFactory.initElements(driver, this);
    }
    
    // Navigation methods
    public void navigateToProduct(String productId) {
        String url = "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=" + productId;
        driver.get(url);
    }
    
    public void navigateToCart() {
        driver.get("https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart");
    }
    
    // Cart operations
    public void addToCart() {
        wait.until(ExpectedConditions.elementToBeClickable(addToCartButton)).click();
    }
    
    public void updateQuantityOfFirstItem(String quantity) {
        WebElement firstRow = cartItems.get(0);
        WebElement quantityInput = firstRow.findElement(
            By.xpath(".//input[@type='number'] | .//input[starts-with(@name, 'quantity')]"));
        WebElement updateButton = firstRow.findElement(By.xpath(".//button[@title='Update']"));
        
        quantityInput.clear();
        quantityInput.sendKeys(quantity);
        updateButton.click();
    }
    
    public void removeSecondItem() {
        if (cartItems.size() >= 2) {
            WebElement secondRow = cartItems.get(1);
            WebElement removeButton = secondRow.findElement(By.xpath(".//button[@title='Remove']"));
            removeButton.click();
        }
    }
    
    // Verification methods
    public int getCartItemCount() {
        return wait.until(ExpectedConditions.visibilityOfAllElements(cartItems)).size();
    }
    
    public String getFirstItemQuantity() {
        WebElement firstRow = cartItems.get(0);
        WebElement quantityInput = firstRow.findElement(
            By.xpath(".//input[@type='number'] | .//input[starts-with(@name, 'quantity')]"));
        return quantityInput.getAttribute("value");
    }
    
    public boolean hasAtLeastTwoItems() {
        return getCartItemCount() >= 2;
    }
}
