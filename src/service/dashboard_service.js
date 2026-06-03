import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import {
  getStats,
  getProductsByCategory,
  getUsersByRole,
  getTopWarehouses,
  getCameraCoverage,
  getRegisteredPallets,
  getLastScan,
} from "../repositories/dashboard_repository.js";
import { consoleKeys } from "../libs/logger/console/constant.js";

const dashboardService = "dashboard service: ";

export const getDashboardStats = serviceHandler(
  dashboardService,
  CODES.SERVER.INTERNAL_ERROR,
  async (_, ctx) => {
    Log.infoCtx(ctx, dashboardService + consoleKeys.StartKey);
    const [
      stast,
      productsByCategory,
      usersByRole,
      topWarehouses,
      cameraCoverageData,
      registeredPallets,
      lastScan,
    ] = await Promise.all([
      getStats(),
      getProductsByCategory(),
      getUsersByRole(),
      getTopWarehouses(),
      getCameraCoverage(),
      getRegisteredPallets(),
      getLastScan(),
    ]);
    Log.infoCtx(ctx, dashboardService + consoleKeys.SuccessKey);
    console.log("cameradata", cameraCoverageData);
    const cameraCoverage =
      cameraCoverageData.locations === 0
        ? 0
        : (cameraCoverageData.monitoredLocations /
            cameraCoverageData.locations) *
          100;

    const operationalHealth = {
      cameraCoverage,
      registeredPallets,
      lastScan,
    };

    Log.infoCtx(ctx, dashboardService + consoleKeys.FinishKey);
    return {
      stast,
      productsByCategory,
      usersByRole,
      topWarehouses,
      operationalHealth,
    };
  },
);
