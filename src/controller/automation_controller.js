import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { dispatchMerchandiseService, registerMerchandiseService } from "../service/automation_service.js"
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const automationController = "automation controller: ";

export const registerMerchandiseController = async (req, res, next) => {
    try {
        Log.infoCtx(
            req.ctx,
            automationController + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            req.body,
        );
        const response = await registerMerchandiseService(req.body.gs1Code, req.camera, req.ctx);
        Log.infoCtx(
            req.ctx,
            automationController + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            response,
        );
        return generalResponse(
            res,
            201,
            CODES.SUCCESS.OK,
            "Merchandise registered successfully",
            response,
        );
    } catch (e) {
        Log.errorCtx(req.ctx, automationController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, automationController + consoleKeys.FinishKey);
    }
};

export const dispatchMerchandiseController = async (req, res, next) => {
    try {
        Log.infoCtx(
            req.ctx,
            automationController + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            req.body,
        );
        const response = await dispatchMerchandiseService(req.body, req.camera, req.ctx);
        Log.infoCtx(
            req.ctx,
            automationController + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            response,
        );
        return generalResponse(
            res,
            201,
            CODES.SUCCESS.OK,
            "Merchandise dispatched successfully",
            response,
        );
    } catch (e) {
        Log.errorCtx(req.ctx, automationController + consoleKeys.FailKey, e);
        next(e);
    }
    finally {
        Log.infoCtx(req.ctx, automationController + consoleKeys.FinishKey);
    }
};