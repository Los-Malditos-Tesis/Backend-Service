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
  authorizeMiddleware(["SUPPLIER_CREATE"]),
  createSupplierValidator,
  validateMiddleware,
  createSupplierController,
);

supplierRouter.get(
  "/",
  authMiddleware,
  authorizeMiddleware(["SUPPLIER_SEARCH"]),
  searchSuppliersValidator,
  validateMiddleware,
  searchSuppliersController,
);

supplierRouter.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["SUPPLIER_UPDATE"]),
  updateSupplierValidator,
  validateMiddleware,
  updateSupplierController,
);

supplierRouter.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["SUPPLIER_DELETE"]),
  deleteSupplierValidator,
  validateMiddleware,
  deleteSupplierController,
);

export default supplierRouter;
