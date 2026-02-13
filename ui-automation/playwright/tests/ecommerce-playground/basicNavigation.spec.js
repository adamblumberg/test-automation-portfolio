const { test, expect } = require('@playwright/test');

test.describe('Basic Site Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Start each test from the homepage
    await page.goto('https://ecommerce-playground.lambdatest.io/');
  });

  // Homepage Tests
  test('should open the homepage', async ({ page }) => {
    await expect(page).toHaveURL(/ecommerce/);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('input[name="search"]').first()).toBeVisible();
  });

  // Navigation Tests
  test('should click the special button and navigate to specials', async ({ page }) => {
    await page.locator('span.badge:has-text("Hot")').locator('..').click({ force: true });
    await expect(page).toHaveURL(/\/index\.php\?route=product\/special/);
  });

  test('should click the logo to return to the homepage', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/special');
    await page.locator('header a[title="Poco Electro"]').click({ force: true });
    await expect(page).toHaveURL(/route=common\/home/);
  });

  // Category Navigation
  test('should navigate to items in Shop by Category menu', async ({ page }) => {
    const categories = [
      { label: 'Desktops and Monitors', urlPart: 'path=28' },
      { label: 'Laptops & Notebooks', urlPart: 'path=18' },
      { label: 'Components', urlPart: 'path=25' },
      { label: 'Software', urlPart: 'path=17' },
      { label: 'Phone, Tablets & Ipod', urlPart: 'path=57' },
      { label: 'Cameras', urlPart: 'path=33' },
      { label: 'MP3 Players', urlPart: 'path=34' }
    ];

    for (const cat of categories) {
      // Open the category drawer
      await page.locator('a[aria-label="Shop by Category"][data-toggle="mz-pure-drawer"][href="#mz-component-1626147655"]')
        .first()
        .click({ force: true });
      
      // Click the category and verify navigation
      await page.locator('.navbar-nav.vertical .nav-link .title')
        .filter({ hasText: cat.label })
        .locator('..')
        .first()
        .click({ force: true });
      
      await expect(page).toHaveURL(new RegExp(cat.urlPart));
      await page.goBack();
    }
  });

  // Search Functionality
  test('should use the search bar and navigate to results', async ({ page }) => {
    await page.locator('header input[name="search"]').first().click();
    await page.locator('header input[name="search"]').first().fill('iPhone');
    await page.locator('header input[name="search"]').first().press('Enter');
    
    await expect(page).toHaveURL(/search/, { timeout: 10000 });
    await expect(page.locator(':has-text("iPhone")')).toBeVisible({ timeout: 10000 });
  });

  // Account and Cart Tests
  test('should open My Account dropdown and navigate to Login', async ({ page }) => {
    await page.locator('.nav-item.dropdown .dropdown-toggle:has-text("My account")').click({ force: true });
    
    // Wait for dropdown to be visible and click Login
    await expect(page.locator('.dropdown-menu')).toBeVisible();
    await page.locator('.dropdown-menu a.dropdown-item:has-text("Login")').click({ force: true });
    
    await expect(page).toHaveURL(/account\/login/);
  });

  test('should navigate to the shopping cart page', async ({ page }) => {
    await page.locator('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart"]')
      .first()
      .click({ force: true });
    await expect(page).toHaveURL(/checkout\/cart/);
  });

  // Breadcrumb Navigation
  test('should navigate using breadcrumbs', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=40');
    await page.locator('.breadcrumb-item:has-text("Software")').click({ force: true });
    await expect(page).toHaveURL(/path=17/);
    // Additional assertion to verify we're on the Software page
    await expect(page.locator('h1:has-text("Software")')).toBeVisible();
  });
});
