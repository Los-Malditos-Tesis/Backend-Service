import { Router } from "express";
import { authCameraMiddleware } from "../middlewares/auth_camera_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { merchandiseValidator } from "../utils/validator/automation_validator.js";
import {
  dispatchMerchandiseController,
  inventoryController,
  registerMerchandiseController,
  searchProductInZonesController,
} from "../controller/automation_controller.js";

const automationRoute = Router();

automationRoute.post("/", searchProductInZonesController);

automationRoute.post(
  "/register/merchandise",
  authCameraMiddleware,
  merchandiseValidator,
  validateMiddleware,
  registerMerchandiseController,
);

automationRoute.post(
  "/dispatch/merchandise",
  authCameraMiddleware,
  merchandiseValidator,
  validateMiddleware,
  dispatchMerchandiseController,
);

automationRoute.post(
  "/inventory/merchandise",
  authCameraMiddleware,
  merchandiseValidator,
  validateMiddleware,
  inventoryController
);

export default automationRoute;
