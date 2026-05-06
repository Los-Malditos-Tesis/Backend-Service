import { Router } from "express";
import { authCameraMiddleware } from "../middlewares/auth_camera_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js"
import { dispatchMerchandiseService, registerMerchandiseService } from "../service/automation_service.js"
import { merchandiseValidator } from "../utils/validator/automation_validator.js"

const automationRoute = Router();

deviceRouter.post(
    "/register/merchandise",
    authCameraMiddleware,
    merchandiseValidator,
    validateMiddleware,
    registerMerchandiseService
);

deviceRouter.post(
    "/dispatch/merchandise",
    authCameraMiddleware,
    merchandiseValidator,
    validateMiddleware,
    dispatchMerchandiseService
);

export default automationRoute;