import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import { getDashboardStats } from "../service/dashboard_service.js";

const dashboardController = "dashboard controller: ";

export const getDashboardController = async (req, res, next) => {
  try {
    const ctx = req.ctx;
    Log.infoCtx(ctx, dashboardController + consoleKeys.StartKey);
    const result = await getDashboardStats(ctx);
    generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Dashboard stats retrieved successfully",
      result,
    );
  } catch (error) {
    Log.errorCtx(req.ctx, dashboardController + consoleKeys.ErrorKey, error);
    return next(error);
  } finally {
    Log.infoCtx(req.ctx, dashboardController + consoleKeys.FinishKey);
  }
};
