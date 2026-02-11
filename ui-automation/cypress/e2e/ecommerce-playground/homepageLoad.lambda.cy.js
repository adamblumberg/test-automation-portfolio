describe('Homepage Load test', () => {
      it('should navigate to ecommerce-playground', () => {
        cy.visit('https://ecommerce-playground.lambdatest.io/');
        //visit the above URL
        cy.get('input[name="search"]').should('be.visible');
        //the search field should be visible
      })
})  