import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  createDeviceValidator,
  searchCamerasValidator,
  deleteCameraValidator,
  updateCameraValidator,
} from "../utils/validator/device_validator.js";
import {
  registerCameraController,
  searchCamerasController,
  deleteCameraController,
  updateCameraController,
} from "../controller/device_controller.js";

const deviceRouter = Router();

deviceRouter.post(
  "/register",
  authMiddleware,
  authorizeMiddleware(["CAMERA_CREATE"]),
  createDeviceValidator,
  validateMiddleware,
  registerCameraController,
);

deviceRouter.get(
  "/",
  authMiddleware,
  authorizeMiddleware(["CAMERA_SEARCH"]),
  searchCamerasValidator,
  validateMiddleware,
  searchCamerasController,
);

deviceRouter.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["CAMERA_DELETE"]),
  deleteCameraValidator,
  validateMiddleware,
  deleteCameraController,
);

deviceRouter.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["CAMERA_UPDATE"]),
  updateCameraValidator,
  validateMiddleware,
  updateCameraController,
);
export default deviceRouter;
