import { Before, When, Given, Then } from 'cypress-cucumber-preprocessor/steps';

const goTo = page => {
    switch (page) {
        case 'Página principal':
            cy.visit('http://localhost:3000/');
            break
        default:
            cy.visit('http://localhost:3000/');
    }
};

Before({ tags: '@login' }, () => cy.visit('http://localhost:3000/'));

Given('Estoy en el login {string}', goTo);

// When('user scrolls to the bottom of the page', site.scrollToBottom);

Then('El formulario de login es visible', () => {
    cy.get('form').should('be.visible');
})
