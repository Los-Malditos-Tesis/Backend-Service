import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  searchProductsController,
  updateProductController,
} from "../controller/product_controller.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  validateCreateProduct,
  validateDeleteProduct,
  validateGetProductById,
  validateSearchProducts,
  validateUpdateProduct,
} from "../utils/validator/product_validator.js";

const productRouter = Router();

productRouter.get(
  "/find-by-id/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN", "VIEWER", "VIEWER-ORDER"]),
  validateGetProductById,
  validateMiddleware,
  getProductByIdController,
);

productRouter.post(
  "/create",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateCreateProduct,
  validateMiddleware,
  createProductController,
);

productRouter.post(
  "/search",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN", "VIEWER", "VIEWER-ORDER"]),
  validateSearchProducts,
  validateMiddleware,
  searchProductsController,
);

productRouter.put(
  "/update",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateUpdateProduct,
  validateMiddleware,
  updateProductController,
);

productRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateDeleteProduct,
  validateMiddleware,
  deleteProductController,
);

export default productRouter;
