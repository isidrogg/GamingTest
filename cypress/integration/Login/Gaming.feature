Feature: Test pagina de juegos

  @login
  Scenario: Cómo usuairo quiero añadir y quitar juegos al carrito
    Given Cuando he realizado el login correctamente
    When Añado juegos al carrito
    Then Los iconos de añdir desaparecen y aparecen los iconos de eliminar
    And El contador deberia incrementarse

  @loginIntercept
  Scenario: Cómo usuairo quiero añadir y quitar juegos al carrito
    Given Cuando he realizado el login correctamente
    When Añado juegos al carrito
    Then Los iconos de añdir desaparecen y aparecen los iconos de eliminar
    And El contador deberia incrementarse
