import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";

const authorizeMiddlewareKey = "authorize middleware: ";

export const authorizeMiddleware = (requiredPermissions = []) => {
  const message =
    "User does not have the required permissions to access this resource";

  return async (req, res, next) => {
    Log.infoCtx(req.ctx, authorizeMiddlewareKey + consoleKeys.StartKey);
    const permissions = req.user.permissions.map((p) => p.id);

    if (
      !req.user ||
      !requiredPermissions.some((permission) =>
        permissions.includes(permission),
      )
    ) {
      Log.warnCtx(
        req.ctx,
        authorizeMiddlewareKey + consoleKeys.FailKey,
        consoleKeys.ErrorKey,
        message,
      );
      Log.infoCtx(req.ctx, authorizeMiddlewareKey + consoleKeys.FinishKey);
      return next(
        new AppError("Forbidden", 403, CODES.AUTH.FORBIDDEN, message),
      );
    }
    Log.infoCtx(req.ctx, authorizeMiddlewareKey + consoleKeys.FinishKey);
    next();
  };
};
