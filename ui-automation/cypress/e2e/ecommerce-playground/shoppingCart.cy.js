describe("Guest Checkout: Shopping Cart Functionality", () => {
  it("Test 1: As a Guest, I can search for and add items to the cart", () => {
    //set the screen size
    cy.viewport(2544, 1000);
    //visit the homepage
    cy.visit("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
    // Click on the search field
    cy.get('input[name="search"]').eq(0).click();
    // Type 'macbook pro' in the search field and press enter
    cy.get('input[name="search"]').eq(0).type('macbook pro{enter}');
    cy.wait(500)
    // Assert the search worked by checking URL and image availability
    cy.url().should('include', 'search=macbook+pro');
    cy.get('img[alt="MacBook Pro"]').should('exist');
    // Click the item (macbook pro)
    cy.get('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=62&search=macbook+pro"').first().click();
    // Click the Add to Cart button
    cy.get('button[title="Add to Cart"]').eq(1).click();
    // Click on the 'View Cart' button
    cy.get('div.col a').eq(0).click();
    // Click on Checkout button
    cy.get('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout"]').eq(1).click();
    // Select 'Guest Checkout' radio button
    cy.contains('label', 'Guest Checkout').click();
    // Enter Personal Details
    cy.get('input[name="firstname"]').click().type('First')
    cy.get('input[name="lastname"]').click().type('Last')
    cy.get('input[name="email"]').click().type('firstlast@fake.com')
    cy.get('input[name="telephone"]').click().type('5555555555')
    cy.get('div[id="payment-address"] input').eq(1)
    cy.get('input[name="address_1"]').click().type('123 Fake Street')
    cy.get('input[name="city"]').scrollIntoView().should('be.visible').click().type('San Francisco')
    cy.get('input[name="postcode"]').click().type('12345')
    cy.get('select[name="country_id"]').select('223')
    cy.get('select[name="zone_id"]').select('3624')
    cy.wait(500)
    // TOS agreement checkbox
    cy.get('label[for="input-agree"]').click();
    // Click Continue Button
    cy.get('button#button-save').click();
    cy.get('button#button-confirm').click();
    cy.wait(500)
  });

});
