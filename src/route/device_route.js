import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  createDeviceValidator,
  searchCamerasValidator,
  deleteCameraValidator,
} from "../utils/validator/device_validator.js";
import {
  registerCameraController,
  searchCamerasController,
  deleteCameraController,
} from "../controller/device_controller.js";

const deviceRouter = Router();

deviceRouter.post(
  "/register",
  authMiddleware,
  authorizeMiddleware(["ADMIN"]),
  createDeviceValidator,
  validateMiddleware,
  registerCameraController,
);

deviceRouter.get(
  "/",
  authMiddleware,
  authorizeMiddleware(["ADMIN"]),
  searchCamerasValidator,
  validateMiddleware,
  searchCamerasController,
);

deviceRouter.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN"]),
  deleteCameraValidator,
  validateMiddleware,
  deleteCameraController,
);
export default deviceRouter;
