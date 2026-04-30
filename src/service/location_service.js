import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import {
  deleteById,
  findById,
  findByZone,
  hasStoredPallets,
  save,
  search,
} from "../repositories/location_repository.js";
import { findByLocationId } from "../repositories/camera_repository.js";

const locationService = "location service: ";

export const createLocation = serviceHandler(
  locationService,
  CODES.LOCATION.NOT_FOUND,
  async (locationData = {}, ctx) => {
    Log.infoCtx(
      ctx,
      locationService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      locationData,
    );

    const existsLocation = await findByZone(locationData.zone, ctx);
    if (existsLocation)
      throw new AppError(
        "La zona ya existe",
        400,
        CODES.LOCATION.ALREADY_EXISTS,
      );

    await save(locationData, ctx);
    Log.infoCtx(
      ctx,
      locationService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      locationData,
    );
  },
);

export const searchLocations = serviceHandler(
  locationService,
  CODES.LOCATION.NOT_FOUND,
  async (query = "", limit = 10, page = 1, ctx) => {
    Log.infoCtx(
      ctx,
      locationService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      query,
    );

    const locations = await search(query, limit, page, ctx);
    Log.infoCtx(
      ctx,
      locationService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      locations,
    );
    return locations;
  },
);

export const updateLocation = serviceHandler(
  locationService,
  CODES.LOCATION.NOT_FOUND,
  async (locationData = {}, ctx) => {
    Log.infoCtx(
      ctx,
      locationService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      locationData,
    );

    const existLocation = await findById(locationData.id, ctx);

    if (!existLocation)
      throw new AppError(
        "La zona no ha sido encontrada",
        404,
        CODES.LOCATION.NOT_FOUND,
      );

    const locationExistsByZone = await findByZone(locationData.zone, ctx);
    if (locationExistsByZone && locationExistsByZone.id !== locationData.id)
      throw new AppError(
        "La zona ya existe",
        400,
        CODES.LOCATION.ALREADY_EXISTS,
      );

    const resp = await save(locationData, ctx);
    Log.infoCtx(
      ctx,
      locationService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );
    return resp;
  },
);

export const deleteLocation = serviceHandler(
  locationService,
  CODES.LOCATION.NOT_FOUND,
  async (id, ctx) => {
    Log.infoCtx(
      ctx,
      locationService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { id },
    );

    const location = await findLocationById(id, ctx);
    const hasStock = await hasStoredPallets(location.zone, ctx);
    const hasCameras = await findByLocationId(location.id, ctx);

    if (hasStock || hasCameras.length > 0)
      throw new AppError(
        "La zona no puede ser eliminada porque tiene stock o camaras en uso",
        400,
        CODES.LOCATION.HAS_STOCK,
      );

    const deleted = await deleteById(id, ctx);

    Log.infoCtx(
      ctx,
      locationService + consoleKeys.SuccessKey + "deleted",
      consoleKeys.ResponseKey,
      deleted,
    );
    return deleted;
  },
);

export const findLocationById = serviceHandler(
  locationService,
  CODES.LOCATION.NOT_FOUND,
  async (id = "", ctx) => {
    Log.infoCtx(
      ctx,
      locationService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      id,
    );

    const location = await findById(id, ctx);
    if (!location)
      throw new AppError("La zona no existe", 404, CODES.LOCATION.NOT_FOUND);

    Log.infoCtx(
      ctx,
      locationService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      location,
    );
    return location;
  },
);
