import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { patchCameraStatusValidator } from "../utils/validator/camera_validator.js";
import { patchCameraStatusController } from "../controller/camera_controller.js";

const cameraRouter = Router();

cameraRouter.patch(
  "/:id/status",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  patchCameraStatusValidator,
  validateMiddleware,
  patchCameraStatusController,
);

export default cameraRouter;
