/**
 * @openapi
 * /device/register:
 *   post:
 *     tags: [Device]
 *     summary: Registrar y vincular una cámara.
 *     description: Registra una nueva cámara inteligente en el sistema, vinculándola a una ubicación física específica para capturar eventos de escaneo de mercancías.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - location_id
 *             properties:
 *               code:
 *                 type: string
 *                 description: Código único para la cámara.
 *                 example: CAM-001
 *               location_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la ubicación asignada.
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *     responses:
 *       201:
 *         description: Dispositivo registrado exitosamente.
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
 *                   example: Dispositivo registrado y vinculado correctamente
 *                 code:
 *                   type: string
 *                   example: CREATED
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     code:
 *                       type: string
 *                     api_key:
 *                       type: string
 *                       description: Clave API generada para que la cámara se autentique.
 *                       example: API_KEY_12345...
 *                     location_id:
 *                       type: string
 *                       format: uuid
 *       400:
 *         description: Parámetros inválidos.
 *       401:
 *         description: No autorizado.
 */

/**
 * @openapi
 * /device/search:
 *   get:
 *     tags: [Device]
 *     summary: Buscar y listar cámaras.
 *     description: Retorna una lista paginada de cámaras registradas en el sistema, permitiendo filtrar por código o ubicación física.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Número de página para la paginación.
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Cantidad de elementos por página.
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: location_id
 *         in: query
 *         required: false
 *         description: ID de ubicación para filtrar.
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: code
 *         in: query
 *         required: false
 *         description: Código o prefijo de cámara para filtrar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Listado obtenido exitosamente.
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
 *                   example: Listado de cámaras obtenido correctamente
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Camera'
 *                     total:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: Parámetros incorrectos en la consulta.
 *       401:
 *         description: No autorizado.
 */

/**
 * @openapi
 * /device/{id}:
 *   put:
 *     tags: [Device]
 *     summary: Actualizar cámara.
 *     description: Actualiza los detalles de configuración o vinculación de ubicación de una cámara inteligente identificada por su ID único.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cámara a actualizar.
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
 *               code:
 *                 type: string
 *                 example: CAM-001-MOD
 *               location_id:
 *                 type: string
 *                 format: uuid
 *                 example: b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12
 *     responses:
 *       200:
 *         description: Cámara actualizada con éxito.
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
 *                   example: Cámara actualizada correctamente
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Camera'
 *       400:
 *         description: Petición incorrecta o validación fallida.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Cámara no encontrada.
 */

/**
 * @openapi
 * /device/{id}:
 *   delete:
 *     tags: [Device]
 *     summary: Eliminar cámara.
 *     description: Elimina lógicamente una cámara del sistema por su ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cámara a eliminar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Cámara eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Cámara no encontrada.
 */

/**
 * @openapi
 * /device/{id}/status:
 *   patch:
 *     tags: [Device]
 *     summary: Activar/desactivar cámara.
 *     description: Cambia el estado operativo de la cámara inteligente de activo a inactivo o viceversa.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cámara a modificar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Estado de cámara actualizado correctamente.
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
 *                   example: Estado de cámara actualizado correctamente
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Camera'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Cámara no encontrada.
 */
