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
  getMeController,
} from "../controller/auth_controller.js";

const authRouter = Router();

authRouter.post(
  "/register",
  authMiddleware,
  authorizeMiddleware(["USER_CREATE"]),
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

authRouter.get("/get-me", authMiddleware, getMeController);

authRouter.post("/login/camera", loginCameraController);
export default authRouter;
