import { Given } from 'cypress-cucumber-preprocessor/steps';

const goTo = page => {
    switch (page) {
        case 'Página de login':
            cy.visit('http://localhost:3000/');
            break
        default:
            cy.visit('http://localhost:3000/');
    }
};

Given('Cuando he accedido a la {string}', goTo);
