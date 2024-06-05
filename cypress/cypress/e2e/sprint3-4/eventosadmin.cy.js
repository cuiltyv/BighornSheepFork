describe("Probar la funcionalidad de eventos admin", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit("http://localhost:5173/BighornSheep/login");
    cy.get("#username").type("A444");
    cy.get("#password").type("Tello123!");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.get(".border-b > :nth-child(4) > a").click();
    //cy.get(
    //'.MuiButtonBase-root.rounded-md > [data-testid="MenuOutlinedIcon"] > path'
    //).click();
    //cy.get(":nth-child(4) > .pro-inner-item > .pro-item-content > a").click();
    cy.visit("http://localhost:5173/BighornSheep/eventmanager");
    cy.wait(1000);
  });

  it("Probar que existan los headers de eventos admin", () => {
    cy.get(".border-b > :nth-child(4) > a").should("exist");
    cy.get(".MuiTypography-h4").should("exist");
    cy.get(".flex > .MuiBox-root > .MuiTypography-root").should("exist");
  });
});
