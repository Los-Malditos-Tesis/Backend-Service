import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import {
  createStore,
  findStoreByCode,
  removeStore,
  searchStores,
  updateStore,
} from "../service/store_service.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const storeController = "store controller: ";

/**
 * @openapi
 * /store/find-by-code/{code}:
 *   get:
 *     tags: [Store]
 *     summary: Obtener sucursal por código.
 *     description: Recupera la información detallada de una sucursal de destino del inventario utilizando su código único.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: code
 *         in: path
 *         required: true
 *         description: Código interno único de la tienda.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tienda encontrada con éxito.
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
 *                   example: Store find successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Store'
 *       400:
 *         description: Petición incorrecta o código inválido.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Tienda no encontrada.
 */
export const findStoreByCodeController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.params,
    );
    const response = await findStoreByCode(req.params.code, req.ctx);

    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Store find successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /store/create:
 *   post:
 *     tags: [Store]
 *     summary: Crear una nueva sucursal.
 *     description: Registra una nueva sucursal o tienda externa de destino en el catálogo de despachos.
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
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre comercial de la tienda.
 *                 example: Sucursal Escalón
 *               code:
 *                 type: string
 *                 description: Código único para la tienda.
 *                 example: ST-002
 *               address:
 *                 type: string
 *                 description: Dirección de entrega.
 *                 example: Centro Comercial Galerías, Local 2B
     responses:
 *       201:
 *         description: Tienda creada exitosamente.
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
 *                   example: Store created successfully
 *                 code:
 *                   type: string
 *                   example: CREATED
 *                 data:
 *                   $ref: '#/components/schemas/Store'
 *       400:
 *         description: Parámetros inválidos o código ya registrado.
 *       401:
 *         description: No autorizado.
 */
export const createStoreController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await createStore(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "Store created successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /store/update:
 *   put:
 *     tags: [Store]
 *     summary: Actualizar una sucursal.
 *     description: Actualiza los detalles operacionales y de ubicación física de una tienda usando su ID único.
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
 *                 description: ID de la tienda a actualizar.
 *               name:
 *                 type: string
 *                 example: Sucursal Escalón Modificada
 *               code:
 *                 type: string
 *                 example: ST-002
 *               address:
 *                 type: string
 *                 example: Nueva Dirección 456
 *     responses:
 *       200:
 *         description: Tienda actualizada exitosamente.
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
 *                   example: Store updated successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Store'
 *       400:
 *         description: Parámetros inválidos.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Tienda no encontrada.
 */
export const updateStoreController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await updateStore(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Store updated successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /store/delete/{id}:
 *   delete:
 *     tags: [Store]
 *     summary: Eliminar una sucursal.
 *     description: Realiza la eliminación lógica de una sucursal del sistema mediante su ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único de la tienda a eliminar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tienda eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Tienda no encontrada.
 */
export const deleteStoreController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.params,
    );
    const response = await removeStore(req.params.id, req.ctx);

    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Store deleted successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /store/search:
 *   post:
 *     tags: [Store]
 *     summary: Buscar y listar sucursales.
 *     description: Lista y busca tiendas de destino aplicando filtros y soportando paginación.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               limit:
 *                 type: integer
 *                 default: 10
 *               page:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda obtenidos correctamente.
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
 *                   example: Store search successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Store'
 *                     total:
 *                       type: integer
 *                       example: 2
 *       401:
 *         description: No autorizado.
 */
export const searchStoresController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await searchStores(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      storeController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Store search successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey);
  }
};
