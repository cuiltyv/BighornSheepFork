describe("Probando la funcionalidad del dashboard de admin", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/BighornSheep/login");
    cy.get("#username").type("A444");
    cy.get("#password").type("grahhhh!");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.wait(4000);
    cy.get(".border-b > :nth-child(5) > a").click();
  });

  it("Verificar que las cartas de estadísticas existan", () => {
    cy.get(".sm\\:grid-cols-2 > :nth-child(1)");
    cy.get(".sm\\:grid-cols-2 > :nth-child(2)").should("exist");
    cy.get(".sm\\:grid-cols-2 > :nth-child(3)").should("exist");
    cy.get(".sm\\:grid-cols-2 > :nth-child(4)").should("exist");
  });

  it("Verificar que las cartas de estadísticas tengan los headers correctos", () => {
    cy.get(":nth-child(1) > .mb-4").should("have.text", "Tipos de cuartos");
    cy.get(".sm\\:grid-cols-2 > :nth-child(2) > .mb-4").should(
      "have.text",
      "Reservaciones"
    );
    cy.get(":nth-child(3) > .mb-4").should("have.text", "Confirmadas");
    cy.get(":nth-child(4) > .mb-4").should("have.text", "Eventos");
  });

  it("Verificar la tabla de reservaciones", () => {
    cy.get(".overflow-x-auto").should("exist");
    cy.get("thead.bg-gray-50 > tr > :nth-child(1)").should("have.text", "ID");
    cy.get("thead.bg-gray-50 > tr > :nth-child(2)").should(
      "have.text",
      "Matricula"
    );
    cy.get("thead.bg-gray-50 > tr > :nth-child(3)").should(
      "have.text",
      "Hora Inicio"
    );
    cy.get("thead.bg-gray-50 > tr > :nth-child(4)").should(
      "have.text",
      "Hora Fin"
    );
    cy.get("thead.bg-gray-50 > tr > :nth-child(5)").should(
      "have.text",
      "Proposito"
    );
    cy.get("thead.bg-gray-50 > tr > :nth-child(6)").should(
      "have.text",
      "Estado"
    );
    cy.get("thead.bg-gray-50 > tr > :nth-child(7)").should(
      "have.text",
      "Cuarto"
    );
  });

  it("Verificar input de texo para filtrar por matricula", () => {
    cy.get(".overflow-x-auto").should("exist");
    cy.get("#searchMatricula").should("exist");
  });

  it("Probar el filtro de reservaciones por matricula", () => {
    cy.get("#searchMatricula").type("A444");
    cy.get(".bg-gray-50 > :nth-child(2)").should("have.text", "A444");
    cy.get("#searchMatricula").clear();
    cy.get("#searchMatricula").type("A0000000");
    cy.get("tbody > tr").should("not.exist");
  });

  it("Verificar que el dropdown para filtrar por sala exista", () => {
    cy.get(".relative").should("exist");
    cy.get(".mb-2\\.5").should("exist");
  });

  it("Probar el filtro de reservaciones por sala", () => {
    cy.get(".relative").should("exist");
    cy.get(".mb-2\\.5").should("exist");
    cy.get(".mb-2\\.5").click();
    cy.get(".absolute > :nth-child(1)").should("exist");
    cy.get(".absolute > :nth-child(2)").should("exist");
    cy.get(".absolute > :nth-child(3)").should("exist");
    cy.get(".absolute > :nth-child(2)").click();
    cy.get("tbody > tr").should("exist");
    cy.get("tbody > :nth-child(1) > :nth-child(7)").should(
      "have.text",
      "New Horizons"
    );
  });

  it("Verificar que el dropdown para filtrar por estado exista", () => {
    cy.get(".multi-select-filter").should("exist");
    cy.get(".multi-select-filter > h3").should("exist");
  });

  it("Probar el filtro de reservaciones por estado", () => {
    cy.get(".multi-select-filter").should("exist");
    cy.get(".multi-select-filter > h3").should("exist");
    cy.get(":nth-child(2) > label").should("exist");
    cy.get(":nth-child(3) > label").should("exist");
    cy.get(":nth-child(4) > label").should("exist");
    cy.get(":nth-child(2) > label > input").should("exist");
    cy.get(":nth-child(2) > label > input").click();
    cy.get("tbody > :nth-child(1) > :nth-child(6)").should(
      "have.text",
      "Confirmado"
    );
  });

  it("Verificar que el boton de cancelar filtros exista", () => {
    cy.get(
      '[style="margin-right: 5px; background: red; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;"]'
    ).should("exist");
  });

  it("Probar el boton de cancelar filtros", () => {
    cy.get(
      '[style="margin-right: 5px; background: red; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;"]'
    ).click();
    cy.get("tbody > tr").should("exist");
  });

  it("Verificar que el boton de aplicar filtros exista", () => {
    cy.get(
      '[style="background: green; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;"]'
    ).should("exist");
  });

  //boton para seleccionar todas

  it("Verificar que el boton de seleccionar todas exista", () => {
    cy.get(
      '[style="background: rgb(240, 240, 240); color: rgb(51, 51, 51); padding: 5px 10px; border: 1px solid rgb(221, 221, 221); border-radius: 3px; cursor: pointer; margin-right: 5px;"]'
    ).should("exist");
    cy.get(
      '[style="background: rgb(240, 240, 240); color: rgb(51, 51, 51); padding: 5px 10px; border: 1px solid rgb(221, 221, 221); border-radius: 3px; cursor: pointer; margin-right: 5px;"]'
    ).click();
  });

  //boton para limpiar

  it("Verificar que el boton de limpiar exista", () => {
    cy.get(
      '[style="background: rgb(240, 240, 240); color: rgb(51, 51, 51); padding: 5px 10px; border: 1px solid rgb(221, 221, 221); border-radius: 3px; cursor: pointer;"]'
    ).click();
  });

  // boton de ver resevacion

  it("Verificar que el boton de ver reservacion exista", () => {
    cy.get(':nth-child(1) > .flex > [title="Ver"] > .hidden').should("exist");
  });

  it("Probar el boton de ver reservacion", () => {
    cy.get(':nth-child(1) > .flex > [title="Ver"] > .hidden').click();
    cy.get(".fixed > .w-full").should("exist");
  });

  // boton de editar resevacion

  it("Verificar que el boton de editar reservacion exista", () => {
    cy.get(':nth-child(1) > .flex > [title="Editar"] > .hidden').should(
      "exist"
    );
  });

  it("Probar el boton de editar reservacion", () => {
    cy.get(':nth-child(1) > .flex > [title="Editar"] > .hidden').click();
    cy.get(".max-w-2xl > .p-5").should("exist");
  });

  // boton de eliminar resevacion

  it("Verificar que el boton de eliminar reservacion exista", () => {
    cy.get(":nth-child(1) > .flex > .text-red-600 > .hidden").should("exist");
  });
});
