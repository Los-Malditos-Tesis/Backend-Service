import { findAllByIds, findById, findByName } from "../repositories/role_repository.js";
import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { roleCodes } from "../errors/error_codes.js";

const roleService = "role service: "

export const getRoleByName = async (name = "", ctx) => {
    try {
        Log.infoCtx(ctx, roleService + consoleKeys.StartKey, consoleKeys.RequestKey, { name })
        const role = await findByName(name, ctx);

        if (!role)
            throw new AppError('Rol no encontrado', 404, roleCodes.NOT_FOUND)

        Log.infoCtx(ctx, roleService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, role)
        return role
    } catch (e) {
        let error = e;

        if (!(e instanceof AppError)) {
            error = new AppError(
                e.message || 'Internal error',
                500,
                roleCodes.NOT_FOUND,
                e?.errors
            );
        }

        Log.errorCtx(ctx, roleService + consoleKeys.FailKey, error);
        throw error;
    } finally {
        Log.infoCtx(ctx, roleService + consoleKeys.FinishKey)
    }
}

export const getRolesByIds = async (ids = [], ctx) => {
    try {
        Log.infoCtx(ctx, roleService + consoleKeys.StartKey, consoleKeys.RequestKey, { ids })
        const roles = await findAllByIds(ids, ctx);

        if (!roles || roles.length === 0)
            throw new AppError('Roles no encontrados', 404, roleCodes.NOT_FOUND)

        Log.infoCtx(ctx, roleService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, roles)
        return roles
    } catch (e) {
        let error = e;

        if (!(e instanceof AppError)) {
            error = new AppError(
                e.message || 'Internal error',
                500,
                roleCodes.NOT_FOUND,
                e?.errors
            );
        }

        Log.errorCtx(ctx, roleService + consoleKeys.FailKey, error);
        throw error;
    } finally {
        Log.infoCtx(ctx, roleService + consoleKeys.FinishKey)
    }
}

export const getRoleById = async (id = "", ctx) => {
    try {
        Log.infoCtx(ctx, roleService + consoleKeys.StartKey, consoleKeys.RequestKey, { id })
        const role = await findById(id, ctx);

        if (!role)
            throw new AppError('Rol no encontrado', 404, roleCodes.NOT_FOUND)

        Log.infoCtx(ctx, roleService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, role)
        return role
    } catch (e) {
        let error = e;

        if (!(e instanceof AppError)) {
            error = new AppError(
                e.message || 'Internal error',
                500,
                roleCodes.NOT_FOUND,
                e?.errors
            );
        }

        Log.errorCtx(ctx, roleService + consoleKeys.FailKey, error);
        throw error;
    } finally {
        Log.infoCtx(ctx, roleService + consoleKeys.FinishKey)
    }
}