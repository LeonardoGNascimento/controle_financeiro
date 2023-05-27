describe("Login", () => {
  it("Dado que eu acesse a pagina de login quando tento realizar o login com usuário inválido deve me retornar erro", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/usuarios/login",
      body: {
        email: Cypress.env("email"),
        senha: Cypress.env("senha"),
      },
    }).then((value) => {
      expect(value.status).to.be.equal(201);
      expect(value.body).is.not.empty;
      expect(value.body).to.have.property("nome");
      expect(value.body).to.have.property("email");
      expect(value.body).to.have.property("access_token");
      expect(value.body.nome).to.be.equal("Shitzu");
    });
  });
});
