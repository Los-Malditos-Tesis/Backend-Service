import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { createOrderValidator } from "../utils/validator/order_validator.js";
import { createOrdenController } from "../controller/order_controller.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  authMiddleware,
  authorizeMiddleware(["ADMIN"]),
  createOrderValidator,
  validateMiddleware,
  createOrdenController,
);

export default orderRouter;
