import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import {
  createConfigParams,
  findAllConfigParams,
  updateConfigParams,
  deleteByIdConfigParams,
  findByIdConfigParams,
} from "../service/config_params_service.js";

const configParamsController = "config params controller: ";

/**
 * @openapi
 * /config-params/create:
 *   post:
 *     summary: Crear parámetro de configuración.
 *     description: Registra un nuevo parámetro de configuración para el comportamiento operacional de una bodega específica (por ejemplo, el modo de escaneo).
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - value
 *               - warehouse_id
 *             properties:
 *               key:
 *                 type: string
 *                 description: Clave del parámetro (ej. SCANNING_MODE).
 *                 example: SCANNING_MODE
 *               value:
 *                 type: string
 *                 description: Valor asignado al parámetro.
 *                 example: ENTRY
 *               warehouse_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la bodega a aplicar la configuración.
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *     responses:
 *       201:
 *         description: Configuración creada con éxito.
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
 *                   example: Config params created successfully
 *                 code:
 *                   type: string
 *                   example: CREATED
 *                 data:
 *                   $ref: '#/components/schemas/ConfigParams'
 *       400:
 *         description: Parámetros inválidos o configuración ya existente.
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
 *       403:
 *         description: Acceso prohibido para este rol.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const createConfigParamsController = async (req, res, next) => {
    try {
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            req.body
        );
        const response = await createConfigParams(req.body, req.ctx);

        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            response
        );

        return generalResponse(
            res,
            201,
            CODES.SUCCESS.CREATED,
            "Config params created successfully",
            response
        )
    } catch (error) {
        Log.errorCtx(req.ctx, configParamsController + consoleKeys.FailKey, error);
        return next(error);
    } finally {
        Log.infoCtx(req.ctx, configParamsController + consoleKeys.FinishKey);
    }
}

/**
 * @openapi
 * /config-params/{id}:
 *   put:
 *     summary: Actualizar parámetro de configuración.
 *     description: Actualiza los valores de una configuración del sistema previamente registrada mediante su identificador UUID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identificador de la configuración a actualizar.
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
 *               - id
 *               - key
 *               - value
 *               - warehouse_id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID único de la configuración.
 *                 example: c51b1458-7e3f-4279-b1d5-2e65c02934bd
 *               key:
 *                 type: string
 *                 example: SCANNING_MODE
 *               value:
 *                 type: string
 *                 example: EXIT
 *               warehouse_id:
 *                 type: string
 *                 format: uuid
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *     responses:
 *       200:
 *         description: Configuración actualizada exitosamente.
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
 *                   example: Config params updated successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/ConfigParams'
 *       400:
 *         description: Petición inválida o error de validación.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Prohibido.
 *       404:
 *         description: No se encontró la configuración solicitada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const updateConfigParamsController = async (req, res, next) => {
    try {
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            req.body
        );
        const response = await updateConfigParams(req.body, req.ctx);
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            response
        );
        return generalResponse(
            res,
            200,
            CODES.SUCCESS.OK,
            "Config params updated successfully",
            response
        );
    }
    catch (e) {
        Log.errorCtx(req.ctx, configParamsController + consoleKeys.FailKey, e);
        return next(e);
    }
    finally {
        Log.infoCtx(req.ctx, configParamsController + consoleKeys.FinishKey);
    }
}

/**
 * @openapi
 * /config-params:
 *   get:
 *     summary: Listar parámetros de configuración.
 *     description: Recupera la lista completa de parámetros de configuración global e interna del sistema.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de configuraciones recuperada.
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
 *                   example: Config params found successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ConfigParams'
 *       401:
 *         description: No autorizado.
 */
export const findAllConfigParamsController = async (req, res, next) => {
    try {
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            {}
        );
        const response = await findAllConfigParams(req.ctx);
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            response
        );
        return generalResponse(
            res,
            200,
            CODES.SUCCESS.OK,
            "Config params found successfully",
            response
        );
    }
    catch (e) {
        Log.errorCtx(
            req.ctx,
            configParamsController + consoleKeys.FailKey,
            e
        );
        return next(e);
    }
    finally {
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.FinishKey
        )
    }
}

/**
 * @openapi
 * /config-params/{id}:
 *   get:
 *     summary: Obtener parámetro de configuración por ID.
 *     description: Recupera los detalles de un parámetro de configuración específico usando su ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del parámetro de configuración.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Configuración encontrada exitosamente.
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
 *                   example: Config params found successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/ConfigParams'
 *       400:
 *         description: ID suministrado no es un UUID válido.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: No se encontró la configuración.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const findByIdConfigParamsController = async (req, res, next) => {
    try {
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            req.params
        );
        const response = await findByIdConfigParams(req.params.id, req.ctx);
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            response
        );
        return generalResponse(
            res,
            200,
            CODES.SUCCESS.OK,
            "Config params found successfully",
            response
        );
    }
    catch (e) {
        Log.errorCtx(
            req.ctx,
            configParamsController + consoleKeys.FailKey,
            e
        );
        return next(e);
    }
    finally {
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.FinishKey
        )
    }
}

/**
 * @openapi
 * /config-params/{id}:
 *   delete:
 *     summary: Eliminar parámetro de configuración.
 *     description: Elimina un parámetro de configuración mediante su ID único.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del parámetro de configuración a eliminar.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Configuración eliminada exitosamente.
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
 *                   example: Config params deleted successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: ID inválido.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso prohibido.
 *       404:
 *         description: No se encontró la configuración a eliminar.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const deleteByIdConfigParamsController = async (req, res, next) => {
    try {
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            req.params
        );
        const response = await deleteByIdConfigParams(req.params.id, req.ctx);
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey
        );
        return generalResponse(
            res,
            200,
            CODES.SUCCESS.OK,
            "Config params deleted successfully",
            response
        );
    }
    catch (e) {
        Log.errorCtx(
            req.ctx,
            configParamsController + consoleKeys.FailKey,
            e
        );
        return next(e);
    }
    finally {
        Log.infoCtx(
            req.ctx,
            configParamsController + consoleKeys.FinishKey
        )
    }
}


