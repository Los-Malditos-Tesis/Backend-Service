import { ValidationError } from "sequelize";
import { Log } from "../../libs/logger/logger.js"
import { consoleKeys } from "../../libs/logger/console/constant.js";

/**
 * @description function that handle errors and logging
 * @param {string} repositoryName 
 * @param {function} operation 
 * @returns async function that handle errors and logging
 * @example
 * export const save = repositoryHandler("product repository", async (product, ctx) => {
 *    return await db.Product.create(product)
 * })
 * !important: the last argument must be ctx
 */

export const repositoryHandler = (repositoryName, operation, transformation = (data) => data) => {
    return async (...args) => {
        //getting last argument as ctx
        const ctx = args[args.length - 1]

        //getting all model arguments
        const params = args.slice(0, - 1)
        const payload = params.length === 1 ? params[0] : params;

        try {
            Log.infoCtx(ctx, repositoryName + consoleKeys.StartKey, consoleKeys.RequestKey, transformation(payload))

            const result = await operation(...params)

            Log.infoCtx(ctx, repositoryName, consoleKeys.ResponseKey, result?.dataValues || result);
            return result;
        } catch (e) {
            if (e instanceof ValidationError) {
                const newError = new Error("Sequelize Errors");
                newError.errors = e.errors.map(err => err.message);
                e = newError;
            }

            Log.errorCtx(ctx, repositoryName + consoleKeys.FailKey, e)
            throw e
        } finally {
            Log.infoCtx(ctx, repositoryName + consoleKeys.FinishKey)

        }

    }
}