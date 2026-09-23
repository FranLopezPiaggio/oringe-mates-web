Feature: Carrito de compras y Checkout por WhatsApp
  Como usuario de la tienda Origen Mates
  Quiero añadir productos a mi bolsa de compras, modificar cantidades y persistir mis elecciones
  Para poder enviar mi pedido ordenado y detallado por WhatsApp

  Scenario: Añadir un producto por primera vez
    Given el carrito de compras está vacío
    When el usuario hace clic en "Añadir" en el producto "Mate Imperial Calabaza" con precio 45000
    Then el carrito debe contener 1 item con cantidad 1
    And el subtotal debe ser $45.000
    And el Drawer lateral del carrito debe abrirse automáticamente

  Scenario: Incrementar cantidad de un producto ya existente
    Given el carrito contiene 1 unidad de "Mate Imperial Calabaza"
    When el usuario vuelve a añadir "Mate Imperial Calabaza"
    Then la cantidad de "Mate Imperial Calabaza" debe ser 2
    And la lista de items no debe duplicar el producto
    And el subtotal debe ser $90.000

  Scenario: Persistencia en recarga de página
    Given el carrito contiene 2 unidades de "Mate Imperial Calabaza"
    When la página se recarga o se monta de nuevo en el cliente
    Then el carrito debe rehidratarse desde "localStorage" con los mismos 2 items
    And el contador del Navbar debe mostrar 2

  Scenario: Generación correcta de enlace a WhatsApp con datos del cliente
    Given el carrito contiene productos con subtotal $45.000
    When el usuario completa el formulario con:
      | nombre    | Juan Pérez              |
      | telefono  | +54 9 11 2345-6789      |
      | direccion | San Martín 450, Posadas |
    And hace clic en "Enviar Pedido por WhatsApp"
    Then se debe generar una URL válida hacia "https://wa.me/..."
    And el parámetro "text" debe estar correctamente codificado (URL-encoded)
    And debe incluir el número de orden, nombre, dirección y detalle de productos