import {
  updateLocation,
  deleteLocation,
  searchLocations,
  createLocation,
} from "../service/location_service.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const locationController = "location controller: ";

/**
 * @openapi
 * /location/create:
 *   post:
 *     summary: Crear ubicación/zona.
 *     description: Registra una nueva zona o ubicación de almacenamiento dentro de una bodega para organizar y segmentar la mercadería.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - zone
 *               - category
 *               - warehouse_id
 *             properties:
 *               zone:
 *                 type: string
 *                 description: Nombre o código físico de la zona.
 *                 example: ZONA-A1
 *               category:
 *                 type: string
 *                 description: Tipo o categoría de la zona (ej. Seco, Refrigerado).
 *                 example: Refrigerado
 *               warehouse_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la bodega asociada.
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *     responses:
 *       201:
 *         description: Ubicación creada exitosamente.
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
 *                   example: zona creada
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Location'
 *       400:
 *         description: Validación fallida o la zona ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: No autorizado.
 */
export const createLocationController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { body: req.body },
    );

    const resp = await createLocation(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(res, 201, CODES.SUCCESS.OK, "zona creada", resp);
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /location/search:
 *   post:
 *     summary: Buscar y listar ubicaciones.
 *     description: Permite buscar y listar ubicaciones aplicando filtros como bodega, zona o categoría con paginación integrada.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 description: Filtro parcial por nombre de zona.
 *                 example: ZONA
 *               category:
 *                 type: string
 *                 description: Filtro por categoría.
 *                 example: Refrigerado
 *               warehouse_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la bodega.
 *               limit:
 *                 type: integer
 *                 description: Límite de resultados por página.
 *                 default: 10
 *               page:
 *                 type: integer
 *                 description: Página a consultar.
 *                 default: 1
 *     responses:
 *       201:
 *         description: Búsqueda realizada con éxito.
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
 *                   example: zona encontrada
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Location'
 *                     total:
 *                       type: integer
 *                       example: 3
 *       400:
 *         description: Filtros inválidos.
 *       401:
 *         description: No autorizado.
 */
export const searchLocationController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { body: req.body },
    );

    const resp = await searchLocations(
      req.body,
      req.body.limit,
      req.body.page,
      req.ctx,
    );

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(res, 201, CODES.SUCCESS.OK, "zona encontrada", resp);
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /location/{id}:
 *   put:
 *     summary: Actualizar ubicación.
 *     description: Actualiza los atributos de una ubicación física específica (zona, categoría) mediante su ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único de la ubicación.
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
 *               zone:
 *                 type: string
 *                 example: ZONA-A1-MOD
 *               category:
 *                 type: string
 *                 example: Seco
 *     responses:
 *       201:
 *         description: Ubicación actualizada correctamente.
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
 *                   example: zona actualizada
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Location'
 *       400:
 *         description: Entrada inválida.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Ubicación no encontrada.
 */
export const updateLocationController = async (req, res, next) => {
  try {
    const locationData = req.body;
    const { id } = req.params;

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { ...locationData, id },
    );

    const resp = await updateLocation({ ...locationData, id }, req.ctx);

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "zona actualizada",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /location/{id}:
 *   delete:
 *     summary: Eliminar ubicación.
 *     description: Realiza la eliminación lógica de una zona o ubicación.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la ubicación a eliminar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Ubicación eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Ubicación no encontrada.
 */
export const deleteLocationController = async (req, res, next) => {
  try {
    const { id } = req.params;
    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { id },
    );

    const resp = await deleteLocation(id, req.ctx);

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(res, 201, CODES.SUCCESS.OK, "Zona eliminada", resp);
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};

