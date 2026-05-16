import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { deleteById, findAll, findById, findByKeyAndWarehouse, save, update } from "../repositories/config_params_repository.js"
import { AppError } from "../errors/app_error.js";

const configParamsService = "config params service";

export const findByIdConfigParams = serviceHandler(
    configParamsService,
    CODES.CONFIG_PARAMS.NOT_FOUND,
    async (id = "", ctx) => {
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            id
        );

        const configParams = await findById(id, ctx);
        if (!configParams)
            throw new AppError("No se encontro ningun config params con el id: " + id, 404, CODES.CONFIG_PARAMS.NOT_FOUND);

        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            configParams
        );
        return configParams;

    });

export const findByKeyAndWarehouseConfigParams = serviceHandler(
    configParamsService,
    CODES.CONFIG_PARAMS.NOT_FOUND,
    async (key = "", warehouse_id = "", ctx) => {
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            key
        );
        const configParams = await findByKeyAndWarehouse(key, warehouse_id, ctx);
        if (!configParams)
            throw new AppError("No se encontro ningun config params con el key: " + key, 404, CODES.CONFIG_PARAMS.NOT_FOUND);
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            configParams
        );
        return configParams;
    });

export const createConfigParams = serviceHandler(
    configParamsService,
    CODES.CONFIG_PARAMS.NOT_FOUND,
    async (data = {}, ctx) => {
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            data
        );

        const configParams = await findByKey(data.key, ctx);
        if (configParams)
            throw new AppError("Ya existe un config params con el key: " + data.key, 400, CODES.CONFIG_PARAMS.ALREADY_EXISTS);

        const response = await save(data, ctx);

        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            response
        );
        return response;
    });

export const updateConfigParams = serviceHandler(
    configParamsService,
    CODES.CONFIG_PARAMS.NOT_FOUND,
    async (data = {}, ctx) => {
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            data
        );

        const configParams = await findByIdConfigParams(data.id, ctx);
        const updated = await update(data.id, data, ctx);

        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            updated
        );
        return updated;
    }
);

export const findAllConfigParams = serviceHandler(
    configParamsService,
    CODES.CONFIG_PARAMS.NOT_FOUND,
    async (ctx) => {
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            {}
        );

        const configParams = await findAll(ctx);
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            configParams
        )
        return configParams;

    });

export const deleteByIdConfigParams = serviceHandler(
    configParamsService,
    CODES.CONFIG_PARAMS.NOT_FOUND,
    async (id = "", ctx) => {
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            { id }
        );

        const configParams = await findByIdConfigParams(id, ctx);

        const deleted = await deleteById(id, ctx);
        Log.infoCtx(
            ctx,
            configParamsService + consoleKeys.SuccessKey + "deleted",
            consoleKeys.ResponseKey,
            deleted
        )
    });