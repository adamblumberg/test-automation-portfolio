describe('Homepage Navigation Tests', () => {
    beforeEach(() => {
      cy.visit('https://ecommerce-playground.lambdatest.io');
    });
    //nagivate to the homepage before each navigation test
  
    it('Test 1: Home button should navigate to Home page and load', () => {
        cy.get("span.title:contains(' Home')").click();
        //find the home button and click it
        cy.url().should('include', 'route=common/home')
         //validate the URL is correct
        cy.get("span.title:contains(' Home')").should('exist')
        //validate the home button loads in
    });

    it('Test 2: Special button functions and page loads', () => {
        cy.get("#widget-navbar-217834 ul.horizontal")
        .find("li:contains(' Special')")
        .click()    
        //find special button and click it

        cy.url().should('include', 'route=product/special')
        //validate the URL is correct

        cy.get("h1.h3:contains('Special Offers')").should('exist');
        //validate that special offers header loads in
    });

    it('Test 3: Blog button loads the blog', () => {
        cy.get("#widget-navbar-217834 ul.horizontal")
        .find("li:contains(' Blog')")
        .click()    
        //find Blog button and click it

        cy.url().should('include', 'blog/home')
        //validate the URL is correct

        cy.contains('h3', 'Latest Articles').should('exist');
        //validate that special offers header loads in
    });

    it('Test 4: Mega Menu button loads the About us page', () => {
        cy.get("#widget-navbar-217834 ul.horizontal")
        .find("li:contains(' Mega Menu')")
        .click()    
        //find Mega Menu or About Us button

        cy.url().should('include', 'route=information/information&information_id=4')
        //validate the URL is correct

        cy.contains('h1', 'About Us').should('exist');
        //validate that about us header loads in
    });

    it('Test 5: My account button loads account page', () => {
        cy.get("#widget-navbar-217834 ul.horizontal")
        .find("li:contains(' My account')")
        .click()    
        //Find My Account button and click it

        cy.url().should('include', 'route=account/login')
        //validate the URL is correct

        cy.contains('h2', 'New Customer').should('exist');
        //validate that about us header loads in
    });

    });