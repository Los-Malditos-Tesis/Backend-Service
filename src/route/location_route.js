import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { updateLocationController } from "../controller/location_controller.js";
import { locationValidator } from "../utils/validator/location_validator.js";

const locationRouter = Router();

locationRouter.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "USER"]),
  locationValidator,
  validateMiddleware,
  updateLocationController,
);

export default locationRouter;
