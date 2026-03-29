import { save, findByEmail } from "../repositories/user_repository.js";
import { AppError } from "../errors/app-error.js";
import { Log } from "../libs/logger/logger.js";
import { obfuscatePass } from "../utils/obfuscate/obfucates.js";
import { consoleKeys } from "../libs/logger/console/constant.js";

const authService = "auth service: "

export const registerUser = async (user = {}, ctx) => {
    try {
        Log.infoCtx(ctx, authService + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(user))
        const existUser = await findByEmail(user.email, ctx);

        if (existUser)
            throw new AppError('El usuario ya existe', 400, 1000)

        const newUser = await save(user, ctx);

        return newUser
    } catch (e) {
        Log.errorCtx(ctx, authService + consoleKeys.FailKey, e)

        if (e instanceof AppError)
            throw e;

        throw new AppError(
            e.message,
            500,
            2000
        );
    } finally {
        Log.infoCtx(ctx, authService + consoleKeys.FinishKey)
    }
}