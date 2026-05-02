import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import { createOrder } from "../service/order_service.js";

const orderController = "order controller: ";

export const createOrdenController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );

    const resp = await createOrder(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Orden creada exitosamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, orderController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, orderController + consoleKeys.FinishKey);
  }
};
