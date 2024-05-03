describe("Probar la funcionalidad de login", () => {
    beforeEach(() => {
      cy.viewport(1366, 768)
      cy.visit("http://localhost:5173/BighornSheep/");
      cy.get("#username").type("A555");
        cy.get("#password").type("Cuilty1!");
        cy.get('.flex.items-center > .inline-flex').click();
        cy.wait(1000);
    });

    it("probar que abra bien el modal", () => {
      
      cy.get(':nth-child(1) > .react-card-flip > .react-card-flipper > .react-card-front > .min-h-96 > button > .flex').click()
      cy.get("[data-cy='nombre-sala']").should("exist")
      cy.get("[data-cy='imagen-sala']").should("exist")
    });

    it("probar que el calendario cambie fecha y hora", () => {
      cy.get(':nth-child(1) > .react-card-flip > .react-card-flipper > .react-card-front > .min-h-96 > button > .flex').click()
      cy.get("[data-cy='next-form-button']").click()
      cy.get(":nth-child(12) > [data-cy='day-button']").click()
    });

    it("probar form con personas agregadas", () => {
      cy.get(':nth-child(1) > .react-card-flip > .react-card-flipper > .react-card-front > .min-h-96 > button > .flex').click()
      cy.get(":nth-child(12) > [data-cy='day-button']").click()
      cy.get("[data-cy='hour-selector']").select(3)
      cy.get("[data-cy='matricula-input']").type("A01351989")
      cy.get("[data-cy='nombre-input']").type("Emilio De Gyves")
      cy.get("[data-cy='enviar-button']").click()
      cy.wait(1000);

    });

    it("probar agregar mas personas a la reservacion", () => {
      cy.get(':nth-child(1) > .react-card-flip > .react-card-flipper > .react-card-front > .min-h-96 > button > .flex').click()
      cy.get(":nth-child(12) > [data-cy='day-button']").click()
      cy.get("[data-cy='hour-selector']").select(3)
      cy.get("[data-cy='enviar-button']").click()
    });

});

