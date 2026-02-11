package utils;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.openqa.selenium.WebDriver;

/**
 * Base test class that all test classes should extend
 */
public class BaseTest {
    protected WebDriver driver;
    
    @BeforeMethod
    @Parameters("browser")
    public void setUp(String browser) {
        DriverFactory.initializeDriver(browser != null ? browser : "chrome");
        driver = DriverFactory.getDriver();
    }
    
    @AfterMethod
    public void tearDown() {
        DriverFactory.quitDriver();
    }
    
    /**
     * Navigate to URL
     */
    protected void navigateTo(String url) {
        driver.get(url);
    }
    
    /**
     * Get current URL
     */
    protected String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
    
    /**
     * Get page title
     */
    protected String getPageTitle() {
        return driver.getTitle();
    }
}
