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
  authorizeMiddleware(["ORDER_CREATE"]),
  createOrderValidator,
  validateMiddleware,
  createOrdenController,
);

orderRouter.get(
  "/",
  authMiddleware,
  authorizeMiddleware(["ORDER_SEARCH"]),
  searchOrdersValidator,
  validateMiddleware,
  searchOrdersController,
);

orderRouter.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ORDER_UPDATE"]),
  updateOrderValidator,
  validateMiddleware,
  updateOrderController,
);

orderRouter.patch(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ORDER_STATUS_UPDATE"]),
  changeOrderStatusValidator,
  validateMiddleware,
  changeOrderStatusController,
);

orderRouter.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ORDER_DELETE"]),
  deleteOrderValidator,
  validateMiddleware,
  deleteOrderController,
);
export default orderRouter;
