import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  createDeviceValidator,
  searchCamerasValidator,
  deleteCameraValidator,
  updateCameraValidator,
  patchCameraStatusValidator,
} from "../utils/validator/device_validator.js";
import {
  registerCameraController,
  searchCamerasController,
  deleteCameraController,
  updateCameraController,
  patchCameraStatusController,
} from "../controller/device_controller.js";

const deviceRouter = Router();

deviceRouter.post(
  "/register",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  createDeviceValidator,
  validateMiddleware,
  registerCameraController,
);

deviceRouter.get(
  "/search",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN", "VIEWER", "VIEWER-ORDER"]),
  searchCamerasValidator,
  validateMiddleware,
  searchCamerasController,
);

deviceRouter.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  deleteCameraValidator,
  validateMiddleware,
  deleteCameraController,
);

deviceRouter.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  updateCameraValidator,
  validateMiddleware,
  updateCameraController,
);

deviceRouter.patch(
  "/:id/status",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  patchCameraStatusValidator,
  validateMiddleware,
  patchCameraStatusController,
);

export default deviceRouter;
