import { Log } from "../../libs/logger/logger.js"
import { consoleKeys } from "../../libs/logger/console/constant.js";
import { AppError } from "../errors/app_error.js";


/**
 * @description function that handle errors and logging
 * @param {string} serviceName 
 * @param {number} internalErrorCode 
 * @param {function} operation 
 * @returns async function that handle errors and logging
 * @example
 * export const save = serviceHandler("product service", async (product, ctx) => {
 *    return await {
 *      main logic goes here
 * }
 * })
 * !important: the last argument must be ctx
 */

export const serviceHandler = (serviceName, internalErrorCode, operation) => {
    return async (...args) => {
        const ctx = args[args.length - 1];

        try {
            return await operation(...args);
        } catch (e) {
            let error = e;

            if (!(e instanceof AppError)) {
                error = new AppError(
                    e.message || 'Internal error',
                    500,
                    internalErrorCode,
                    e?.errors
                );
            }

            Log.errorCtx(ctx, serviceName + consoleKeys.FailKey, error);
            throw error;
        } finally {
            Log.infoCtx(ctx, serviceName + consoleKeys.FinishKey);
        }
    };
};