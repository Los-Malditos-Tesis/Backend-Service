import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { searchProductInZonesController } from "../controller/automation_controller.js";

const automationRouter = Router();

automationRouter.post("/", searchProductInZonesController);

export default automationRouter;
