import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import {
  dispatchMerchandiseService,
  inventoryAutomationService,
  registerMerchandiseService,
  searchProductInZones,
} from "../service/automation_service.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const automationController = "automation controller: ";

/**
 * @openapi
 * /automation/register/merchandise:
 *   post:
 *     tags: [Automation]
 *     summary: Registrar ingreso de mercancía por cámara.
 *     description: Registra el ingreso automático de una caja o pallet cuando es capturado por una cámara de escaneo IoT autorizada.
 *     security:
 *       - CameraAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gs1Code
 *             properties:
 *               gs1Code:
 *                 type: string
 *                 description: Código de barras GS1 escaneado de la mercancía.
 *                 example: "010761234567890010ABC123"
 *     responses:
 *       201:
 *         description: Mercancía registrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       400:
 *         description: Código GS1 inválido o error en la petición.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Autenticación de cámara fallida (x-api-key incorrecta).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const registerMerchandiseController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await registerMerchandiseService(
      req.body.gs1Code,
      req.camera,
      req.ctx,
    );
    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Merchandise registered successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, automationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, automationController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /automation/dispatch/merchandise:
 *   post:
 *     tags: [Automation]
 *     summary: Registrar despacho de mercancía por cámara.
 *     description: Registra la salida automática o despacho de una caja o pallet cuando es escaneado por una cámara de salida IoT autorizada.
 *     security:
 *       - CameraAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gs1Code
 *             properties:
 *               gs1Code:
 *                 type: string
 *                 description: Código de barras GS1 de la mercancía despachada.
 *                 example: "010761234567890010ABC123"
 *     responses:
 *       201:
 *         description: Salida de mercancía registrada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       400:
 *         description: Código GS1 inválido o mercancía no encontrada para despacho.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Autenticación de cámara fallida (x-api-key incorrecta).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const dispatchMerchandiseController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await dispatchMerchandiseService(
      req.body.gs1Code,
      req.camera,
      req.ctx,
    );
    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Merchandise dispatched successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, automationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, automationController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /automation:
 *   post:
 *     tags: [Automation]
 *     summary: Buscar ubicación de productos en zonas.
 *     description: Identifica las zonas físicas y ubicaciones detalladas dentro de las bodegas donde se almacenan unidades del producto consultado.
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
 *             properties:
 *               code:
 *                 type: string
 *                 description: Código de producto a buscar.
 *                 example: PROD-1002
 *     responses:
 *       201:
 *         description: Búsqueda de ubicaciones realizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       400:
 *         description: Petición inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: No autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const searchProductInZonesController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );

    const resp = await searchProductInZones(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Producto encontrado con exito",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, automationController + consoleKeys.FailKey, e);
    return next(e);
  } finally {
    Log.infoCtx(req.ctx, automationController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /automation/inventory/merchandise:
 *   post:
 *     tags: [Automation]
 *     summary: Verificar mercancía en inventario por cámara.
 *     description: Realiza el escaneo y validación de presencia/estado de una caja o pallet mediante cámaras inteligentes en tiempo real para control de auditoría interna.
 *     security:
 *       - CameraAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gs1Code
 *             properties:
 *               gs1Code:
 *                 type: string
 *                 description: Código GS1 de la caja o pallet a verificar.
 *                 example: "010761234567890010ABC123"
 *     responses:
 *       201:
 *         description: Mercancía verificada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       400:
 *         description: Parámetros incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Autenticación de cámara fallida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const inventoryController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );

    const response = await inventoryAutomationService(
      req.body.gs1Code,
      req.camera,
      req.ctx,
    );

    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Merchandise registered successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, automationController + consoleKeys.FailKey, e);
    return next(e);
  } finally {
    Log.infoCtx(req.ctx, automationController + consoleKeys.FinishKey);
  }
};