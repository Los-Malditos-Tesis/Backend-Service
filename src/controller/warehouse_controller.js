import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { createWarehouse, updateWarehouse, deleteWarehouse, searchWarehouse, getWarehouseById } from "../service/warehouse_service.js"
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const warehouseController = "warehouse controller: ";

export const createWarehouseController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body);
        const response = await createWarehouse(req.body, req.ctx);
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response);
        return generalResponse(res, 201, CODES.SUCCESS.CREATED, 'Warehouse created successfully', response);
    } catch (e) {
        Log.errorCtx(req.ctx, warehouseController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.FinishKey);
    }
}

export const updateWarehouseController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body);
        const response = await updateWarehouse(req.body, req.ctx);
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response);
        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Warehouse updated successfully', response);
    } catch (e) {
        Log.errorCtx(req.ctx, warehouseController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.FinishKey);
    }
}

export const deleteWarehouseController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body);
        const response = await deleteWarehouse(req.params.id, req.ctx);
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response);
        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Warehouse deleted successfully', response);
    } catch (e) {
        Log.errorCtx(req.ctx, warehouseController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.FinishKey);
    }
}

export const searchWarehousesController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body);
        const response = await searchWarehouse(req.body, req.ctx);
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response);
        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Warehouse search successfully', response);
    } catch (e) {
        Log.errorCtx(req.ctx, warehouseController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.FinishKey);
    }
}

export const getWarehouseByIdController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body);
        const response = await getWarehouseById(req.params.id, req.ctx);
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response);
        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Warehouse get successfully', response);
    } catch (e) {
        Log.errorCtx(req.ctx, warehouseController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, warehouseController + consoleKeys.FinishKey);
    }
}