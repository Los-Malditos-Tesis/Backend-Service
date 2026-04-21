import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { supplierCodes } from "../errors/error_codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { findByCode, findById, save, deleteById, search, update } from "../repositories/supplier_repository.js";

const supplierService = "supplier service: "

export const createSupplier = serviceHandler(
    supplierService,
    supplierCodes.NOT_FOUND,
    async (supplierData = {}, ctx) => {

        Log.infoCtx(ctx, supplierService + consoleKeys.StartKey, consoleKeys.RequestKey, supplierData)

        const existCode = await findByCode(supplierData.code, ctx);
        if (existCode)
            throw new AppError('El proveedor ya existe', 400, supplierCodes.ALREADY_EXISTS);

        await save(supplierData, ctx);
        Log.infoCtx(ctx, supplierService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, supplierData)
    }
);

export const searchSuppliers = serviceHandler(
    supplierService,
    supplierCodes.NOT_FOUND,
    async (query = "", limit = 10, page = 1, ctx) => {
        Log.infoCtx(ctx, supplierService + consoleKeys.StartKey, consoleKeys.RequestKey, query)

        const suppliers = await search(query, limit, page, ctx);
        Log.infoCtx(ctx, supplierService + consoleKeys.StartKey, consoleKeys.ResponseKey, suppliers);
        return suppliers;
    }
);

export const updateSupplier = serviceHandler(
    supplierService,
    supplierCodes.NOT_FOUND,
    async (supplierData = {}, ctx) => {
        Log.infoCtx(ctx, supplierService + consoleKeys.StartKey, consoleKeys.RequestKey, supplierData);

        const existSupplier = await findById(supplierData.id, ctx);
        if (!existSupplier)
            throw new AppError('El proveedor no existe', 404, supplierCodes.NOT_FOUND);

        const existCode = await findByCode(supplierData.code, ctx);
        if (existCode && existCode.id !== supplierData.id)
            throw new AppError('El proveedor con este codigo ya existe', 400, supplierCodes.ALREADY_EXISTS);

        await update(supplierData.id, supplierData, ctx);
        Log.infoCtx(ctx, supplierService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, supplierData);
    }
)

export const deleteSupplier = serviceHandler(
    supplierService,
    supplierCodes.NOT_FOUND,
    async (id, ctx) => {
        Log.infoCtx(ctx, supplierService + consoleKeys.StartKey, consoleKeys.RequestKey, id)

        const supplier = await findById(id, ctx);
        if (!supplier)
            throw new AppError('El proveedor no existe', 404, supplierCodes.NOT_FOUND);

        Log.infoCtx(supplierService, consoleKeys.SuccessKey, consoleKeys.ResponseKey, supplier)
        return await deleteById(id, ctx);
    }
)