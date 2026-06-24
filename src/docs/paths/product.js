/**
 * @openapi
 * /product/create:
 *   post:
 *     tags: [Product]
 *     summary: Crear un nuevo producto.
 *     description: Registra un nuevo producto en el catálogo general de inventarios, validando el SKU, código y la existencia del proveedor.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - category
 *               - sku
 *               - supplier_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre comercial del producto.
 *                 example: Caja de Leche Deslactosada 1L
 *               code:
 *                 type: string
 *                 description: Código de barras único o de sistema.
 *                 example: PROD-1002
 *               category:
 *                 type: string
 *                 description: Categoría del producto.
 *                 example: Lácteos
 *               sku:
 *                 type: string
 *                 description: Stock Keeping Unit único.
 *                 example: SKU-MILK-001
 *               supplier_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID del proveedor del producto.
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *     responses:
 *       201:
 *         description: Producto creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product created successfully
 *                 code:
 *                   type: string
 *                   example: CREATED
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validación incorrecta o el SKU/Código ya está registrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Proveedor no encontrado.
 */

/**
 * @openapi
 * /product/search:
 *   post:
 *     tags: [Product]
 *     summary: Buscar y listar productos.
 *     description: Recupera una lista filtrada y paginada de productos del catálogo general, permitiendo filtrar por código, SKU, nombre, categoría, proveedor o bodega de almacenamiento.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               warehouse_id:
 *                 type: string
 *                 format: uuid
 *                 description: Opcional. ID de la bodega para filtrar productos con existencias.
 *               name:
 *                 type: string
 *                 description: Nombre o fragmento del nombre.
 *               code:
 *                 type: string
 *                 description: Código de producto.
 *               category:
 *                 type: string
 *                 description: Categoría del producto.
 *               sku:
 *                 type: string
 *                 description: SKU del producto.
 *               supplier_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID del proveedor.
 *               limit:
 *                 type: integer
 *                 default: 10
 *               page:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product search successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     total:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Parámetros inválidos.
 *       401:
 *         description: No autorizado.
 */

/**
 * @openapi
 * /product/update:
 *   put:
 *     tags: [Product]
 *     summary: Actualizar un producto.
 *     description: Actualiza los detalles del catálogo para un producto existente utilizando su ID único.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID único del producto a actualizar.
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *               name:
 *                 type: string
 *                 example: Caja de Leche Deslactosada 1L Modificada
 *               code:
 *                 type: string
 *                 example: PROD-1002-B
 *               category:
 *                 type: string
 *                 example: Lácteos Frescos
 *               sku:
 *                 type: string
 *                 example: SKU-MILK-001-B
 *               supplier_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product updated successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validación fallida o SKU/Código duplicado.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Producto o proveedor no encontrados.
 */

/**
 * @openapi
 * /product/delete/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Eliminar un producto.
 *     description: Elimina lógicamente un producto del catálogo por su ID, siempre y cuando no existan unidades en stock dentro del inventario.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del producto a eliminar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       400:
 *         description: No se puede eliminar el producto porque tiene existencias activas en stock.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Producto no encontrado.
 */

/**
 * @openapi
 * /product/find-by-id/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Obtener producto por ID.
 *     description: Recupera la información detallada de un producto específico mediante su ID único.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del producto a recuperar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Producto encontrado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product get successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: ID no es un UUID válido.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Producto no encontrado.
 */
