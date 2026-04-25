import { saveUser, getUserByEmail } from "./user_service.js";
import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { obfuscatePass, obfuscateToken } from "../utils/obfuscate/obfucates.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { authCodes } from "../errors/error_codes.js";
import { generateToken, verifyToken } from "../libs/jwt/jwt.js";
import { comparePassword } from "../libs/encrypt/encrypt.js";
import { config } from "../config/config.js";
import { save, findByContent } from "../repositories/token_repository.js";

const authService = "auth service: "

export const registerUser = async (ctx, userData = {}) => {
    try {
        Log.infoCtx(ctx, authService + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(userData))

        const user = await saveUser(ctx, userData);
        
        Log.infoCtx(ctx, authService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, obfuscatePass(user.toJSON()))
        return user
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

export const loginUser = async (ctx, authData = {}) => {
    try {
        Log.infoCtx(ctx, authService + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(authData))
        const user = await getUserByEmail(ctx, authData.email);
        
        const validPassword = user 
            ? await user.validatePassword(authData.password) 
            : comparePassword(authData.password, config.dummyHash);

        if (!user || !validPassword)
            throw new AppError('Credenciales inválidas', 401, authCodes.INVALID_CREDENTIALS)

        const tokenString = generateToken({ userId: user.id, email: user.email });
        const token = {user_id: user.id, content: tokenString, isActive: true}
        await save(token, ctx);

        Log.infoCtx(ctx, authService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, obfuscateToken( token ))
        return token
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

export const verifyAuthToken = async (ctx, token = "", userId = "") => {
    try {
        Log.infoCtx(ctx, authService + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscateToken({ token, userId }))

        const validToken = await findByContent(token, ctx);

        if (!validToken)
            throw new AppError('Token inválido', 401, authCodes.INVALID_TOKEN)

        const decoded = verifyToken(token);
        if (!decoded.valid){
            await save({ ...validToken.toJSON(), isActive: false }, ctx);
        }

        Log.infoCtx(ctx, authService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, decoded)
        return decoded;
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