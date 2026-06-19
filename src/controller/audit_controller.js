import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import {
  createAuditLog,
  updateAuditLog,
  deleteAuditLog,
  findByIdAudit,
  searchAudits,
} from "../service/audit_service.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const auditController = "audit controller: ";

export const createAuditController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await createAuditLog(req.body, req.ctx);
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "Audit log created successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, auditController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, auditController + consoleKeys.FinishKey);
  }
};

export const updateAuditController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await updateAuditLog(req.body, req.ctx);
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Audit log updated successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, auditController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, auditController + consoleKeys.FinishKey);
  }
};

export const deleteAuditController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.params,
    );
    const response = await deleteAuditLog(req.params.id, req.ctx);
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Audit log deleted successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, auditController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, auditController + consoleKeys.FinishKey);
  }
};

export const getAuditByIdController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.params,
    );
    const response = await findByIdAudit(req.params.id, req.ctx);
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Audit log retrieved successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, auditController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, auditController + consoleKeys.FinishKey);
  }
};

export const searchAuditsController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );
    const response = await searchAudits(
      req.body,
      req.body.limit,
      req.body.page,
      req.ctx,
    );
    Log.infoCtx(
      req.ctx,
      auditController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Audits search successfully",
      response,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, auditController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, auditController + consoleKeys.FinishKey);
  }
};
