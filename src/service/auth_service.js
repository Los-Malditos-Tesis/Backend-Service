import { save, findByEmail } from "../repositories/user_repository.js";
import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { obfuscatePass } from "../utils/obfuscate/obfucates.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { authCodes } from "../errors/error_codes.js";
import { generateToken } from "../libs/jwt/jwt.js";
import { comparePassword } from "../libs/encrypt/encrypt.js";
import { config } from "../config/config.js";

const authService = "auth service: "

export const registerUser = async (user = {}, ctx) => {
    try {
        Log.infoCtx(ctx, authService + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(user))
        const existUser = await findByEmail(user.email, ctx);

        if (existUser)
            throw new AppError('El usuario ya existe', 400, authCodes.ALREADI_ALREADY_EXISTS)

        const newUser = await save(user, ctx);

        return newUser
    } catch (e) {
        let error = e;

        if (!(e instanceof AppError)) {
            error = new AppError(
                e.message || 'Internal error',
                500,
                authCodes.NOT_FOUND,
                e?.errors
            );
        }

        Log.errorCtx(ctx, authService + consoleKeys.FailKey, error);

        throw error;
    } finally {
        Log.infoCtx(ctx, authService + consoleKeys.FinishKey)
    }
}

export const loginUser = async (authData = {}, ctx) => {
    try {
        Log.infoCtx(ctx, authService + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(authData))
        const user = await findByEmail(authData.email, ctx);
        
        const validPassword = user 
            ? await user.validatePassword(authData.password) 
            : comparePassword(authData.password, config.dummyHash);

        if (!user || !validPassword)
            throw new AppError('Credenciales inválidas', 401, authCodes.INVALID_CREDENTIALS)

        const token = generateToken({ userId: user.id, email: user.email });

        Log.infoCtx(ctx, authService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, { token })
        return { token }
    } catch (e) {
        let error = e;

        if (!(e instanceof AppError)) {
            error = new AppError(
                e.message || 'Internal error',
                500,
                authCodes.NOT_FOUND,
                error?.errors
            );
        }

        Log.errorCtx(ctx, authService + consoleKeys.FailKey, error);

        throw error;
    } finally {
        Log.infoCtx(ctx, authService + consoleKeys.FinishKey)

    }
}