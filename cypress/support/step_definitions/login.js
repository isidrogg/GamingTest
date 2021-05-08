When('Introduzco mis credenciales ok', () => {
    cy.get('#username').type('usuario1');
    cy.get('#password').type('112345');
});

When('Hago click en el boton login', () => {
    cy.get('[type="submit"]').click();
});

When('Relleno el formulario de login ok', () => {
    cy.completarFomularioLogin('usuario1', '112345');
});

When('Relleno el formulario de login ok - fixtures', () => {
    cy.fixture('users').then(data => {
        cy.completarFomularioLogin(data.ok.username, data.ok.password);
    });
});

When('Relleno el formulario de login ko - fixtures', () => {
    cy.fixture('users').then(data => {
        console.log(data.ko);
        cy.completarFomularioLogin(data.ko.username, data.ko.password);
    });
});

Then('El formulario debería estar visible', () => {
    cy.get('#form-login').should('be.visible');
});

Then('El formulario no debería estar visible', () => {
    cy.get('#form-login').should('not.exist');
});

Then('El contador debería estar visible', () => {
    cy.get('[data-cypress="contador"]').should('be.visible');
});

Then('El listado de juegos debería estar visible', () => {
    cy.get('#list-games').should('be.visible');
});

Then('El mensaje de error debería estar visible', () => {
    cy.get('#error').should('be.visible');
});
