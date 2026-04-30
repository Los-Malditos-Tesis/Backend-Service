import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  validateRegister,
  validateLogin,
} from "../utils/validator/auth_validator.js";
import {
  registerController,
  loginController,
  loginCameraController,
} from "../controller/auth_controller.js";

const authRouter = Router();

authRouter.post(
  "/register",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "USER"]),
  validateRegister,
  validateMiddleware,
  registerController,
);

authRouter.post(
  "/login",
  validateLogin,
  validateMiddleware,
  loginController,
  loginController,
);

authRouter.post("/login/camera", loginCameraController);
export default authRouter;
