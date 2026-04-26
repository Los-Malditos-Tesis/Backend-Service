import { save, findByEmail } from "../repositories/user_repository.js";
import { AppError } from "../errors/app_error.js";
import { obfuscatePass } from "../utils/obfuscate/obfucates.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { getRoleById } from "./role_service.js";

const userService = "user service: "

export const saveUser = async (ctx, user = {}) => {
    try {
        Log.infoCtx(ctx, userService + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(user))
        const existUser = await findByEmail(user.email, ctx);

        if (existUser)
            throw new AppError('El usuario ya existe', 400, authCodes.ALREADI_ALREADY_EXISTS)

        const defaultRole = await getRoleById(config.defaultRole, ctx);

        const newUser = await save(user, ctx);
        await newUser.addRole(defaultRole.id);
        
        Log.infoCtx(ctx, userService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, obfuscatePass(newUser.toJSON()))
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

        Log.errorCtx(ctx, userService + consoleKeys.FailKey, error);

        throw error;
    } finally {
        Log.infoCtx(ctx, userService + consoleKeys.FinishKey)
    }
}

export const getUserByEmail = async (ctx, email = "") => {
    try {
        Log.infoCtx(ctx, userService + consoleKeys.StartKey, consoleKeys.RequestKey, { email })
        const user = await findByEmail(email, ctx);
        
        if (!user)
            throw new AppError('Usuario no encontrado', 404, authCodes.NOT_FOUND)

        Log.infoCtx(ctx, userService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, obfuscatePass(user.toJSON()))   
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

        Log.errorCtx(ctx, userService + consoleKeys.FailKey, error);

        throw error;
    } finally {
        Log.infoCtx(ctx, userService + consoleKeys.FinishKey)
    }
}