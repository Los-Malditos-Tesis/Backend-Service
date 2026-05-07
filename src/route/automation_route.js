import { Router } from "express";
import { authCameraMiddleware } from "../middlewares/auth_camera_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js"
import { dispatchMerchandiseService, registerMerchandiseService } from "../service/automation_service.js"
import { merchandiseValidator } from "../utils/validator/automation_validator.js"
import { dispatchMerchandiseController, registerMerchandiseController } from "../controller/automation_controller.js";

const automationRoute = Router();

automationRoute.post(
    "/register/merchandise",
    authCameraMiddleware,
    merchandiseValidator,
    validateMiddleware,
    registerMerchandiseController
);

automationRoute.post(
    "/dispatch/merchandise",
    authCameraMiddleware,
    merchandiseValidator,
    validateMiddleware,
    dispatchMerchandiseController
);

export default automationRoute;