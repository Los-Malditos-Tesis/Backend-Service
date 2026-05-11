import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes";
import { generalResponse } from "../utils/handler/response_handler.js";
import { createConfigParams, findAllConfigParams, updateConfigParams } from "../service/config_params_service.js"

const configParamsController = "config params controller: ";

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
        )
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

