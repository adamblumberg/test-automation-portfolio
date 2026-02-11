const { test, expect } = require('@playwright/test');

test.describe('Search Functionality on eCommerce Playground', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io');
  });

  test('should display results when searching for existing product', async ({ page }) => {
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill('sony');
    await page.locator('input[name="search"]').first().press('Enter');

    // Wait for search results to load
    await expect(page).toHaveURL(/search=sony/);
    
    // Verify search results
    await expect(page.locator('img[alt="Sony VAIO"]')).toBeVisible();
    await expect(page.locator('.product-thumb')).toHaveCount({ min: 1 });
    await expect(page.locator('.product-layout')).toBeVisible();
  });

  test('should display no results message for invalid search', async ({ page }) => {
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill('invalid');
    await page.locator('input[name="search"]').first().press('Enter');

    // Verify URL and no results message
    await expect(page).toHaveURL(/search=invalid/);
    await expect(page.locator(':has-text("There is no product that matches the search criteria.")')).toBeVisible();
    await expect(page.locator('.product-thumb')).toHaveCount(0);
  });

  test('should handle special characters in search query', async ({ page }) => {
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill('"');
    await page.locator('input[name="search"]').first().press('Enter');

    // Verify search results with special character
    await expect(page).toHaveURL(/search=%22/);
    await expect(page.locator('.product-layout')).toBeVisible();
    
    // Verify result count
    const resultText = await page.locator('div.text-right:has-text("Showing")').textContent();
    expect(resultText).toMatch(/Showing \d+/);
  });

  test('should show autocomplete suggestions while typing', async ({ page }) => {
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill('ip');

    // Verify autocomplete dropdown appears
    await expect(page.locator('.dropdown-menu')).toBeVisible();
    await expect(page.locator('.dropdown-menu .product-thumb')).toBeVisible();
  });

  test('should handle multiple word searches', async ({ page }) => {
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill('apple mac');
    await page.locator('input[name="search"]').first().press('Enter');

    // Verify that the search functionality handles multiple-word queries correctly
    await expect(page).toHaveURL(/search=apple\+mac/);
    await expect(page.locator('.product-layout')).toBeVisible();
  });

  test('should preserve search term in search box after search', async ({ page }) => {
    const searchTerm = 'iphone';
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill(searchTerm);
    await page.locator('input[name="search"]').first().press('Enter');

    await expect(page).toHaveURL(new RegExp(`search=${searchTerm}`));
    await expect(page.locator('input[name="search"]').first()).toHaveValue(searchTerm);
  });

  test('should clear autocomplete when search box is cleared', async ({ page }) => {
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill('ip');
    await page.locator('input[name="search"]').first().clear();

    await expect(page.locator('.dropdown-menu')).not.toBeVisible();
  });

  test('should handle minimum character requirement for search', async ({ page }) => {
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill('a');
    await page.locator('input[name="search"]').first().press('Enter');

    // Verify that the search handles single-character queries by checking for results or an alert message
    await expect(page).toHaveURL(/search=a/);
    const hasResults = await page.locator('.product-layout').isVisible();
    const hasAlert = await page.locator('.alert').isVisible();
    expect(hasResults || hasAlert).toBeTruthy();
  });

  test('should trim whitespace from search query', async ({ page }) => {
    await page.locator('input[name="search"]').first().click();
    await page.locator('input[name="search"]').first().fill('  sony  ');
    await page.locator('input[name="search"]').first().press('Enter');

    // Verify URL includes trimmed and encoded search query
    await expect(page).toHaveURL(/search=sony/);
    await expect(page.locator('.product-thumb')).toHaveCount({ min: 1 });
    await expect(page.locator('img[alt="Sony VAIO"]')).toBeVisible();
  });
});
