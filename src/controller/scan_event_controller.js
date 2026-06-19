import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import { searchScanEvent } from "../service/scan_event_service.js"

const scanEventController = "scan event controller: ";

/**
 * @openapi
 * /scan:
 *   post:
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
export const createEventController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      scanEventController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "evento creado",
      "success",
    );
  } catch (e) {
    Log.errorCtx(req.ctx, scanEventController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, scanEventController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /scan/search:
 *   post:
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
export const searchScanEventController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      scanEventController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );

    const response = await searchScanEvent(
      req.body,
      req.body.limit,
      req.body.page,
      req.ctx,
    )

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "eventos encontrados",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, scanEventController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, scanEventController + consoleKeys.FinishKey);
  }
};