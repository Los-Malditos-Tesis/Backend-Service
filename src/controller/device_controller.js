import { registerCamera, searchCameras } from "../service/camera_service.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import { obfuscateApiKey } from "../utils/obfuscate/obfucates.js";

export const registerCameraController = async (req, res) => {
  try {
    Log.infoCtx(
      req.ctx,
      deviceController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
      consoleKeys.InformationKey,
      req.user.id,
    );

    const { code, location_id } = req.body;

    const resp = await registerCamera({ code, location_id }, req.ctx);

    Log.infoCtx(
      req.ctx,
      deviceController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      obfuscateApiKey(resp),
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "Dispositivo registrado y vinculado correctamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, deviceController + consoleKeys.FailKey, e);
    return next(e);
  } finally {
    Log.infoCtx(req.ctx, deviceController + consoleKeys.FinishKey);
  }
};

export const searchCamerasController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      cameraController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.query,
    );

    const { page = 1, limit = 10, location_id, code } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    const resp = await searchCameras(
      { location_id, code, limit: parsedLimit, page: parsedPage },
      req.ctx,
    );

    Log.infoCtx(
      req.ctx,
      cameraController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Listado de cámaras obtenido correctamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, cameraController + consoleKeys.FailKey, e);
    return next(e);
  } finally {
    Log.infoCtx(req.ctx, cameraController + consoleKeys.FinishKey);
  }
};

export const updateCameraController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      cameraController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
      consoleKeys.ParamKey,
      req.params,
    );

    const { id } = req.params;

    const resp = await updateCamera({ ...req.body, id }, req.ctx);

    Log.infoCtx(
      req.ctx,
      cameraController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Cámara actualizada correctamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, cameraController + consoleKeys.FailKey, e);
    return next(e);
  } finally {
    Log.infoCtx(req.ctx, cameraController + consoleKeys.FinishKey);
  }
};

export const deleteCameraController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      cameraController + consoleKeys.StartKey,
      consoleKeys.ParamKey,
      req.params,
    );

    const { id } = req.params;

    const resp = await deleteCamera(id, req.ctx);

    Log.infoCtx(
      req.ctx,
      cameraController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Cámara eliminada correctamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, cameraController + consoleKeys.FailKey, e);
    return next(e);
  } finally {
    Log.infoCtx(req.ctx, cameraController + consoleKeys.FinishKey);
  }
};
