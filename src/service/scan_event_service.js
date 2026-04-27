import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { config } from "../config/config.js";
import { EVENT_STATUS } from "../utils/const/status.js";
import { save } from "../repositories/scan_event_repository.js";


const scanEventService = "scan event service: "

//si pasa en confidense se debe cambiar el inventario
// se debe actualizar el producto
export const registerEvent = serviceHandler(
    scanEventService,
    CODES.EVENT.NOT_FOUND,
    async (data = {}, ctx) => {
        Log.infoCtx(ctx, scanEventService + consoleKeys.StartKey, consoleKeys.RequestKey, data)

        data.status = data.confidense < config.minConfidence ? EVENT_STATUS.PENDING : EVENT_STATUS.REVIEW
        Log.infoCtx(ctx, scanEventService+consoleKeys.InformationKey, consoleKeys.InformationKey, data)

        const event = await save(data, ctx)
        Log.infoCtx(ctx, scanEventService + consoleKeys.SuccessKey, consoleKeys.ResponseKey);
        return event;
    }
)