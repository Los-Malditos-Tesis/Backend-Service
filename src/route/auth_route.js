import { Router } from "express";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { validateRegister, validateLogin } from "../utils/validator/auth_validator.js";
import { registerController, loginController } from "../controller/auth_controller.js";

const authRouter = Router();

authRouter.post(
    "/register",
    validateRegister,
    validateMiddleware,
    registerController
)

authRouter.post(
    "/login",
    validateLogin,
    validateMiddleware,
    loginController
)

export default authRouter;