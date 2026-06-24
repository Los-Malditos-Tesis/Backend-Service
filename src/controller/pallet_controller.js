import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import {
  createPallet,
  updatePallet,
  deletePallet,
  findByIdPallet,
  findPalletByCode,
  searchPallets,
} from "../service/pallet_service.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const palletController = "pallet controller: ";

export const createPalletController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await createPallet(req.body, req.ctx);
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "Pallet created successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, palletController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, palletController + consoleKeys.FinishKey);
  }
};

export const updatePalletController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await updatePallet(req.body, req.ctx);
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Pallet updated successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, palletController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, palletController + consoleKeys.FinishKey);
  }
};

export const deletePalletController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.params,
    );
    const response = await deletePallet(req.params.id, req.ctx);
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Pallet deleted successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, palletController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, palletController + consoleKeys.FinishKey);
  }
};

export const getPalletByIdController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.params,
    );
    const response = await findByIdPallet(req.params.id, req.ctx);
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Pallet retrieved successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, palletController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, palletController + consoleKeys.FinishKey);
  }
};

export const getPalletByCodeController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.params,
    );
    const response = await findPalletByCode(req.params.code, req.ctx);
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Pallet retrieved successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, palletController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, palletController + consoleKeys.FinishKey);
  }
};

export const searchPalletsController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await searchPallets(
      req.body,
      req.body.limit,
      req.body.page,
      req.ctx,
    );
    Log.infoCtx(
      req.ctx,
      palletController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Pallets search successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, palletController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, palletController + consoleKeys.FinishKey);
  }
};
