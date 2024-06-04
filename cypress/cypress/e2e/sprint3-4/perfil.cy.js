describe("Probar la funcionalidad de perfil", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit("http://localhost:5173/BighornSheep/login");
    cy.get("#username").type("A444");
    cy.get("#password").type("Tello123!");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.get(".border-b > :nth-child(3) > a").click();
    cy.wait(1000);
  });

  it("Probar que existan los headers de perfil", () => {
    cy.get(".border-b > :nth-child(3) > a").should("exist");
    cy.get(".MuiTypography-h4").should("exist");
    cy.get(".flex > .MuiBox-root > .MuiTypography-root").should("exist");
  });

  it("Probar que existan las tabs de perfil", () => {
    cy.get(".MuiTabs-flexContainer").should("exist");
    cy.get(".Mui-selected").should("exist");
    cy.get(".MuiTabs-flexContainer > :nth-child(2)").should("exist");
    cy.get(".MuiTabs-flexContainer > :nth-child(3)").should("exist");
    cy.get(".MuiTabs-flexContainer > :nth-child(4)").should("exist");
    cy.get(".MuiTabs-flexContainer > :nth-child(5)").should("exist");
  });

  //pruebas de tab de "Cuenta"

  it("Verificar que exista la información de la cuenta", () => {
    cy.get(".MuiCardContent-root > :nth-child(1)").should("exist");
    cy.get("#Nombre").should("exist");
    cy.get(".MuiCardContent-root > :nth-child(3)").should("exist");
    cy.get("#Apellidos").should("exist");
    cy.get(".MuiCardContent-root > :nth-child(5)").should("exist");
    cy.get("#Matricula").should("exist");
    cy.get(".MuiCardContent-root > :nth-child(7)").should("exist");
    cy.get("#Carrera").should("exist");
    cy.get(".MuiCardContent-root > :nth-child(9)").should("exist");
    cy.get(".MuiCardContent-root > .MuiBox-root > .MuiTypography-root").should(
      "exist"
    );
    cy.get("#\\:rf\\:").should("exist");
    cy.get(".MuiCardActions-root > .MuiButtonBase-root").should("exist");
  });

  it("Realizar un cambio en el perfil", () => {
    cy.get("#Nombre").clear();
    cy.get("#Nombre").type("Tello");
    cy.get("#Apellidos").clear();
    cy.get("#Apellidos").type("Gonzalez Tamez");
    cy.get("#Carrera").clear();
    cy.get("#Carrera").type("Ingenieria en Tecnologías Computacionales");
    cy.get("#\\:rf\\:").clear();
    cy.get("#\\:rf\\:").type("12-3456-7890");

    cy.get(".MuiCardActions-root > .MuiButtonBase-root").click();
    cy.wait(1000);
    cy.get("#alert-dialog-title").should("exist");
    cy.get("#alert-dialog-description").should(
      "have.text",
      "Los cambios han sido guardados exitosamente."
    );
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").should("exist");
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
  });

  //Pruebas de tab de "logros"

  it("Verificar que exista la información de logros", () => {
    cy.get(".MuiTabs-flexContainer > :nth-child(2)").click();
    cy.get(".MuiCardHeader-content > .MuiTypography-root").should("exist");
    cy.get(".MuiCardHeader-content > .MuiTypography-root").should(
      "have.text",
      "Logros y Puntos"
    );
    cy.get(
      ".MuiCardContent-root > :nth-child(1) > :nth-child(2) > :nth-child(1)"
    ).should("exist");
    cy.get(
      ".MuiCardContent-root > :nth-child(1) > :nth-child(2) > :nth-child(2)"
    ).should("exist");
    cy.get(
      ".MuiCardContent-root > :nth-child(1) > :nth-child(2) > :nth-child(3)"
    ).should("exist");
    cy.get(
      ".MuiCardContent-root > :nth-child(1) > :nth-child(3) > :nth-child(1)"
    ).should("exist");
    cy.get(":nth-child(1) > .css-e784if-MuiTypography-root").should("exist");
    cy.get(":nth-child(2) > .css-e784if-MuiTypography-root").should("exist");
    cy.get(":nth-child(3) > .css-e784if-MuiTypography-root").should("exist");
    cy.get(":nth-child(4) > .css-e784if-MuiTypography-root").should("exist");
    cy.get(".mt-6 > .MuiTypography-h6").should("exist");
    cy.get(".mt-6 > .MuiTypography-h6").should(
      "have.text",
      "Distribución de Puntos Personales"
    );
    cy.get("canvas").should("exist");
    cy.get(".mt-6 > .MuiTypography-body2").should("exist");
  });

  //Pruebas de tab de "Configuración"

  it("Verificar la pestaña de configuración y modo oscuro", () => {
    cy.get(".MuiTabs-flexContainer > :nth-child(3)").should("exist");
    cy.get(".MuiTabs-flexContainer > :nth-child(3)").click();
    cy.get(".Mui-selected").should("exist");
    cy.get(".Mui-selected").click();
    cy.get(".MuiCardHeader-content > .MuiTypography-root").should("exist");
    cy.get(".MuiCardHeader-content > .MuiTypography-root").should(
      "have.text",
      "Configuración"
    );
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").should("exist");
    cy.get(".PrivateSwitchBase-input").should("exist");
    cy.get(".PrivateSwitchBase-input").click(); //Cambiar a modo oscuro, y cambiar a modo claro de vuelta
    cy.wait(1000);
    cy.get(".PrivateSwitchBase-input").click();
  });

  //Pruebas de tab de "Actividad Reciente"

  it("Verificar la pestaña de actividad reciente", () => {
    cy.get(".MuiTabs-flexContainer > :nth-child(4)").should("exist");
    cy.get(".MuiTabs-flexContainer > :nth-child(4)").click();
    cy.get(".MuiTabs-flexContainer > :nth-child(3)").should("exist");
    cy.get(".MuiCardHeader-content > .MuiTypography-root").should(
      "have.text",
      "Actividad Reciente"
    );
    cy.get(
      ":nth-child(1) > .MuiBox-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body1"
    ).should("exist");
    cy.get(
      ":nth-child(1) > .MuiBox-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body1"
    ).should("have.text", "Inicio de sesión"); // Como se require hacer login, siempre habrá al menos 1 actividad reciente de login
  });

  // Pruebas de actividad de "Amigos"

  it("Verificar la pestaña de amigos", () => {
    cy.get(".MuiTabs-flexContainer > :nth-child(5)").should("exist");
    cy.get(".MuiTabs-flexContainer > :nth-child(5)").click();
    cy.get(".MuiCardHeader-content > .MuiTypography-root").should("exist");
    cy.get(".MuiCardHeader-content > .MuiTypography-root").should(
      "have.text",
      "Amigos"
    ); // No está garantizado que tengas al menos 1 amigo.
  });
});
