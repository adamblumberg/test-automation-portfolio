describe('Search Functionality on eCommerce Playground', () => {
    beforeEach(() => {
        cy.visit('https://ecommerce-playground.lambdatest.io');
    });

    it('should display results when searching for existing product', () => {
        cy.get('input[name="search"]')
            .first()
            .click()
            .type('sony{enter}');

        // Wait for search results to load
        cy.url().should('include', 'search=sony');
        
        // Verify search results
        cy.get('img[alt="Sony VAIO"]').should('be.visible');
        cy.get('.product-thumb').should('have.length.gt', 0);
        cy.get('.product-layout').should('exist');
    });

    it('should display no results message for invalid search', () => {
        cy.get('input[name="search"]')
            .first()
            .click()
            .type('invalid{enter}');

        // Verify URL and no results message
        cy.url().should('include', 'search=invalid');
        cy.contains('There is no product that matches the search criteria.')
            .should('be.visible');
        cy.get('.product-thumb').should('not.exist');
    });

    it('should handle special characters in search query', () => {
        cy.get('input[name="search"]')
            .first()
            .click()
            .type('"{enter}');

        // Verify search results with special character
        cy.url().should('include', 'search=%22');
        cy.get('.product-layout').should('exist');
        
        // Verify result count
        cy.get('div.text-right')
            .contains('Showing')
            .invoke('text')
            .should('match', /Showing \d+/);
    });

    it('should show autocomplete suggestions while typing', () => {
        cy.get('input[name="search"]')
            .first()
            .click()
            .type('ip');

        // Verify autocomplete dropdown appears
        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.dropdown-menu .product-thumb').should('exist');
    });

    it('should handle multiple word searches', () => {
        cy.get('input[name="search"]')
            .first()
            .click()
            .type('apple mac{enter}');

        // Verify that the search functionality handles multiple-word queries correctly
        cy.url().should('include', 'search=apple+mac');
        cy.get('.product-layout').should('exist');
    });

    it('should preserve search term in search box after search', () => {
        const searchTerm = 'iphone';
        cy.get('input[name="search"]')
            .first()
            .click()
            .type(`${searchTerm}{enter}`);

        cy.url().should('include', `search=${searchTerm}`);
        cy.get('input[name="search"]').first().should('have.value', searchTerm);
    });

    it('should clear autocomplete when search box is cleared', () => {
        cy.get('input[name="search"]')
            .first()
            .click()
            .type('ip')
            .clear();

        cy.get('.dropdown-menu').should('not.be.visible');
    });

    it('should handle minimum character requirement for search', () => {
        cy.get('input[name="search"]')
            .first()
            .click()
            .type('a{enter}');

        // Verify that the search handles single-character queries by checking for results or an alert message
        cy.url().should('include', 'search=a');
        cy.get('.product-layout, .alert').should('exist');
    });

    it('should trim whitespace from search query', () => {
        cy.get('input[name="search"]')
            .first()
            .click()
            .type('  sony  {enter}');

        // Verify URL includes trimmed and encoded search query
        cy.url().should('include', 'search=sony');
        cy.get('.product-thumb').should('have.length.gt', 0);
        cy.get('img[alt="Sony VAIO"]').should('be.visible');
    });
});