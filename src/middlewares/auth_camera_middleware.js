import { findCameraById } from "../service/camera_service.js";
import { AppError } from "../errors/app_error.js";
import { CODES } from "../utils/const/codes.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { obfuscateApiKey } from "../utils/obfuscate/obfucates.js";
import { verifyCameraToken } from "../libs/jwt/jwt.js";
import { Log } from "../libs/logger/logger.js";

const authCameraMiddlewareKey = "auth camera middelware: "

export const authCameraMiddleware = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, authCameraMiddlewareKey + consoleKeys.StartKey)
        const authHeader = req.headers['authorization'];

        if (!authHeader)
            throw new AppError('Authorization header is missing', 401, CODES.AUTH.INAUTHORIZED);

        const token = authHeader.split(' ')[1];
        if (!token)
            throw new AppError('Token is missing', 401, CODES.AUTH.INAUTHORIZED);

        const decoded = await verifyCameraToken(token)
        if (!decoded.valid)
            throw new AppError('Invalid token', 401, CODES.AUTH.INAUTHORIZED);

        const camera = await findCameraById(decoded.payload?.sub, req.ctx);
        if (!camera)
            throw new AppError('Invalid token', 404, CODES.RESOURCE.NOT_FOUND);

        Log.infoCtx(req.ctx, authCameraMiddlewareKey + consoleKeys.SuccessKey, consoleKeys.ResponseKey, obfuscateApiKey(camera.toJSON()))

        req.camera = camera;
        req.ctx = { ...req.ctx, camera_id: camera.id }
        Log.infoCtx(req.ctx, authCameraMiddlewareKey + consoleKeys.FinishKey)
        next();
    } catch (e) {
        Log.warnCtx(req.ctx, authCameraMiddlewareKey + consoleKeys.FailKey, consoleKeys.ErrorKey, e);
        next(e);
    }
}