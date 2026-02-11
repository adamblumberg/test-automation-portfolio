describe('Login Functionality', () => {
    it('should display an error for invalid credentials', () => {
        cy.visit('http://the-internet.herokuapp.com/login');
        cy.get('#username').type('invalidUser');
        cy.get('#password').type('invalidPass');
        cy.get('.radius').click();
        cy.get('#flash').should('contain', 'Your username is invalid!');
    });

    it('should successfully log in with valid credentials', () => {
        cy.visit('http://the-internet.herokuapp.com/login');
        cy.get('#username').type('tomsmith');
        cy.get('#password').type('SuperSecretPassword!');
        cy.get('.radius').click();
        cy.url().should('include', '/secure');
        cy.get('#flash').should('contain', 'You logged into a secure area!');
    });

    it('should successfully log out', () => {
        // if the previous test was properly logged in
        cy.visit('http://the-internet.herokuapp.com/login');
        cy.get('#username').type('tomsmith');
        cy.get('#password').type('SuperSecretPassword!');
        cy.get('.radius').click();

        // log out after log in
        cy.get('.button.secondary.radius').click();
        cy.url().should('include', '/login');
        cy.get('#flash').should('contain', 'You logged out of the secure area!');
    });
});