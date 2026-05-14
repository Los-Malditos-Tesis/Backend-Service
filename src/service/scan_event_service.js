import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { save, search } from "../repositories/scan_event_repository.js";

const scan_event_service = "scan event service";

export const createScanEvent = serviceHandler(
  scan_event_service,
  CODES.SCAN_EVENT.NOT_FOUND,
  async (scanEventData = {}, ctx) => {
    Log.infoCtx(
      ctx,
      scan_event_service + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      scanEventData,
    );

    const resp = await save(scanEventData, ctx);
    Log.infoCtx(
      ctx,
      scan_event_service + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );
  },
);

export const searchScanEvent = serviceHandler(
  scan_event_service,
  CODES.SCAN_EVENT.NOT_FOUND,
  async (query = {}, limit = 10, page = 1, ctx) => {
    Log.infoCtx(
      ctx,
      scan_event_service + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      query,
    );

    const resp = await search(query, limit, page, ctx);
    Log.infoCtx(
      ctx,
      scan_event_service + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );
    return resp;
  }
)