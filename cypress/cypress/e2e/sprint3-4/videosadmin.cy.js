describe("Probar la funcionalidad del panel de videos de administrador", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit("http://localhost:5173/BighornSheep/login");
    cy.get("#username").type("A444");
    cy.get("#password").type("Tello123!");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.get(".border-b > :nth-child(4) > a").click();
    cy.visit("http://localhost:5173/BighornSheep/videomanager");
    cy.wait(1000);
  });

  it("Probar que existan los headers de videos admin", () => {
    cy.get(".MuiPaper-root > :nth-child(3) > .MuiTypography-root").should(
      "exist"
    );
    cy.get("#\\:r1\\:").should("exist");
    cy.get(".MuiPaper-root > :nth-child(3) > .MuiButtonBase-root").should(
      "exist"
    );
  });

  it("Verificar los textos en los headers de videos admin", () => {
    cy.get(".MuiTypography-h4").should("have.text", "Manejo de Videos");
    cy.get(".MuiPaper-root > :nth-child(3) > .MuiTypography-root").should(
      "have.text",
      "Agregar Video - Resolución recomendada: 2880 x 1080"
    );
    cy.get(".MuiPaper-root > :nth-child(3) > .MuiButtonBase-root").should(
      "have.text",
      "Agregar Video"
    );
  });

  it("Verificar el listado de videos", () => {
    cy.get(".MuiPaper-root > :nth-child(4)").should("exist");
    cy.get(":nth-child(4) > .MuiTypography-h6").should("exist");
    cy.get(":nth-child(4) > .MuiTypography-h6").should("have.text", "Videos");
    cy.get(".MuiList-root > :nth-child(1)").should("exist");
  });
});
