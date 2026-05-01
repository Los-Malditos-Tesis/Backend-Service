import { loginUser, registerUser } from "../service/auth_service.js";
import { authCamera } from "../service/camera_service.js";
import { Log } from "../libs/logger/logger.js";
import {
  obfuscateApiKey,
  obfuscatePass,
  obfuscateToken,
} from "../utils/obfuscate/obfucates.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { registerUserDto } from "../dto/register_user_dto.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import { CODES } from "../utils/const/codes.js";

const authController = "auth controller: ";

export const registerController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      obfuscatePass(req.body),
    );
    const serviceResp = await registerUser(req.ctx, req.body);

    const resp = registerUserDto(serviceResp.toJSON());
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "User registered successfully",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey);
  }
};

export const loginController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      obfuscatePass(req.body),
    );
    const serviceResp = await loginUser(req.ctx, req.body);

    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      obfuscateToken(serviceResp),
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "User logged in successfully",
      serviceResp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey);
  }
};

export const loginCameraController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      obfuscateApiKey(req.body),
    );
    const serviceResp = await authCamera(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      obfuscateToken(serviceResp),
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Camera logged in successfully",
      serviceResp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey);
  }
};
