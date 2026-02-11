const { test, expect } = require('@playwright/test');

test.describe('Homepage Load test', () => {
  test('should navigate to ecommerce-playground', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    // visit the above URL
    await expect(page.locator('input[name="search"]')).toBeVisible();
    // the search field should be visible
  });
});
