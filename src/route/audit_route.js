import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  createAuditController,
  deleteAuditController,
  getAuditByIdController,
  searchAuditsController,
  updateAuditController,
} from "../controller/audit_controller.js";
import {
  validateCreateAudit,
  validateDeleteAudit,
  validateGetAuditById,
  validateSearchAudits,
  validateUpdateAudit,
} from "../utils/validator/audit_validator.js";

const auditRouter = Router();

auditRouter.get(
  "/find-by-id/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateGetAuditById,
  validateMiddleware,
  getAuditByIdController,
);

auditRouter.post(
  "/create",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateCreateAudit,
  validateMiddleware,
  createAuditController,
);

auditRouter.post(
  "/search",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateSearchAudits,
  validateMiddleware,
  searchAuditsController,
);

auditRouter.put(
  "/update",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateUpdateAudit,
  validateMiddleware,
  updateAuditController,
);

auditRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateDeleteAudit,
  validateMiddleware,
  deleteAuditController,
);

export default auditRouter;
