import { getUserByEmail } from "../service/user_service.js";
import { verifyAuthToken } from "../service/auth_service.js";
import { AppError } from "../errors/app_error.js";
import { CODES } from "../utils/const/codes.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { obfuscatePass } from "../utils/obfuscate/obfucates.js";

const authMiddlewareKey = "auth middleware: ";

export const authMiddleware = async (req, res, next) => {
  try {
    Log.infoCtx(req.ctx, authMiddlewareKey + consoleKeys.StartKey);
    const authHeader = req.headers["authorization"];

    if (!authHeader)
      throw new AppError(
        "Authorization header is missing",
        401,
        CODES.AUTH.INAUTHORIZED,
      );

    const token = authHeader.split(" ")[1];
    if (!token)
      throw new AppError("Token is missing", 401, CODES.AUTH.INAUTHORIZED);

    const decoded = await verifyAuthToken(req.ctx, token);
    if (!decoded.valid)
      throw new AppError("Invalid token", 401, CODES.AUTH.INAUTHORIZED);

    const user = await getUserByEmail(req.ctx, decoded.payload?.email);
    if (!user)
      throw new AppError("Invalid token", 404, CODES.RESOURCE.NOT_FOUND);

    Log.infoCtx(req.ctx, authMiddlewareKey + consoleKeys.SuccessKey);

    req.user = user;
    req.ctx = { ...req.ctx, user_id: user.id };
    Log.infoCtx(req.ctx, authMiddlewareKey + consoleKeys.FinishKey);
    next();
  } catch (e) {
    Log.warnCtx(
      req.ctx,
      authMiddlewareKey + consoleKeys.FailKey,
      consoleKeys.ErrorKey,
      e,
    );
    next(e);
  }
};
