import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  changeOrderStatusValidator,
  createOrderValidator,
  deleteOrderValidator,
  searchOrdersValidator,
  updateOrderValidator,
} from "../utils/validator/order_validator.js";
import {
  changeOrderStatusController,
  createOrdenController,
  deleteOrderController,
  searchOrdersController,
  updateOrderController,
} from "../controller/order_controller.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "USER"]),
  createOrderValidator,
  validateMiddleware,
  createOrdenController,
);

orderRouter.get(
  "/",
  authMiddleware,
  authorizeMiddleware(["ADMIN"]),
  searchOrdersValidator,
  validateMiddleware,
  searchOrdersController,
);

orderRouter.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "USER"]),
  updateOrderValidator,
  validateMiddleware,
  updateOrderController,
);

orderRouter.patch(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "USER"]),
  changeOrderStatusValidator,
  validateMiddleware,
  changeOrderStatusController,
);

orderRouter.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "USER"]),
  deleteOrderValidator,
  validateMiddleware,
  deleteOrderController,
);
export default orderRouter;
