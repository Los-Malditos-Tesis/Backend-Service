import { updateLocation } from "../service/location_service.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const locationController = "location controller: ";

export const updateLocationController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      locationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const { zone } = req.body;
    const { id } = req.params;

    const resp = await updateLocation({ zone, id }, req.ctx);

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
