import { createCtx } from "../libs/logger/console/context.js";
import { generateTime } from "../utils/utils.js";

export const contextMiddleware=(req, res, next)=>{
    req.ctx = createCtx({
        ip: req.ip,
        path: req.originalUrl,
        method: req.method,
        startTime: generateTime()
    });

    next();
}