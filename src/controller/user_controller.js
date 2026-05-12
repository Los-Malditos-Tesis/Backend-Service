import { generalResponse } from "../utils/handler/response_handler.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import {
  searchUsers,
  updateProfileUser,
  updateStatusUser,
} from "../service/user_service.js";

const userService = "user controller: ";

export const searchUserController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.StartKey,
      consoleKeys.QueryKey,
      req.query,
    );
    const { id, name, email } = req.query;

    const resp = await searchUsers(req.ctx, { id, name, email });
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

    const resp = await updateProfileUser(req.ctx, { id, name, email });

    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp.toJSON(),
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

    const resp = await updateStatusUser(req.ctx, id);

    Log.infoCtx(
      req.ctx,
      userService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp.toJSON(),
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
