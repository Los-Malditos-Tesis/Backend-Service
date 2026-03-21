import db from "../models/index.js"
import { Log } from "../../pkg/logger/logger.js"
import { consoleKeys } from "../../pkg/logger/console/constant.js"
import { obfuscatePass } from "../utils/obfuscate/obfucates.js"

const authRepository = "auth repository: "

export const save = async (user = {}, ctx) => {
    try {
        Log.infoCtx(ctx, authRepository + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(user))
        const newUser = await db.User.create(user)

        return newUser
    } catch (e) {
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

        Log.infoCtx(ctx, authRepository, consoleKeys.ResponseKey, obfuscatePass(user.dataValues))
        return user
    } catch (e) {
        Log.errorCtx(ctx, authRepository + consoleKeys.FailKey, consoleKeys.ErrorKey, e)
        throw e

    } finally {
        Log.infoCtx(ctx, authRepository + consoleKeys.FinishKey)
    }
}