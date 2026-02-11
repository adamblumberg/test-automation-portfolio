describe('Basic Site Navigation', () => {
    beforeEach(() => {
        // Start each test from the homepage
        cy.visit('https://ecommerce-playground.lambdatest.io/');
    });

    // Homepage Tests
    it('should open the homepage', () => {
        cy.url().should('include', 'ecommerce');
        cy.get('header').should('be.visible');
        cy.get('input[name="search"]').should('be.visible');
    });

    // Navigation Tests
    it('should click the special button and navigate to specials', () => {
        cy.contains('span.badge', 'Hot').parent('a').click({ force: true });
        cy.url().should('include', '/index.php?route=product/special');
    });

    it('should click the logo to return to the homepage', () => {
        cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=product/special');
        cy.get('header a[title="Poco Electro"]').click({ force: true });
        cy.url().should('include', 'route=common/home');
    });

    // Category Navigation
    it('should navigate to items in Shop by Category menu', () => {
        const categories = [
            { label: 'Desktops and Monitors', urlPart: 'path=28' },
            { label: 'Laptops & Notebooks', urlPart: 'path=18' },
            { label: 'Components', urlPart: 'path=25' },
            { label: 'Software', urlPart: 'path=17' },
            { label: 'Phone, Tablets & Ipod', urlPart: 'path=57' },
            { label: 'Cameras', urlPart: 'path=33' },
            { label: 'MP3 Players', urlPart: 'path=34' }
        ];
        categories.forEach(cat => {
            // Open the category drawer
            cy.get('a[aria-label="Shop by Category"][data-toggle="mz-pure-drawer"][href="#mz-component-1626147655"]')
                .first()
                .click({ force: true });
            
            // Click the category and verify navigation
            cy.get('.navbar-nav.vertical .nav-link .title')
                .contains(cat.label)
                .parents('a.nav-link')
                .first()
                .click({ force: true });
            cy.url().should('include', cat.urlPart);
            cy.go('back');
        });
    });

    // Search Functionality
    it('should use the search bar and navigate to results', () => {
        cy.get('header input[name="search"]')
            .first()
            .click()
            .type('iPhone{enter}');
        cy.url({ timeout: 10000 }).should('include', 'search');
        cy.contains('iPhone', { timeout: 10000 }).should('exist');
    });

    // Account and Cart Tests
    it('should open My Account dropdown and navigate to Login', () => {
        cy.get('.nav-item.dropdown .dropdown-toggle')
            .contains('My account')
            .click({ force: true });
        
        // Wait for dropdown to be visible and click Login
        cy.get('.dropdown-menu')
            .should('be.visible')
            .find('a.dropdown-item')
            .contains('Login')
            .click({ force: true });
        
        cy.url().should('include', 'account/login');
    });

    it('should navigate to the shopping cart page', () => {
        cy.get('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart"]')
            .first()
            .click({ force: true });
        cy.url().should('include', 'checkout/cart');
    });

    // Breadcrumb Navigation
    it('should navigate using breadcrumbs', () => {
        cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=40');
        cy.get('.breadcrumb-item')
            .contains('Software')
            .click({ force: true });
        cy.url().should('include', 'path=17');
        // Additional assertion to verify we're on the Software page
        cy.get('h1').should('contain', 'Software');
    });
});
