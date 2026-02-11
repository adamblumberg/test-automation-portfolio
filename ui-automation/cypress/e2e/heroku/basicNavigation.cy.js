describe('Basic Site Navigation', () => {
    it('should open the homepage', () => {
      cy.visit('http://the-internet.herokuapp.com');
      cy.url().should('include', 'the-internet');
    });
  
    it('should navigate to a different page', () => {
      cy.visit('http://the-internet.herokuapp.com');
      cy.get('a[href="/abtest"]').click();
      cy.url().should('include', 'abtest');
    });
  });
  