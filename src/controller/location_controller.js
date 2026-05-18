import {
  updateLocation,
  deleteLocation,
  searchLocations,
  createLocation,
} from "../service/location_service.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const locationController = "location controller: ";

export const createLocationController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { body: req.body },
    );

    const resp = await createLocation(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(res, 201, CODES.SUCCESS.OK, "zona creada", resp);
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};

export const searchLocationController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { body: req.body },
    );

    const resp = await searchLocations(
      req.body,
      req.body.limit,
      req.body.page,
      req.ctx,
    );

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(res, 201, CODES.SUCCESS.OK, "zona encontrada", resp);
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};

export const updateLocationController = async (req, res, next) => {
  try {
    const locationData = req.body;
    const { id } = req.params;

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { ...locationData, id },
    );

    const resp = await updateLocation({ ...locationData, id }, req.ctx);

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "zona actualizada",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};

export const deleteLocationController = async (req, res, next) => {
  try {
    const { id } = req.params;
    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { id },
    );

    const resp = await deleteLocation(id, req.ctx);

    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(res, 201, CODES.SUCCESS.OK, "Zona eliminada", resp);
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};
