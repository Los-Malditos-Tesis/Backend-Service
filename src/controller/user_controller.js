import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import {
  search,
  updateStatus,
  updateProfile,
} from "../repositories/user_repository.js";

const userService = "user service: ";

export const searchUserController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.QueryKey,
      req.query,
    );
    const { id, name, email, page, limit } = req.query;
    const serviceResp = await search(req.ctx, {
      id,
      name,
      email,
      page,
      limit,
    });

    const resp = registerUserDto(serviceResp.toJSON());
    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "Usuarios encontrados",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, userService + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, userService + consoleKeys.FinishKey);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
      consoleKeys.ParamKey,
      req.params,
    );

    const id = req.params.id;
    const { name, email } = req.body;

    const serviceResp = await updateProfile(req.ctx, { id, name, email });

    const resp = registerUserDto(serviceResp.toJSON());
    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "Usuario actualizado",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, userService + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, userService + consoleKeys.FinishKey);
  }
};

export const updateStatusController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
      consoleKeys.ParamKey,
      req.params,
    );

    const id = req.params.id;
    const { status } = req.body;

    const serviceResp = await updateStatus(req.ctx, { id, status });

    const resp = registerUserDto(serviceResp.toJSON());
    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "Estado actualizado",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, userService + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, userService + consoleKeys.FinishKey);
  }
};
