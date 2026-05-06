import { searchProductInZones } from "../service/automation_service.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const automationController = "automation controller: ";

export const searchProductInZonesController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );

    //esta es la informacion de la camara, viene del findById
    req.camera;

    const resp = await searchProductInZones(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      automationController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Producto encontrado",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, automationController + consoleKeys.FailKey, e);
    return next(e);
  } finally {
    Log.infoCtx(req.ctx, automationController + consoleKeys.FinishKey);
  }
};
