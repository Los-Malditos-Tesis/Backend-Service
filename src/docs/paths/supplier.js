/**
 * @openapi
 * /suppliers:
 *   post:
 *     tags: [Supplier]
 *     summary: Crear proveedor.
 *     description: Registra un nuevo proveedor en la base de datos de la bodega, configurando información de contacto y códigos de control.
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
 *               - contactName
 *               - phone
 *               - email
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre comercial o razón social.
 *                 example: Distribuidora Central S.A.
 *               code:
 *                 type: string
 *                 description: Código de identificación único.
 *                 example: PROV-001
 *               contactName:
 *                 type: string
 *                 description: Persona de contacto principal.
 *                 example: Carlos Gómez
 *               phone:
 *                 type: string
 *                 description: Teléfono de contacto.
 *                 example: "+503 2200-1122"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico de comunicación.
 *                 example: contacto@central.com
 *               location:
 *                 type: string
 *                 description: Dirección o ubicación física.
 *                 example: San Salvador, El Salvador
 *     responses:
 *       201:
 *         description: Proveedor registrado exitosamente.
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
 *                   example: Proveedores encontrados
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Supplier'
 *       400:
 *         description: Parámetros inválidos o código duplicado.
 *       401:
 *         description: No autorizado.
 */

/**
 * @openapi
 * /suppliers:
 *   get:
 *     tags: [Supplier]
 *     summary: Buscar y listar proveedores.
 *     description: Recupera un listado paginado de los proveedores registrados, permitiendo filtrar por nombre o código.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Elementos por página.
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: page
 *         in: query
 *         required: false
 *         description: Número de página.
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: name
 *         in: query
 *         required: false
 *         description: Filtro por nombre.
 *         schema:
 *           type: string
 *       - name: code
 *         in: query
 *         required: false
 *         description: Filtro por código.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Proveedores listados correctamente.
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
 *                   example: Proveedor registrado exitosamente
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Supplier'
 *                     total:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: No autorizado.
 */

/**
 * @openapi
 * /suppliers/{id}:
 *   put:
 *     tags: [Supplier]
 *     summary: Actualizar proveedor.
 *     description: Actualiza los detalles de un proveedor existente utilizando su identificador ID único.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del proveedor.
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
 *               name:
 *                 type: string
 *                 example: Distribuidora Central Modificada
 *               contactName:
 *                 type: string
 *                 example: Carlos Gómez Jr.
 *               phone:
 *                 type: string
 *                 example: "+503 2200-1122"
 *               email:
 *                 type: string
 *                 format: email
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proveedor actualizado con éxito.
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
 *                   example: Proveedor actualizado exitosamente
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Supplier'
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Proveedor no encontrado.
 */

/**
 * @openapi
 * /suppliers/{id}:
 *   delete:
 *     tags: [Supplier]
 *     summary: Eliminar proveedor.
 *     description: Realiza la eliminación lógica del proveedor por su ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del proveedor a eliminar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Proveedor eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Proveedor no encontrado.
 */
