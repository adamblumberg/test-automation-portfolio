describe('Form Submission', () => {
    beforeEach(() => {
      cy.visit('https://demoqa.com/automation-practice-form');
    });
  
    it('should validate empty fields', () => {
      cy.get('#submit').click();
      cy.get('#firstName').then(($input) => {
        expect($input[0].validationMessage).to.contain('Please fill out this field');
      });
    });
  
    it('should submit the form successfully', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#submit').click();
      cy.get('.modal-title').should('contain', 'Thanks for submitting the form');
    });
  });
  