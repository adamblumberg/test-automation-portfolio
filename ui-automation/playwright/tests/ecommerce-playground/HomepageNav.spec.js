const { test, expect } = require('@playwright/test');

test.describe('Homepage Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io');
  });
  // navigate to the homepage before each navigation test

  test('Test 1: Home button should navigate to Home page and load', async ({ page }) => {
    await page.locator("span.title:has-text(' Home')").click();
    // find the home button and click it
    await expect(page).toHaveURL(/route=common\/home/);
    // validate the URL is correct
    await expect(page.locator("span.title:has-text(' Home')")).toBeVisible();
    // validate the home button loads in
  });

  test('Test 2: Special button functions and page loads', async ({ page }) => {
    await page.locator("#widget-navbar-217834 ul.horizontal li:has-text(' Special')").click();
    // find special button and click it

    await expect(page).toHaveURL(/route=product\/special/);
    // validate the URL is correct

    await expect(page.locator("h1.h3:has-text('Special Offers')")).toBeVisible();
    // validate that special offers header loads in
  });

  test('Test 3: Blog button loads the blog', async ({ page }) => {
    await page.locator("#widget-navbar-217834 ul.horizontal li:has-text(' Blog')").click();
    // find Blog button and click it

    await expect(page).toHaveURL(/blog\/home/);
    // validate the URL is correct

    await expect(page.locator('h3:has-text("Latest Articles")')).toBeVisible();
    // validate that latest articles header loads in
  });

  test('Test 4: Mega Menu button loads the About us page', async ({ page }) => {
    await page.locator("#widget-navbar-217834 ul.horizontal li:has-text(' Mega Menu')").click();
    // find Mega Menu or About Us button

    await expect(page).toHaveURL(/route=information\/information&information_id=4/);
    // validate the URL is correct

    await expect(page.locator('h1:has-text("About Us")')).toBeVisible();
    // validate that about us header loads in
  });

  test('Test 5: My account button loads account page', async ({ page }) => {
    await page.locator("#widget-navbar-217834 ul.horizontal li:has-text(' My account')").click();
    // Find My Account button and click it

    await expect(page).toHaveURL(/route=account\/login/);
    // validate the URL is correct

    await expect(page.locator('h2:has-text("New Customer")')).toBeVisible();
    // validate that new customer header loads in
  });
});
