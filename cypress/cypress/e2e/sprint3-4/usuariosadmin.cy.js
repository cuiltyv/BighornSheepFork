describe("Probar la funcionalidad del panel de usuarios de administrador", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit("http://localhost:5173/BighornSheep/login");
    cy.get("#username").type("A444");
    cy.get("#password").type("Tello123!");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.get(".border-b > :nth-child(4) > a").click();
    cy.visit("http://localhost:5173/BighornSheep/usermanagement");
    cy.wait(1000);
  });

  it("Probar que existan los headers y tarjetas de administrador", () => {
    cy.get(".MuiTypography-gutterBottom").should("exist");
    cy.get(".MuiTypography-gutterBottom").should(
      "have.text",
      "Manejo de Usuarios"
    );
    cy.get(".grid > :nth-child(1)").should("exist");
    cy.get(".grid > :nth-child(2)").should("exist");
    cy.get(".grid > :nth-child(3)").should("exist");
    cy.get(".grid > :nth-child(4)").should("exist");
  });

  it("Verificar que existan los filtros y botones del panel de usuarios", () => {
    cy.get(":nth-child(1) > .MuiInputBase-root").should("exist");
    cy.get(".MuiSelect-select").should("exist");
    cy.get("#\\:r5\\:").should("exist");
    cy.get(".MuiButton-containedPrimary").should("exist");
    cy.get(".MuiButton-containedSecondary").should("exist");
  });

  it("Probar los filtros de usuarios", () => {
    cy.get(":nth-child(1) > .MuiInputBase-root").type("A444");
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      "Tello"
    );
  });

  it("Verificar la tabla de usuarios", () => {
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(1)").should(
      "exist"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(1)").should(
      "have.text",
      "Matricula"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
      "exist"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
      "have.text",
      "Nombre"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(3)").should(
      "exist"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(3)").should(
      "have.text",
      "Apellidos"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(4)").should(
      "exist"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(4)").should(
      "have.text",
      "Carrera"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(5)").should(
      "exist"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(5)").should(
      "have.text",
      "Semestre"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(6)").should(
      "exist"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(6)").should(
      "have.text",
      "Rol"
    );

    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(7)").should(
      "exist"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(7)").should(
      "have.text",
      "Puntos Personales"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(8)").should(
      "exist"
    );
    cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(8)").should(
      "have.text",
      "Acciones"
    );
    cy.get(
      ":nth-child(1) > :nth-child(8) > .MuiIconButton-colorPrimary"
    ).should("exist");
    cy.get(
      ':nth-child(1) > :nth-child(8) > .MuiIconButton-colorSecondary > [data-testid="DeleteIcon"]'
    ).should("exist");
  });
});
