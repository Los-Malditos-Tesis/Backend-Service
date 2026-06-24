/**
 * @openapi
 * /order:
 *   post:
 *     tags: [Order]
 *     summary: Crear una nueva orden de inventario.
 *     description: Registra una orden de entrada (IN) o salida (OUT) de mercancía de la bodega, especificando el producto, tipo de unidad (caja/pallet) y cantidades.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - unit_type
 *               - total_quantity
 *               - product_id
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [IN, OUT]
 *                 description: Tipo de orden.
 *                 example: IN
 *               unit_type:
 *                 type: string
 *                 enum: [BOX, PALLET]
 *                 description: Unidad de medida de la orden.
 *                 example: BOX
 *               total_quantity:
 *                 type: integer
 *                 description: Cantidad total a procesar.
 *                 example: 50
 *               product_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID del producto asociado.
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *               origin_warehouse_id:
 *                 type: string
 *                 format: uuid
 *                 description: Bodega de origen (opcional/para transferencias).
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12
 *               destination_warehouse_id:
 *                 type: string
 *                 format: uuid
 *                 description: Bodega de destino (opcional).
 *               store_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la tienda de destino (opcional).
 *     responses:
 *       201:
 *         description: Orden creada exitosamente.
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
 *                   example: Orden creada exitosamente
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Petición inválida o error de validación.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: No autorizado.
 */

/**
 * @openapi
 * /order:
 *   get:
 *     tags: [Order]
 *     summary: Buscar y listar órdenes.
 *     description: Recupera una lista paginada de órdenes filtrando opcionalmente por tipo, estado, origen o destino.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: type
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [IN, OUT]
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: origin_warehouse_id
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: destination_warehouse_id
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       201:
 *         description: Listado de órdenes recuperado.
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
 *                   example: Ordenes encontradas
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Order'
 *                     total:
 *                       type: integer
 *                       example: 4
 *       400:
 *         description: Parámetros inválidos.
 *       401:
 *         description: No autorizado.
 */

/**
 * @openapi
 * /order/{id}:
 *   put:
 *     tags: [Order]
 *     summary: Actualizar orden.
 *     description: Actualiza los detalles operacionales (tipo, unidad) de una orden específica identificada por su ID único.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden a actualizar.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [IN, OUT]
 *               unit_type:
 *                 type: string
 *                 enum: [BOX, PALLET]
 *     responses:
 *       201:
 *         description: Orden actualizada exitosamente.
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
 *                   example: Ordenes actualizda exitosamente
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Parámetros inválidos.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Orden no encontrada.
 */

/**
 * @openapi
 * /order/{id}:
 *   patch:
 *     tags: [Order]
 *     summary: Cambiar estado de orden.
 *     description: Actualiza manualmente el estado de una orden de inventario (ej. a PENDING, IN_PROGRESS, COMPLETED, CANCELLED).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden a actualizar.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: COMPLETED
 *     responses:
 *       201:
 *         description: Estado de orden actualizado con éxito.
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
 *                   example: Ordenes actualizada exitosamente
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Estado no válido.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Orden no encontrada.
 */

/**
 * @openapi
 * /order/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Eliminar orden.
 *     description: Elimina lógicamente una orden del sistema por su ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden a eliminar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Orden eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Orden no encontrada.
 */
