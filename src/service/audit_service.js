import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import {
  save,
  findById,
  deleteById,
  update,
  search,
} from "../repositories/audit_repository.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { AppError } from "../errors/app_error.js";

const auditService = "audit service: ";

export const findByIdAudit = serviceHandler(
  auditService,
  CODES.AUDIT.NOT_FOUND,
  async (id = "", ctx) => {
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      id,
    );

    const audit = await findById(id, ctx);
    if (!audit)
      throw new AppError(
        "No se encontro ninguna auditoría con el id: " + id,
        404,
        CODES.AUDIT.NOT_FOUND,
      );

    Log.infoCtx(
      ctx,
      auditService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      audit,
    );
    return audit;
  },
);

export const searchAudits = serviceHandler(
  auditService,
  CODES.AUDIT.NOT_FOUND,
  async (query = {}, limit = 10, page = 1, ctx) => {
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      query,
    );

    const audits = await search(query, limit, page, ctx);
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      audits,
    );
    return audits;
  },
);

export const createAuditLog = serviceHandler(
  auditService,
  CODES.AUDIT.NOT_FOUND,
  async (data = {}, ctx) => {
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      data,
    );

    const audit = await save(data, ctx);
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      audit,
    );
    return audit;
  },
);

export const updateAuditLog = serviceHandler(
  auditService,
  CODES.AUDIT.NOT_FOUND,
  async (data = {}, ctx) => {
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      data,
    );

    await findByIdAudit(data.id, ctx);

    const updated = await update(data.id, data, ctx);
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      updated,
    );
    return updated;
  },
);

export const deleteAuditLog = serviceHandler(
  auditService,
  CODES.AUDIT.NOT_FOUND,
  async (id = "", ctx) => {
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      id,
    );

    await findByIdAudit(id, ctx);

    const deleted = await deleteById(id, ctx);
    Log.infoCtx(
      ctx,
      auditService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      deleted,
    );
    return deleted;
  },
);
