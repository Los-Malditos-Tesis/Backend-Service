import {
  save,
  findByEmail,
  search,
  updateProfile,
  updateStatus,
} from "../repositories/user_repository.js";
import { AppError } from "../errors/app_error.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { getRoleById } from "./role_service.js";
import { Log } from "../libs/logger/logger.js";
import { config } from "../config/config.js";
import { CODES } from "../utils/const/codes.js";
import { obfuscatePass } from "../utils/obfuscate/obfucates.js";
import { findById } from "../repositories/user_repository.js";

const userService = "user service: ";

export const saveUser = async (ctx, user = {}) => {
  try {
    Log.infoCtx(
      ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      obfuscatePass(user),
    );
    const existUser = await findByEmail(user.email, ctx);

    if (existUser)
      throw new AppError(
        "El usuario ya existe",
        400,
        CODES.USER.ALREADY_EXISTS,
      );

    const defaultRole = await getRoleById(config.defaultRole, ctx);

    const newUser = await save(user, ctx);
    await newUser.addRole(defaultRole.id);

    Log.infoCtx(
      ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      newUser.toJSON(),
    );
    return newUser;
  } catch (e) {
    let error = e;

    if (!(e instanceof AppError)) {
      error = new AppError(
        e.message || "Internal error",
        500,
        CODES.RESOURCE.NOT_FOUND,
        e?.errors,
      );
    }

    Log.errorCtx(ctx, userService + consoleKeys.FailKey, error);

    throw error;
  } finally {
    Log.infoCtx(ctx, userService + consoleKeys.FinishKey);
  }
};

export const getUserByEmail = async (ctx, email = "") => {
  try {
    Log.infoCtx(
      ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { email },
    );
    const user = await findByEmail(email, ctx);

    if (!user)
      throw new AppError(
        "Usuario no encontrado",
        404,
        CODES.RESOURCE.NOT_FOUND,
      );

    Log.infoCtx(
      ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      user.toJSON(),
    );
    return user;
  } catch (e) {
    let error = e;

    if (!(e instanceof AppError)) {
      error = new AppError(
        e.message || "Internal error",
        500,
        CODES.RESOURCE.NOT_FOUND,
        e?.errors,
      );
    }

    Log.errorCtx(ctx, userService + consoleKeys.FailKey, error);

    throw error;
  } finally {
    Log.infoCtx(ctx, userService + consoleKeys.FinishKey);
  }
};

export const searchUsers = async (ctx, query = {}) => {
  try {
    Log.infoCtx(
      ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      query,
    );
    const users = await search(query, ctx);

    if (!users)
      throw new AppError(
        "No se encontraron usuarios",
        404,
        CODES.RESOURCE.NOT_FOUND,
      );

    Log.infoCtx(
      ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      users,
    );
    return users;
  } catch (e) {
    let error = e;

    if (!(e instanceof AppError)) {
      error = new AppError(
        e.message || "Internal error",
        500,
        CODES.RESOURCE.NOT_FOUND,
        e?.errors,
      );
    }

    Log.errorCtx(ctx, userService + consoleKeys.FailKey, error);

    throw error;
  } finally {
    Log.infoCtx(ctx, userService + consoleKeys.FinishKey);
  }
};

export const updateProfileUser = async (ctx, data = {}) => {
  try {
    Log.infoCtx(
      ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      data,
    );

    const user = await findById(data.id, ctx);

    if (!user)
      throw new AppError(
        "No se encontró el usuario",
        404,
        CODES.RESOURCE.NOT_FOUND,
      );

    const updatedUser = await updateProfile(user, data.name, data.email, ctx);

    Log.infoCtx(
      ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      updatedUser.toJSON(),
    );
    return updatedUser;
  } catch (e) {
    let error = e;

    if (!(e instanceof AppError)) {
      error = new AppError(
        e.message || "Internal error",
        500,
        CODES.RESOURCE.NOT_FOUND,
        e?.errors,
      );
    }

    Log.errorCtx(ctx, userService + consoleKeys.FailKey, error);

    throw error;
  } finally {
    Log.infoCtx(ctx, userService + consoleKeys.FinishKey);
  }
};

export const updateStatusUser = async (ctx, id = "") => {
  try {
    Log.infoCtx(
      ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      id,
    );

    const user = await findById(id, ctx);

    if (!user)
      throw new AppError(
        "No se encontró el usuario",
        404,
        CODES.RESOURCE.NOT_FOUND,
      );

    const newStatus = user.active ? false : true;

    const updatedUser = await updateStatus(user, newStatus, ctx);

    Log.infoCtx(
      ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      updatedUser.toJSON(),
    );
    return updatedUser;
  } catch (e) {
    let error = e;

    if (!(e instanceof AppError)) {
      error = new AppError(
        e.message || "Internal error",
        500,
        CODES.RESOURCE.NOT_FOUND,
        e?.errors,
      );
    }

    Log.errorCtx(ctx, userService + consoleKeys.FailKey, error);

    throw error;
  } finally {
    Log.infoCtx(ctx, userService + consoleKeys.FinishKey);
  }
};
