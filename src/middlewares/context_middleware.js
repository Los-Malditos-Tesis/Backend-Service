import { createCtx } from "../libs/logger/console/context.js";
import { generateTime } from "../utils/utils.js";
import { als } from "../libs/logger/console/context.js";

export const contextMiddleware = (req, res, next) => {
  req.ctx = createCtx({
    ip: req.ip,
    path: req.originalUrl,
    method: req.method,
    startTime: generateTime(),
  });

  als.run(new Map(), () => {
    next();
  });
};
