import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  createSupplierValidator,
  searchSuppliersValidator,
} from "../utils/validator/supplier_validator.js";
import {
  createSupplierController,
  searchSuppliersController,
} from "../controller/supplier_controller.js";

const supplierRouter = Router();

supplierRouter.post(
  "/",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "USER"]),
  createSupplierValidator,
  validateMiddleware,
  createSupplierController,
);

supplierRouter.get(
  "/",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "USER"]),
  searchSuppliersValidator,
  validateMiddleware,
  searchSuppliersController,
);

export default supplierRouter;
