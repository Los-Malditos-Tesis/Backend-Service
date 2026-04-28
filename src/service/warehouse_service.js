import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { warehouseCodes } from "../errors/error_codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { findById, getWarehouseInventory, save, deleteById } from "../repositories/warehouse_repository.js";
import { findById as findUserById } from "../repositories/user_repository.js";

const warehouseService = "warehouse service: "

export const createWarehouse = serviceHandler(
    warehouseService,
    warehouseCodes.NOT_FOUND,
    async (warehouseData = {}, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, warehouseData)

        const existUser = await findUserById(warehouseData.user_id, ctx);
        if (!existUser)
            throw new AppError('El usuario no existe', 404, warehouseCodes.NOT_FOUND);

        if (existUser.Role.name === "USER")
            throw new AppError('El usuario no tiene permiso para ser el administrador de un almacen', 403, warehouseCodes.NOT_PERMISSIONS);

        await save(warehouseData, ctx);
        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, warehouseData)
    }
);

export const updateWarehouse = serviceHandler(
    warehouseService,
    warehouseCodes.NOT_FOUND,
    async (warehouseData = {}, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, warehouseData)

        const existWarehouse = await findById(warehouseData.id, ctx);
        if (!existWarehouse)
            throw new AppError('El almacen no existe', 404, warehouseCodes.NOT_FOUND);

        if (existWarehouse.user_id !== warehouseData.user_id) {
            const existUser = await findUserById(warehouseData.user_id, ctx);
            if (!existUser)
                throw new AppError('El usuario no existe', 404, warehouseCodes.NOT_FOUND);

            if (existUser.Role.name === "USER")
                throw new AppError('El usuario no tiene permiso para ser el administrador de un almacen', 403, warehouseCodes.NOT_PERMISSIONS);
        }


        await update(warehouseData.id, warehouseData, ctx);
        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, warehouseData)
    }
);

export const deleteWarehouse = serviceHandler(
    warehouseService,
    warehouseCodes.NOT_FOUND,
    async (id, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, id)

        const warehouseWithInventory = await getWarehouseInventory(id, ctx);
        if (!warehouseWithInventory)
            throw new AppError('El almacen no existe', 404, warehouseCodes.NOT_FOUND);

        if (warehouseWithInventory.Locations.length > 0)
            throw new AppError('El almacen no se puede eliminar porque tiene ubicaciones', 400, warehouseCodes.NOT_FOUND);

        await deleteById(id, ctx);
        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, warehouseWithInventory)
    }
)

export const searchWarehouse = serviceHandler(
    warehouseService,
    warehouseCodes.NOT_FOUND,
    async (query = "", limit = 10, page = 1, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, query)

        const result = await searchWarehouse(query, limit, page, ctx);
        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, result)
        return result
    }
)
