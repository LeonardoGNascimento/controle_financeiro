describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it.only("Dado que acesso a tela de login quando tento realizar o login com usuario válido deve acessar o dashboar", () => {
    cy.login(Cypress.env("email"), Cypress.env("senha"));
    cy.contains("span", "Dashboard").should("be.visible");
    cy.contains("span", "Sair").should("be.visible");
    cy.contains("div", "Olá").should("be.visible");
    cy.contains("span", "Sair").click();
    cy.contains("button", "Entrar").should("be.visible");
  });

  it("Dado que acesso a tela de login quando tento realizar o login sem dados deve me retornar erro", () => {
    cy.login("", "");
    cy.contains("p", "Email é obrigatório").should("be.visible");
    cy.contains("p", "Senha é obrigatório").should("be.visible");
  });

  it("Dado que acesso a tela de login, quando digito apenas o email deve me retornar erro de senha obrigátoria", () => {
    cy.login("leo@leo", "");
    cy.contains("p", "Senha é obrigatório").should("be.visible");
  });

  it("Dado que acesso a tela de login, quando digito apenas a senha deve me retornar erro de email obrigátoria", () => {
    cy.login("", "senha");
    cy.contains("p", "Email é obrigatório").should("be.visible");
  });
});
