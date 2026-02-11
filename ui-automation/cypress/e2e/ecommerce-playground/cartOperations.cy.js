/**
 * Shopping cart operations test.
 *
 * This spec adds two different products to the cart by navigating directly
 * to their product pages and clicking the "Add to Cart" button.  It then
 * visits the cart page, verifies that at least two line items exist,
 * updates the quantity of the first item and removes the second item.  The
 * test asserts that the quantity field reflects the new value and that
 * only one row remains after removal.
 *
 * Because the identifiers for update and remove buttons on the cart page
 * include a title attribute, selectors such as button[title="Update"] and
 * button[title="Remove"] are used.  Quantity inputs may either be of
 * type="number" or have a name beginning with "quantity".
 *
 * Identifiers used:
 *   - button[title="Add to Cart"]         : Add to cart on product pages
 *   - table.table tbody tr               : each row in the cart table
 *   - input[type="number"], input[name^="quantity"] : quantity input fields
 *   - button[title="Update"]             : update button for a cart line
 *   - button[title="Remove"]             : remove button for a cart line
 */

describe('Shopping cart operations', () => {
  it('should add two products, update quantity and remove one', () => {
    // Add first product (MacBook Air - product_id 48)
    cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=48');
    cy.get('button[title="Add to Cart"]').click();

    // Add second product (iPhone - product_id 31)
    cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=31');
    cy.get('button[title="Add to Cart"]').click();

    // Navigate to the cart page
    cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');

    // Ensure at least two items are present in the cart
    cy.get('table.table tbody tr').should('have.length.at.least', 2);

    // Update the quantity of the first item to 2
    cy.get('table.table tbody tr').first()
      .within(() => {
        cy.get('input[type="number"], input[name^="quantity"]')
          .clear()
          .type('2');
        cy.get('button[title="Update"]').click();
        cy.get('input[type="number"], input[name^="quantity"]').should('have.value', '2');
      });

    // Remove the second item from the cart
    cy.get('table.table tbody tr').eq(1).within(() => {
      cy.get('button[title="Remove"]').click();
    });

    // Confirm that only one row remains
    cy.get('table.table tbody tr').should('have.length', 1);
  });
});
