describe("Probar la funcionalidad de eventos admin", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit("http://localhost:5173/BighornSheep/login");
    cy.get("#username").type("A444");
    cy.get("#password").type("Tello123!");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.get(".border-b > :nth-child(4) > a").click();
    cy.visit("http://localhost:5173/BighornSheep/eventmanager");
    cy.wait(1000);
  });

  it("Probar que existan los headers de eventos admin", () => {
    cy.get(".MuiTypography-h4").should("exist");
    cy.get(":nth-child(3) > .MuiTypography-h6").should("exist");
    cy.get(".grid > :nth-child(2) > .MuiTypography-root").should("exist");
    cy.get(".grid > :nth-child(3) > .MuiTypography-root").should("exist");
    cy.get(".grid > :nth-child(4) > .MuiTypography-root").should("exist");
    cy.get(":nth-child(5) > .MuiTypography-root").should("exist");
  });

  it("Verificar que los textos tengan el contenido correcto", () => {
    cy.get(".MuiTypography-h4").should("have.text", "Manejo de Eventos");
    cy.get(":nth-child(3) > .MuiTypography-h6").should(
      "have.text",
      "Agregar Evento"
    );
    cy.get(".grid > :nth-child(1) > .MuiTypography-root").should(
      "have.text",
      "Nombre de Evento *"
    );
    cy.get(".grid > :nth-child(2) > .MuiTypography-root").should(
      "have.text",
      "Descripción"
    );
    cy.get(".grid > :nth-child(3) > .MuiTypography-root").should(
      "have.text",
      "Fecha de Inicio *"
    );
    cy.get(".grid > :nth-child(4) > .MuiTypography-root").should(
      "have.text",
      "Fecha Fin *"
    );
    cy.get(":nth-child(5) > .MuiTypography-root").should(
      "have.text",
      "Imagen URL *"
    );
  });

  it("Probar que existan los inputs de eventos admin", () => {
    cy.get("#\\:r1\\:").should("exist");
    cy.get("#\\:r3\\:").should("exist");
    cy.get("#\\:r7\\:").should("exist");
    cy.get("#\\:rb\\:").should("exist");
    cy.get("#\\:rb\\:").should("exist");
    cy.get(".mt-4").should("exist");
    cy.get(".mt-4").should("have.text", "Agregar Evento");
    cy.get(".grid > .MuiButtonBase-root").should("exist");
    cy.get(".grid > .MuiButtonBase-root").should("have.text", "Subir Imagen");
  });

  it("Probar el listado de eventos", () => {
    cy.get(".MuiPaper-root > :nth-child(4)").should("exist");
    cy.get(".grid > .MuiButtonBase-root").should("exist");
    cy.get(".css-1rr4qq7 > .MuiTypography-root").should("exist");
    cy.get(".css-1ug4zxe > .MuiTypography-root").should("exist");
    cy.get(".css-1c2bvcx > :nth-child(3) > .MuiTypography-root").should(
      "exist"
    );
    cy.get(".css-1c2bvcx > :nth-child(4) > .MuiTypography-root").should(
      "exist"
    );
  });

  it("Probar las acciones de los eventos", () => {
    cy.get(
      ":nth-child(1) > .MuiBox-root > .MuiCheckbox-root > .PrivateSwitchBase-input"
    ).should("exist");
    cy.get(
      ":nth-child(1) > .MuiBox-root > .MuiCheckbox-root > .PrivateSwitchBase-input"
    ).click();
    cy.get(':nth-child(1) > .MuiBox-root > [aria-label="edit"]').should(
      "exist"
    );
    cy.get(':nth-child(1) > .MuiBox-root > [aria-label="edit"]').click();
    cy.get(".MuiModal-root > .absolute").should("exist");
    cy.get(".absolute > .MuiTypography-h6").should("exist");
    cy.get(".MuiButton-outlined").should("exist");
    cy.get(".absolute > .MuiBox-root > .MuiButton-contained").should("exist");
    cy.get(".MuiButton-outlined").click();
  });
});
