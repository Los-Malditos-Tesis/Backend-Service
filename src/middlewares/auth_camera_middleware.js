import { findCameraById } from "../service/camera_service.js";
import { AppError } from "../errors/app_error.js";
import { CODES } from "../utils/const/codes.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { obfuscateApiKey } from "../utils/obfuscate/obfucates.js";
import { verifyCameraToken } from "../libs/jwt/jwt.js";

const authCameraMiddlewareKey = "auth camera middelware: "

export const authCameraMiddleware = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, authMiddlewareKey + consoleKeys.StartKey)
        const authHeader = req.headers['authorization'];

        if (!authHeader)
            throw new AppError('Authorization header is missing', 401, CODES.AUTH.INAUTHORIZED);

        const token = authHeader.split(' ')[1];
        if (!token)
            throw new AppError('Token is missing', 401, CODES.AUTH.INAUTHORIZED);

        const decoded = await verifyCameraToken(token)
        if (!decoded.valid)
            throw new AppError('Invalid token', 401, CODES.AUTH.INAUTHORIZED);

        const camera = await findCameraById(req.ctx, decoded.payload?.sub);
        if (!camera)
            throw new AppError('Invalid token', 404, CODES.RESOURCE.NOT_FOUND);

        Log.infoCtx(req.ctx, authMiddlewareKey + consoleKeys.SuccessKey, consoleKeys.InformationKey, obfuscateApiKey(camera))

        req.camera = camera;
        req.ctx = { ...req.ctx, camera_id: camera.id }
        Log.infoCtx(req.ctx, authMiddlewareKey + consoleKeys.FinishKey)
        next();
    } catch (e) {
        Log.warnCtx(req.ctx, authMiddlewareKey + consoleKeys.FailKey, consoleKeys.ErrorKey, e);
        next(e);
    }
}