/**
 * @openapi
 * /scan:
 *   post:
 *     tags: [Scan]
 *     summary: Crear evento de escaneo manual.
 *     description: Permite a un administrador registrar manualmente un evento de escaneo de caja o pallet en el sistema.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - qrCode
 *               - detectedType
 *               - type
 *             properties:
 *               qrCode:
 *                 type: string
 *                 description: Código QR o de barras escaneado de la mercancía.
 *                 example: BOX-QR-12345
 *               detectedType:
 *                 type: string
 *                 enum: [BOX, PALLET]
 *                 description: Tipo de mercancía detectada.
 *                 example: BOX
 *               type:
 *                 type: string
 *                 enum: [ENTRY, EXIT, VERIFY]
 *                 description: Tipo de movimiento de inventario.
 *                 example: ENTRY
 *     responses:
 *       201:
 *         description: Evento de escaneo creado de forma exitosa.
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
 *                   example: evento creado
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: string
 *                   example: success
 *       400:
 *         description: Parámetros inválidos.
 *       401:
 *         description: No autorizado.
 */

/**
 * @openapi
 * /scan/search:
 *   post:
 *     tags: [Scan]
 *     summary: Buscar y filtrar logs de escaneo.
 *     description: Retorna los logs históricos de eventos de escaneo realizados por dispositivos inteligentes o de forma manual, aplicando criterios de filtrado y paginación.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               camera_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la cámara que generó el evento.
 *               detectedType:
 *                 type: string
 *                 enum: [BOX, PALLET]
 *               status:
 *                 type: string
 *                 description: Estado de verificación del evento (ej. SUCCESS, ERROR).
 *               limit:
 *                 type: integer
 *                 default: 10
 *               page:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       201:
 *         description: Eventos encontrados exitosamente.
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
 *                   example: eventos encontrados
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ScanEvent'
 *                     total:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Petición inválida.
 *       401:
 *         description: No autorizado.
 */
