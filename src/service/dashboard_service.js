import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import {
  getStas,
  getProductsByCategory,
  getUsersByRole,
  getTopWarehouses,
} from "../repositories/dashboard_repository.js";
import { consoleKeys } from "../libs/logger/console/constant.js";

const dashboardService = "dashboard service: ";

export const getDashboardStats = serviceHandler(
  dashboardService,
  CODES.SERVER.INTERNAL_ERROR,
  async (_, ctx) => {
    Log.infoCtx(ctx, dashboardService + consoleKeys.StartKey);
    const [stast, productsByCategory, usersByRole, topWarehouses] =
      await Promise.all([
        getStas(),
        getProductsByCategory(),
        getUsersByRole(),
        getTopWarehouses(),
      ]);
    Log.infoCtx(ctx, dashboardService + consoleKeys.SuccessKey);

    Log.infoCtx(ctx, dashboardService + consoleKeys.FinishKey);
    return { stast, productsByCategory, usersByRole, topWarehouses };
  },
);
