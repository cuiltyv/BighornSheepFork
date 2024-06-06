describe("Probar la funcionalidad de login", () => {
  beforeEach(() => {
    cy.visit("https://dreamlabs.cfd/");
  });

  it("Llleva a inicio de sesión", () => {
    cy.get(".flex-col > :nth-child(1) > .flex").click();
    cy.get(
      ":nth-child(2) > .react-card-flip > .react-card-flipper > .react-card-front > .min-h-96 > .cursor-pointer"
    ).click();
    cy.get("#username").type("A01411863");
    cy.get("#password").type("Shakira123!");
    cy.get(".flex.items-center > .inline-flex").click();

    cy.get(".flex-col > :nth-child(1) > .flex").click();
    cy.get(
      ":nth-child(2) > .react-card-flip > .react-card-flipper > .react-card-front > .min-h-96 > .cursor-pointer"
    ).click();
  });
});
