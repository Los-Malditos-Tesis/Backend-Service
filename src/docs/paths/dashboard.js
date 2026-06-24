/**
 * @openapi
 * /dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Obtener estadísticas del dashboard.
 *     description: Retorna estadísticas operativas consolidadas sobre el stock total de mercancías, volumen de órdenes en procesamiento, alertas y estado de dispositivos IoT.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas recuperadas exitosamente.
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
 *                   example: Dashboard stats retrieved successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalProducts:
 *                       type: integer
 *                       example: 154
 *                     activeOrders:
 *                       type: integer
 *                       example: 12
 *                     connectedCameras:
 *                       type: integer
 *                       example: 5
 *                     recentScanAlerts:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Token inválido o no suministrado.
 *       403:
 *         description: Requiere rol ADMIN o SUPERADMIN.
 */
