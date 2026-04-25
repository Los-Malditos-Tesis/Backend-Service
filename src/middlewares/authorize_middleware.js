import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";

const authorizeMiddlewareKey = "authorize middleware: "

export const authorizeMiddleware = (requiredRoles = []) => {

    return async (req, res, next) => {
        Log.info(authorizeMiddlewareKey + consoleKeys.StartKey)
        if (
            !req.user ||
            !requiredRoles.some((role) => req.user.Roles.includes(role.id))
        ) {
            Log.info(authorizeMiddlewareKey + consoleKeys.FinishKey)
            return next(
                new AppError('Forbidden', 403, 'FORBIDDEN')
            )
        }
        next();
    }
};