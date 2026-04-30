import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { findById, getWarehouseInventory, save, deleteById, search, getWarehouseInventoryByLocation, getWarehouseStructure, findLocationByQrInWarehouse } from "../repositories/warehouse_repository.js";
import { findById as findUserById } from "../repositories/user_repository.js";
import { findById as findLocationById } from "../repositories/location_repository.js";
import { CODES } from "../utils/const/codes.js";

const warehouseService = "warehouse service: "

export const createWarehouse = serviceHandler(
    warehouseService,
    CODES.WAREHOUSE.NOT_FOUND,
    async (warehouseData = {}, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, warehouseData)

        await save(warehouseData, ctx);
        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, warehouseData)
    }
);

export const updateWarehouse = serviceHandler(
    warehouseService,
    CODES.WAREHOUSE.NOT_FOUND,
    async (warehouseData = {}, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, warehouseData)

        const existWarehouse = await findById(warehouseData.id, ctx);
        if (!existWarehouse)
            throw new AppError('El almacen no existe', 404, CODES.WAREHOUSE.NOT_FOUND);

        if (existWarehouse.user_id !== warehouseData.user_id) {
            const existUser = await findUserById(warehouseData.user_id, ctx);
            if (!existUser)
                throw new AppError('El usuario no existe', 404, CODES.USER.NOT_FOUND);

            if (existUser.roles.some(role => role.name === "USER"))
                throw new AppError('El usuario no tiene permiso para ser el administrador de un almacen', 403, CODES.WAREHOUSE.NOT_PERMISSIONS);
        }


        await save(warehouseData, ctx);
        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, warehouseData)
    }
);

export const deleteWarehouse = serviceHandler(
    warehouseService,
    CODES.WAREHOUSE.NOT_FOUND,
    async (id, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, id)

        const warehouseWithInventory = await getWarehouseInventory(id, ctx);
        if (!warehouseWithInventory)
            throw new AppError('El almacen no existe', 404, CODES.WAREHOUSE.NOT_FOUND);

        if (warehouseWithInventory.Locations.length > 0)
            throw new AppError('El almacen no se puede eliminar porque tiene ubicaciones', 400, CODES.WAREHOUSE.HAS_STOCK);

        await deleteById(id, ctx);
        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, warehouseWithInventory)
    }
)

export const searchWarehouse = serviceHandler(
    warehouseService,
    CODES.WAREHOUSE.NOT_FOUND,
    async (query = "", limit = 10, page = 1, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, query)

        const result = await search(query, limit, page, ctx);
        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, result)
        return result
    }
)

export const getInventoryByLocation = serviceHandler(
    warehouseService,
    CODES.WAREHOUSE.NOT_FOUND,
    async (warehouseId, locationId, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, { warehouseId, locationId });

        const warehouse = await findById(warehouseId, ctx);
        if (!warehouse)
            throw new AppError('El almacen no existe', 404, CODES.WAREHOUSE.NOT_FOUND);

        const location = await findLocationById(locationId, ctx);
        if (!location)
            throw new AppError('La ubicación no existe', 404, CODES.WAREHOUSE.NOT_FOUND);

        const inventory = await getWarehouseInventoryByLocation(warehouseId, locationId, ctx);

        if (!inventory)
            throw new AppError('No se encontró inventario para esta ubicación', 404, warehouseCodes.NOT_FOUND);

        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, inventory);
        return inventory;
    }
);

export const getStructureWithCameras = serviceHandler(
    warehouseService,
    CODES.WAREHOUSE.NOT_FOUND,
    async (warehouseId, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, warehouseId);

        const warehouse = await findById(warehouseId, ctx);
        if (!warehouse)
            throw new AppError('El almacen no existe', 404, CODES.WAREHOUSE.NOT_FOUND);

        const structure = await getWarehouseStructure(warehouseId, ctx);

        if (!structure)
            throw new AppError('Almacén no encontrado', 404, CODES.WAREHOUSE.NOT_FOUND);

        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, structure);
        return structure;
    }
);

export const findLocationByQr = serviceHandler(
    warehouseService,
    CODES.WAREHOUSE.NOT_FOUND,
    async (warehouseId, zoneQr, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, { warehouseId, zoneQr });

        const warehouse = await findById(warehouseId, ctx);
        if (!warehouse)
            throw new AppError('El almacen no existe', 404, CODES.WAREHOUSE.NOT_FOUND);

        const location = await findLocationByQrInWarehouse(warehouseId, zoneQr, ctx);

        if (!location || location.Locations.length === 0)
            throw new AppError('La zona escaneada no pertenece a este almacén o no existe', 404, CODES.WAREHOUSE.NOT_FOUND);

        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, location);
        return location;
    }
);

export const getWarehouseById = serviceHandler(
    warehouseService,
    CODES.WAREHOUSE.NOT_FOUND,
    async (id, ctx) => {
        Log.infoCtx(ctx, warehouseService + consoleKeys.StartKey, consoleKeys.RequestKey, id);

        const warehouse = await findById(id, ctx);
        if (!warehouse)
            throw new AppError('El almacen no existe', 404, CODES.WAREHOUSE.NOT_FOUND);

        Log.infoCtx(ctx, warehouseService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, warehouse);
        return warehouse;
    }
);