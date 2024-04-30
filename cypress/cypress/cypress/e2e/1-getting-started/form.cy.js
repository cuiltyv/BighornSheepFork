describe("Probar la funcionalidad de login", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/BighornSheep/");
      cy.get("#username").type("A555");
        cy.get("#password").type("Cuilty1!");
        cy.get(".my-3").click();
    });


    it("probar que abra bien el modal", () => {
      cy.get(':nth-child(2) > button > .flex').click()
    });
/*
    it("probar que el calendario cambie de mes correctamente", () => {

    });

    it("probar que pueda seleccionar otra fecha y hora", () => {

    });

    it("probar agregar mas personas a la reservacion", () => {

    });
    */
});

