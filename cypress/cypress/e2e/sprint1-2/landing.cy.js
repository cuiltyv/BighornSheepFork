describe("Probar funcionalidad en landing page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/BighornSheep/");
    cy.get("#username").type("A444");
    cy.get("#password").type("Tello123!");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.wait(4000);
  });

  it("Verificar que las cartas de salas existan", () => {
    cy.get(".flex-wrap > :nth-child(1)").should("exist");
    cy.get(".flex-wrap > :nth-child(2)").should("exist");
    cy.get(".flex-wrap > :nth-child(3)").should("exist");
    cy.get(".flex-wrap > :nth-child(4)").should("exist");
  });

  it("Verificar que cada carta tenga todos sus elementos", () => {
    cy.get(":nth-child(1) > a > .w-full").should("exist");
    cy.get(":nth-child(2) > a > .w-full").should("exist");
    cy.get(":nth-child(3) > a > .w-full").should("exist");
    cy.get(":nth-child(1) > a > .w-full").should("exist");
    cy.get(":nth-child(1) > a > .w-full").should("exist");
  });

  it("Verificar que se puede entrar al formulario de registro de reservación", () => {
    cy.get(":nth-child(1) > a > .w-full").click();
  });
});
