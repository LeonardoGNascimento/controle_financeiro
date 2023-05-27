Cypress.Commands.add("login", (email, senha) => {
  if (email) {
    cy.get("#email").type(email);
  }

  if (senha) {
    cy.get("#senha").type(senha, { log: false });
  }
  cy.get("form").submit();
});
