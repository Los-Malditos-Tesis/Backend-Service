import { toggleCameraStatusService } from "../service/camera_service.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const cameraController = "camera controller: ";

export const patchCameraStatusController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      cameraController + consoleKeys.StartKey,
      consoleKeys.ParamKey,
      req.params,
    );

    const { id } = req.params;

    const resp = await toggleCameraStatusService(id, req.ctx);

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
      "Estado de cámara actualizado correctamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, cameraController + consoleKeys.FailKey, e);
    return next(e);
  } finally {
    Log.infoCtx(req.ctx, cameraController + consoleKeys.FinishKey);
  }
};
