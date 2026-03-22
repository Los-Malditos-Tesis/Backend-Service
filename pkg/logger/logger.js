import pino from "pino"
import { getSource } from "./handler/sourece.js"
import { config } from "../config/config.js";
import { generateTime } from "../utils/utils.js";

const baseLogger = pino({
    level: process.env.LOG_LEVEL || "info",
    timestamp: ()=>`,"time":"${generateTime()}"`
})

const kvToObject = (kv) => {
    const obj = {}

    for (let i = 0; i < kv.length; i += 2) {
        const key = kv[i]
        const value = kv[i + 1]

        if (typeof key !== "string") {
            console.log(key)
            throw new Error("log keys must be strings")
        }

        obj[key] = value
    }

    return obj
}

class Logger {
    infoCtx(ctx, msg, ...kv) {
        baseLogger.info({
            level: "INFO",
            source: getSource(),
            msg,
            ...ctx,
            ...kvToObject(kv)
        })
    }

    warnCtx(ctx, msg, ...kv) {
        baseLogger.warn({
            level: "WARN",
            source: getSource(),
            msg,
            ...ctx,
            ...kvToObject(kv)
        })
    }

    errorCtx(ctx, msg, err, ...kv) {
        baseLogger.error({
            level: "ERROR",
            source: getSource(),
            msg,
            errorMsg:err?.message,
            error: err,
            stack: err?.stack,
            ...ctx,
            ...kvToObject(kv)
        })
    }

    info(msg, ...kv) {
        baseLogger.info({
            level: "INFO",
            source: getSource(),
            msg,
            ...kvToObject(kv)
        })
    }
    
    warn(msg, ...kv) {
        baseLogger.warn({
            level: "WARN",
            source: getSource(),
            msg,
            ...kvToObject(kv)
        })
    }

    error(msg, err, ...kv) {
        baseLogger.error({
            level: "ERROR",
            source: getSource(),
            msg,
            error: err?.message,
            stack: err?.stack,
            ...kvToObject(kv)
        })
    }
}

export const Log = new Logger();