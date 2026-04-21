import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { locationCodes } from "../errors/error_codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { deleteById, findById, findByZone, hasStoredPallets, save, search } from "../repositories/location_repository.js";

const locationService = "location service: "

export const createLocation = serviceHandler(
    locationService,
    locationCodes.NOT_FOUND,
    async (locationData = {}, ctx) => {
        Log.infoCtx(ctx, locationService + consoleKeys.StartKey, consoleKeys.RequestKey, locationData)

        const existsLocation = await findByZone(locationData.zone, ctx);
        if (existsLocation)
            throw new AppError('La zona ya existe', 400, locationCodes.ALREADY_EXISTS);

        await save(locationData, ctx);
        Log.infoCtx(ctx, locationService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, locationData)

    }
);

export const searchLocations = serviceHandler(
    locationService,
    locationCodes.NOT_FOUND,
    async (query = "", limit = 10, page = 1, ctx) => {
        Log.infoCtx(ctx, locationService + consoleKeys.StartKey, consoleKeys.RequestKey, query)

        const locations = await search(query, limit, page, ctx);
        Log.infoCtx(ctx, locationService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, locations)
        return locations
    }
);

export const updateLocation = serviceHandler(
    locationService,
    locationCodes.NOT_FOUND,
    async (locationData = {}, ctx) => {
        Log.infoCtx(ctx, locationService + consoleKeys.StartKey, consoleKeys.RequestKey, locationData)

        const existLocation = await findById(locationData.id, ctx);

        if (!existLocation)
            throw new AppError('La zona no ha sido encontrada', 404, locationCodes.NOT_FOUND);

        const locationExistsByZone = await findByZone(locationData.zone, ctx);
        if (locationExistsByZone && locationExistsByZone.id !== locationData.id)
            throw new AppError('La zona ya existe', 400, locationCodes.ALREADY_EXISTS);

        await save(locationData, ctx);
        Log.infoCtx(ctx, locationService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, locationData)

    }
);


export const deleteLocation = serviceHandler(
    locationService,
    locationCodes.NOT_FOUND,
    async (id, ctx) => {
        Log.infoCtx(ctx, locationService + consoleKeys.StartKey, consoleKeys.RequestKey, id)
        const location = await findById(id, ctx);
        if (!location) throw new AppError('La zona no existe', 404, locationCodes.NOT_FOUND);

        const hasStock = await hasStoredPallets(location.zone, ctx);

        if (hasStock)
            throw new AppError('La zona no puede ser eliminada porque tiene stock', 400, locationCodes.HAS_STOCK);

        Log.infoCtx(ctx, locationService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, location)
        return await deleteById(id, ctx);
    }
)