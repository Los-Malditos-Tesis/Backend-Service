import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  createSupplierValidator,
  deleteSupplierValidator,
  searchSuppliersValidator,
  updateSupplierValidator,
} from "../utils/validator/supplier_validator.js";
import {
  createSupplierController,
  deleteSupplierController,
  searchSuppliersController,
  updateSupplierController,
} from "../controller/supplier_controller.js";

const supplierRouter = Router();

supplierRouter.post(
  "/",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  createSupplierValidator,
  validateMiddleware,
  createSupplierController,
);

supplierRouter.get(
  "/",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN", "VIEWER", "VIEWER-ORDER"]),
  searchSuppliersValidator,
  validateMiddleware,
  searchSuppliersController,
);

supplierRouter.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  updateSupplierValidator,
  validateMiddleware,
  updateSupplierController,
);

supplierRouter.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  deleteSupplierValidator,
  validateMiddleware,
  deleteSupplierController,
);

export default supplierRouter;
