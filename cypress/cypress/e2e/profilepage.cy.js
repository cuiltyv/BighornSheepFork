describe("Perfil", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/BighornSheep/");
    });

    it("debería renderizar el componente Tabs", () => {
        cy.get(".w-[400px]").should("exist");
    });

    it("debería renderizar los disparadores de pestañas", () => {
        cy.get(".grid-cols-2 > :nth-child(1)").should("have.text", "Cuenta");
        cy.get(".grid-cols-2 > :nth-child(2)").should("have.text", "Contraseña");
    });

    it("debería mostrar el contenido de la pestaña de cuenta por defecto", () => {
        cy.get('[value="account"]').should("be.visible");
        cy.get('[value="password"]').should("not.be.visible");
    });

    it("debería cambiar a la pestaña de contraseña cuando se hace clic", () => {
        cy.get(".grid-cols-2 > :nth-child(2)").click();
        cy.get('[value="account"]').should("not.be.visible");
        cy.get('[value="password"]').should("be.visible");
    });

    it("debería mostrar el nombre de usuario en la pestaña de cuenta", () => {
        cy.get('[value="account"]').contains("Bienvenido Loading...");
    });

    it("debería permitir cambiar los valores de entrada", () => {
        cy.get("#nombre").clear().type("John Doe");
        cy.get("#apellidos").clear().type("Smith");
        cy.get("#carrera").clear().type("Ciencias de la Computación");
    });

    it("debería deshabilitar el campo de entrada de matrícula", () => {
        cy.get("#matricula").should("be.disabled");
    });

    it("debería mostrar un botón para guardar cambios en la pestaña de cuenta", () => {
        cy.get('[value="account"]').contains("Guardar Cambios").should("exist");
    });

    it("debería mostrar un botón para guardar contraseña en la pestaña de contraseña", () => {
        cy.get(".grid-cols-2 > :nth-child(2)").click();
        cy.get('[value="password"]').contains("Guardar Contraseña").should("exist");
    });
});
