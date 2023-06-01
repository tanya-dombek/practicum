describe('App initialization', function() {
  it('should be available on localhost:5000', () => {
    cy.visit('http://localhost:5000');
  });

  it('loads ingredients on home page', () => {
    cy.seedAndVisit();

    cy.get("[data-testid=bun-container]").should('have.length', 2);
    cy.get("[data-testid=sauce-container]").should('have.length', 4);
    cy.get("[data-testid=main-container]").should('have.length', 9);

  })
});
