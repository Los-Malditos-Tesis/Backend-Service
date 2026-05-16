import { Router } from "express";
import { createEventController, searchScanEventController } from "../controller/scan_event_controller.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateSearchController } from "../utils/validator/scan_event_validator.js";

const scanRouter = Router();

scanRouter.post("/", createEventController);

scanRouter.post(
    "/search",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "USER"]),
    validateSearchController,
    validateMiddleware,
    searchScanEventController
);

export default scanRouter;
