import { createCtx } from "../../pkg/logger/console/context";
import { generateTime } from "../../pkg/utils/utils";

export const contextMiddleware=(req, res, next)=>{
    req.ctx = createCtx({
        ip: req.ip,
        path: req.originalUrl,
        method: req.method,
        startTime: generateTime()
    });

    next();
}