const { test, expect } = require('@playwright/test');

test.describe('Debug Page Elements', () => {
  test('inspect page structure', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    
    // Check viewport size
    const viewportSize = page.viewportSize();
    console.log('Viewport size:', viewportSize);
    
    // Check for Special/Hot links
    console.log('\n=== Special/Hot Links ===');
    const specialLinks = await page.locator('*:has-text("Special")').all();
    for (let i = 0; i < specialLinks.length; i++) {
      const link = specialLinks[i];
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      const isVisible = await link.isVisible();
      console.log(`${i}: "${text}" | href: ${href} | visible: ${isVisible}`);
    }
    
    // Check for Category buttons
    console.log('\n=== Category Navigation ===');
    const categoryButtons = await page.locator('*[aria-label*="Category"], *:has-text("Category")').all();
    for (let i = 0; i < categoryButtons.length; i++) {
      const btn = categoryButtons[i];
      const ariaLabel = await btn.getAttribute('aria-label');
      const text = await btn.textContent();
      const isVisible = await btn.isVisible();
      console.log(`${i}: "${text}" | aria-label: ${ariaLabel} | visible: ${isVisible}`);
    }
    
    // Check for My Account links
    console.log('\n=== My Account Links ===');
    const accountLinks = await page.locator('*:has-text("account"), *:has-text("Account")').all();
    for (let i = 0; i < accountLinks.length; i++) {
      const link = accountLinks[i];
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      const isVisible = await link.isVisible();
      console.log(`${i}: "${text}" | href: ${href} | visible: ${isVisible}`);
    }
    
    // Check for Cart links
    console.log('\n=== Cart Links ===');
    const cartLinks = await page.locator('*[href*="cart"], *:has-text("cart"), *:has-text("Cart")').all();
    for (let i = 0; i < cartLinks.length; i++) {
      const link = cartLinks[i];
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      const isVisible = await link.isVisible();
      console.log(`${i}: "${text}" | href: ${href} | visible: ${isVisible}`);
    }
    
    // Save a screenshot for visual reference
    await page.screenshot({ path: 'debug-homepage.png', fullPage: true });
  });
});