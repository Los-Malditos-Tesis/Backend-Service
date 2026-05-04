import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const scanEventController = "scan event controller: ";

export const createEventController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      scanEventController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "evento creado",
      "success",
    );
  } catch (e) {
    Log.errorCtx(req.ctx, locationController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, locationController + consoleKeys.FinishKey);
  }
};
