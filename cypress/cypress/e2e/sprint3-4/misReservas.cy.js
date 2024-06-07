describe("Probar la funcionalidad de eventos admin", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit("https://dreamlabs.cfd/BighornSheep/login");
    cy.get("#username").type("A01345678");
    cy.get("#password").type("Testeando1#");
    cy.get(".flex.items-center > .inline-flex").click();
    cy.get(".border-b > :nth-child(1) > a").click();
    cy.get('.border-b > :nth-child(2) > a').click()
    cy.wait(1000);
  });

  it("Verificar que si no tienes reservas confirmadas te aparece el mensaje", () => {
    cy.get(':nth-child(3) > .m-5 > .text-center').should("exist")
    cy.get('.border-b > :nth-child(1) > a').click()
    cy.wait(1000);
    cy.get(':nth-child(3) > .react-card-flip > .react-card-flipper > .react-card-front > .min-h-96 > .cursor-pointer').click()
    cy.get(':nth-child(33) > [data-cy="day-button"]').click()
    cy.get(':nth-child(5) > .justify-between > [data-cy="add-device"]').click()
    cy.get(':nth-child(2) > .justify-between > [data-cy="add-device"]').click()
    cy.get(':nth-child(6) > .justify-between > [data-cy="add-device"]').click()
    cy.get(':nth-child(1) > .justify-between > [data-cy="add-device"]').click()
    cy.get('.bh-bg-blue').click()
    cy.wait(1000);
    cy.get('.border-b > :nth-child(2) > a').click()
    cy.wait(1000);
    cy.get('.h-80').should("exist")
  });

  it("Verificar que se pueda voltear la tarjeta en caso de tener mas de 3 componentes solicitados", () => {
    cy.get(':nth-child(3) > .cursor-pointer').click()
    cy.get('.p-5 > :nth-child(4)').should("exist")

  });


})