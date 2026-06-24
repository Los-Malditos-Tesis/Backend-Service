import {
  createSupplier,
  deleteSupplier,
  searchSuppliers,
  updateSupplier,
} from "../service/supplier_service.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import { CODES } from "../utils/const/codes.js";

const supplierController = "supplier controller: ";

export const createSupplierController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      supplierController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );

    const { name, code, contactName, phone, email, location } = req.body;
    const resp = await createSupplier(
      { name, code, contactName, phone, email, location },
      req.ctx,
    );

    Log.infoCtx(
      req.ctx,
      supplierController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Proveedores encontrados",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, supplierController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, supplierController + consoleKeys.FinishKey);
  }
};

export const searchSuppliersController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      supplierController + consoleKeys.StartKey,
      consoleKeys.QueryKey,
      req.query,
    );

    const { limit, page } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    const resp = await searchSuppliers(
      req.query,
      parsedLimit,
      parsedPage,
      req.ctx,
    );

    Log.infoCtx(
      req.ctx,
      supplierController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Proveedor registrado exitosamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, supplierController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, supplierController + consoleKeys.FinishKey);
  }
};

export const updateSupplierController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      supplierController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
      consoleKeys.ParamKey,
      req.params,
    );

    req.body.id = req.params.id;
    const resp = await updateSupplier(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      supplierController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Proveedor actualizado exitosamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, supplierController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, supplierController + consoleKeys.FinishKey);
  }
};

export const deleteSupplierController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      supplierController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
      consoleKeys.ParamKey,
      req.params,
    );

    const resp = await deleteSupplier(req.params.id, req.ctx);

    Log.infoCtx(
      req.ctx,
      supplierController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Proveedor eliminado exitosamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, supplierController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, supplierController + consoleKeys.FinishKey);
  }
};
