describe("Probando la funcionalidad del dashboard de admin", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/BighornSheep/login");
    cy.get("#username").type("A444");
    cy.get("#password").type("grahhhhhhhhhhhh");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.wait(4000);
    cy.get(".border-b > :nth-child(5) > a").click();
  });

  it("Probar la funcionalidad de la tabla de usuarios", () => {
    cy.get("#users").click();
    cy.wait(4000);
  });
});
