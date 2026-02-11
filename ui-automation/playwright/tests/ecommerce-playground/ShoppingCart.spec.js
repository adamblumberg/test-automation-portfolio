const { test, expect } = require('@playwright/test');

test.describe("Guest Checkout: Shopping Cart Functionality", () => {
  test("Test 1: As a Guest, I can search for and add items to the cart", async ({ page }) => {
    // Set the screen size
    await page.setViewportSize({ width: 2544, height: 1000 });
    
    // Visit the homepage
    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
    
    // Click on the search field
    await page.locator('input[name="search"]').nth(0).click();
    
    // Type 'macbook pro' in the search field and press enter
    await page.locator('input[name="search"]').nth(0).fill('macbook pro');
    await page.locator('input[name="search"]').nth(0).press('Enter');
    await page.waitForTimeout(500);
    
    // Assert the search worked by checking URL and image availability
    await expect(page).toHaveURL(/search=macbook\+pro/);
    await expect(page.locator('img[alt="MacBook Pro"]')).toBeVisible();
    
    // Click the item (macbook pro)
    await page.locator('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=62&search=macbook+pro"]').first().click();
    
    // Click the Add to Cart button
    await page.locator('button[title="Add to Cart"]').nth(1).click();
    
    // Click on the 'View Cart' button
    await page.locator('div.col a').nth(0).click();
    
    // Click on Checkout button
    await page.locator('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout"]').nth(1).click();
    
    // Select 'Guest Checkout' radio button
    await page.locator('label:has-text("Guest Checkout")').click();
    
    // Enter Personal Details
    await page.locator('input[name="firstname"]').click();
    await page.locator('input[name="firstname"]').fill('First');
    
    await page.locator('input[name="lastname"]').click();
    await page.locator('input[name="lastname"]').fill('Last');
    
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('firstlast@fake.com');
    
    await page.locator('input[name="telephone"]').click();
    await page.locator('input[name="telephone"]').fill('5555555555');
    
    await page.locator('input[name="address_1"]').click();
    await page.locator('input[name="address_1"]').fill('123 Fake Street');
    
    await page.locator('input[name="city"]').scrollIntoViewIfNeeded();
    await expect(page.locator('input[name="city"]')).toBeVisible();
    await page.locator('input[name="city"]').click();
    await page.locator('input[name="city"]').fill('San Francisco');
    
    await page.locator('input[name="postcode"]').click();
    await page.locator('input[name="postcode"]').fill('12345');
    
    await page.locator('select[name="country_id"]').selectOption('223');
    await page.locator('select[name="zone_id"]').selectOption('3624');
    await page.waitForTimeout(500);
    
    // TOS agreement checkbox
    await page.locator('label[for="input-agree"]').click();
    
    // Click Continue Button
    await page.locator('button#button-save').click();
    await page.locator('button#button-confirm').click();
    await page.waitForTimeout(500);
  });
});
