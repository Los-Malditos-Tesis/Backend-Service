import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { createStore, findStoreByCode, removeStore, searchStores, updateStore } from "../service/store_service.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const storeController = "store controller: ";

export const findStoreByCodeController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, storeController + consoleKeys.StartKey, consoleKeys.RequestKey, req.params)
        const response = await findStoreByCode(req.params.code, req.ctx);

        Log.infoCtx(req.ctx, storeController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Store find successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey)
    }
}

export const createStoreController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, storeController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body)
        const response = await createStore(req.body, req.ctx);

        Log.infoCtx(req.ctx, storeController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 201, CODES.SUCCESS.CREATED, 'Store created successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey)
    }
}

export const updateStoreController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, storeController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body)
        const response = await updateStore(req.body, req.ctx);

        Log.infoCtx(req.ctx, storeController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Store updated successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey)
    }
}

export const deleteStoreController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, storeController + consoleKeys.StartKey, consoleKeys.RequestKey, req.params)
        const response = await removeStore(req.params.id, req.ctx);

        Log.infoCtx(req.ctx, storeController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Store deleted successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey)
    }
}

export const searchStoresController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, storeController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body)
        const response = await searchStores(req.body, req.ctx);

        Log.infoCtx(req.ctx, storeController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Store search successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, storeController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, storeController + consoleKeys.FinishKey)
    }
}