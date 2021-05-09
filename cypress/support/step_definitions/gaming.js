import { Before, Given, When } from 'cypress-cucumber-preprocessor/steps';

Before({ tags: '@loginIntercept' }, () => {
    cy.intercept(
        {
            method: "GET",
            url: "**/isidrogg/GamingTest/db**",
        },
        {
            statusCode: 200,
            body: {
                "games": [{
                    "title": "Riding Club Championships",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/93\/thumbnail.jpg",
                    "short_description": "An online competitive horse riding game inspired by traditional equestrian disciplines. ",
                    "genre": "Racing",
                    "platform": "PC (Windows)"
                }, {
                    "title": "Forza Motorsport 6: Apex",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/121\/thumbnail.jpg",
                    "short_description": "A free-to-play MMO racing game that comes from makers of one of the most popular video game racing series ever. ",
                    "genre": "Racing",
                    "platform": "PC (Windows)"
                }, {
                    "title": "Metal War Online: Retribution",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/137\/thumbnail.jpg",
                    "short_description": "A high-speed multiplayer online concept car shooter game with racing elements!",
                    "genre": "Shooter",
                    "platform": "PC (Windows)"
                }, {
                    "title": "Crossout",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/5\/thumbnail.jpg",
                    "short_description": "A post-apocalyptic MMO vehicle combat game! ",
                    "genre": "Shooter",
                    "platform": "PC (Windows)"
                }, {
                    "title": "Heavy Metal Machines",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/83\/thumbnail.jpg",
                    "short_description": "A free-to-play multiplayer vehicular combat game based in a post-apocalyptic world.",
                    "genre": "MOBA",
                    "platform": "PC (Windows)"
                }, {
                    "title": "Transformice",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/179\/thumbnail.jpg",
                    "short_description": "A cute little free-to-play MMO platformer.",
                    "genre": "Fantasy",
                    "platform": "PC (Windows), Web Browser"
                }, {
                    "title": "APB Reloaded",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/258\/thumbnail.jpg",
                    "short_description": "A free to play 3D MMO third person shooter game brought to you by GTA creator.",
                    "genre": "Shooter",
                    "platform": "PC (Windows)"
                }, {
                    "title": "Grand Prix Racing Online",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/351\/thumbnail.jpg",
                    "short_description": "A free-to-play web-based motorsport management game.",
                    "genre": "Strategy",
                    "platform": "Web Browser"
                }, {
                    "title": "Rocket League",
                    "thumbnail": "https:\/\/www.freetogame.com\/g\/474\/thumbnail.jpg",
                    "short_description": "Get your car-soccer gaming on for free with Psyonix\u2019s Rocket League.",
                    "genre": "Sports",
                    "platform": "PC (Windows)"
                }]
            },
        }
    );
    cy.visit('http://localhost:3000/');
    cy.fixture('users').then(data => {
        cy.completarFomularioLogin(data.ok.username, data.ok.password);
    });
});

Before({ tags: '@login' }, () => {
    cy.visit('http://localhost:3000/');
    cy.fixture('users').then(data => {
        cy.completarFomularioLogin(data.ok.username, data.ok.password);
    });
});

Given('Cuando he realizado el login correctamente', () => {
    cy.get('#list-games').should('be.visible');
});

When('Añado juegos al carrito', () => {
    cy.fixture('games').then(data => {
        data.add.forEach(game => {
            cy.get("[data-title=title]")
                .contains(game)
                .as("juego");

            cy.get("@juego").parents('[data-card="game"]').find('[data-logo="add"]').click();
        });
    });
});

Then('Los iconos de añdir desaparecen y aparecen los iconos de eliminar', () => {
    cy.fixture('games').then(data => {
        data.add.forEach(game => {
            cy.get('[data-title="title"]')
                .contains(game)
                .as('juego');

            cy.get('@juego')
                .parents('[data-card="game"]')
                .find('[data-logo="remove"]')
                .should('be.visible')
        });
    });
});

Then('El contador deberia incrementarse', () => {
    cy.get('[data-cypress="contador"] span').should("have.text", 3);
});

