Feature: Test de la pagina de login

  Scenario: Cómo usuario quiero acceder a la página de login
    Given Cuando he accedido a la "Pagina de Login"
    Then El formulario debería estar visible

  Scenario: Cómo usuairo quiero loguearme correctamente
    Given Cuando he accedido a la "Pagina de Login"
    When Introduzco mis credenciales ok
    And Hago click en el boton login
    Then El formulario no debería estar visible
    And El contador debería estar visible
    And El listado de juegos debería estar visible

  Scenario: Cómo usuairo quiero loguearme correctamente (comando)
    Given Cuando he accedido a la "Pagina de Login"
    When Relleno el formulario de login ok
    Then El formulario no debería estar visible
    And El contador debería estar visible
    And El listado de juegos debería estar visible

  Scenario: Cómo usuairo quiero loguearme correctamente (comando, fixtures)
    Given Cuando he accedido a la "Pagina de Login"
    When Relleno el formulario de login ok - fixtures
    Then El formulario no debería estar visible
    And El contador debería estar visible
    And El listado de juegos debería estar visible

  Scenario: Cómo usuairo quiero loguearme incorrectamente (comando, fixtures)
    Given Cuando he accedido a la "Pagina de Login"
    When Relleno el formulario de login ko - fixtures
    Then El formulario debería estar visible
    And El mensaje de error debería estar visible
