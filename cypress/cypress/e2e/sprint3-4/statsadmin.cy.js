describe("Probar la página del panel de estadísticas de administrador", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit("http://localhost:5173/BighornSheep/login");
    cy.get("#username").type("A444");
    cy.get("#password").type("Tello123!");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.get(".border-b > :nth-child(4) > a").click();
    cy.visit("http://localhost:5173/BighornSheep/adminstats");
    cy.wait(1000);
  });

  it("Verificar los contenedores de la página de estadísticas de administrador", () => {
    cy.get(".MuiTypography-h4").should("exist");

    cy.get(".flex-grow > :nth-child(3) > :nth-child(1)").should("exist");
    cy.get(".flex-grow > :nth-child(3) > :nth-child(2)").should("exist");
    cy.get(".flex-grow > :nth-child(3) > :nth-child(3)").should("exist");

    cy.get(
      ":nth-child(1) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("exist");

    cy.get(
      ":nth-child(2) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("exist");

    cy.get(
      ":nth-child(3) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ".mt-4 > :nth-child(1) > .MuiPaper-root > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ".mt-4 > :nth-child(2) > .MuiPaper-root > .MuiTypography-root"
    ).should("exist");
    cy.get(".mt-4 > :nth-child(1) > .MuiPaper-root").should("exist");
    cy.get(".mt-4 > :nth-child(2) > .MuiPaper-root").should("exist");
    cy.get(".mt-4 > :nth-child(3) > .MuiPaper-root").should("exist");
    cy.get(":nth-child(4) > .MuiPaper-root").should("exist");
    cy.get(":nth-child(5) > .MuiPaper-root").should("exist");
    cy.get(
      ":nth-child(6) > .MuiGrid-container > :nth-child(1) > .MuiPaper-root"
    ).should("exist");
    cy.get(
      ":nth-child(6) > .MuiGrid-container > :nth-child(2) > .MuiPaper-root"
    ).should("exist");
  });

  it("Verificar los textos de la página de estadísticas de administrador", () => {
    cy.get(
      ":nth-child(1) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ":nth-child(1) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("have.text", "Reservaciones Totales");

    cy.get(
      ":nth-child(2) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ":nth-child(2) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("have.text", "Usuarios Activos");

    cy.get(
      ":nth-child(3) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ":nth-child(3) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("have.text", "Cuarto Más Popular");
  });

  it("Verificar los textos de los contenedores de las gráficas", () => {
    cy.get(
      ".mt-4 > :nth-child(1) > .MuiPaper-root > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ".mt-4 > :nth-child(1) > .MuiPaper-root > .MuiTypography-root"
    ).should("have.text", "Desglose de Reservaciones por Estado");

    cy.get(
      ".mt-4 > :nth-child(2) > .MuiPaper-root > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ".mt-4 > :nth-child(2) > .MuiPaper-root > .MuiTypography-root"
    ).should("have.text", "Reservaciones por Tipo de Usuario");

    cy.get(":nth-child(3) > .MuiPaper-root > .MuiTypography-root").should(
      "exist"
    );
    cy.get(":nth-child(3) > .MuiPaper-root > .MuiTypography-root").should(
      "have.text",
      "Cuartos Más Populares"
    );

    cy.get(":nth-child(4) > .MuiPaper-root > .MuiTypography-root").should(
      "exist"
    );
    cy.get(":nth-child(4) > .MuiPaper-root > .MuiTypography-root").should(
      "have.text",
      "Reservaciones por Hora del Día"
    );

    cy.get(":nth-child(5) > .MuiPaper-root > .MuiTypography-root").should(
      "exist"
    );
    cy.get(":nth-child(5) > .MuiPaper-root > .MuiTypography-root").should(
      "have.text",
      "Tendencia de Reservas Mensuales"
    );

    cy.get(
      ":nth-child(6) > .MuiGrid-container > :nth-child(1) > .MuiPaper-root > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ":nth-child(6) > .MuiGrid-container > :nth-child(1) > .MuiPaper-root > .MuiTypography-root"
    ).should("have.text", "Actividad de Usuarios");

    cy.get(
      ":nth-child(6) > .MuiGrid-container > :nth-child(2) > .MuiPaper-root > .MuiTypography-root"
    ).should("exist");
    cy.get(
      ":nth-child(6) > .MuiGrid-container > :nth-child(2) > .MuiPaper-root > .MuiTypography-root"
    ).should("have.text", "Recomendaciones de Hardware");
  });

  it("Verificar que las gráficas existan", () => {
    cy.get(".mt-4 > :nth-child(1) > .MuiPaper-root").should("exist");
    cy.get(".mt-4 > :nth-child(2) > .MuiPaper-root").should("exist");
    cy.get(".mt-4 > :nth-child(3) > .MuiPaper-root").should("exist");
    cy.get(":nth-child(4) > .MuiPaper-root").should("exist");
    cy.get(":nth-child(5) > .MuiPaper-root").should("exist");
    cy.get(
      ":nth-child(6) > .MuiGrid-container > :nth-child(1) > .MuiPaper-root"
    ).should("exist");
    cy.get(":nth-child(6) > .MuiGrid-container > :nth-child(2)").should(
      "exist"
    );
  });
});
