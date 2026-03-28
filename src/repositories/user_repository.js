import { ValidationError } from "sequelize"
import db from "../models/index.js"
import { Log } from "../libs/logger/logger.js"
import { consoleKeys } from "../libs/logger/console/constant.js"
import { obfuscatePass } from "../utils/obfuscate/obfucates.js"

const authRepository = "auth repository: "

export const save = async (user = {}, ctx) => {
    try {
        Log.infoCtx(ctx, authRepository + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(user))
        const newUser = await db.User.create(user)

        return newUser
    } catch (e) {
        if (e instanceof ValidationError) {
            const newError = new Error("Sequelize Errors");
            newError.errors = e.errors.map(err => err.message);
            e = newError;
        }

        Log.errorCtx(ctx, authRepository + consoleKeys.FailKey, e)
        throw e
    } finally {
        Log.infoCtx(ctx, authRepository + consoleKeys.FinishKey)
    }
}

export const findByEmail = async (email = "", ctx) => {
    try {
        Log.infoCtx(ctx, authRepository + consoleKeys.StartKey, consoleKeys.RequestKey, { email })
        const user = await db.User.findOne({
            where: {
                email: email
            }
        })

        Log.infoCtx(ctx, authRepository, consoleKeys.ResponseKey, obfuscatePass(user?.dataValues))
        return user
    } catch (e) {
        if (e instanceof ValidationError) {
            const newError = new Error("Sequelize Errors");
            newError.errors = e.errors.map(err => err.message);
            e = newError;
        }

        Log.errorCtx(ctx, authRepository + consoleKeys.FailKey, consoleKeys.ErrorKey, e)
        throw e;
    } finally {
        Log.infoCtx(ctx, authRepository + consoleKeys.FinishKey)
    }
}