/// <reference types="cypress" />

describe('Note creation', () => {
   beforeEach(() => {
      cy.visit('/');
   });

   it('should display "Add note" button', () => {
      cy.contains('.btn', 'Add New Note');
   });

   it('should create and delete new note', () => {
      cy.contains('.btn', 'Save').should('be.disabled');
      cy.get('input[formcontrolname="title"]').type('New note title');
      cy.get('textarea[formcontrolname="body"]').type('New note content');
      cy.get('input[formcontrolname="keywords"]').type('new-note');
      cy.get('input[formcontrolname="date"]').click().type('2020-01-01');
      cy.contains('.btn', 'Save')
         .should('be.enabled')
         .click();

      cy.contains('.list-group-item', 'New note title').click();
      cy.contains('.btn', 'Delete').click();
   });
});
