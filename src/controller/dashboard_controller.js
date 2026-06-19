import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import { getDashboardStats } from "../service/dashboard_service.js";

const dashboardController = "dashboard controller: ";

/**
 * @openapi
 * /dashboard:
 *   get:
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
export const getDashboardController = async (req, res, next) => {
  try {
    const ctx = req.ctx;
    Log.infoCtx(ctx, dashboardController + consoleKeys.StartKey);
    const result = await getDashboardStats(ctx);
    generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Dashboard stats retrieved successfully",
      result,
    );
  } catch (error) {
    Log.errorCtx(req.ctx, dashboardController + consoleKeys.ErrorKey, error);
    return next(error);
  } finally {
    Log.infoCtx(req.ctx, dashboardController + consoleKeys.FinishKey);
  }
};

