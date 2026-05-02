import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  createLocationController,
  deleteLocationController,
  searchLocationController,
  updateLocationController,
} from "../controller/location_controller.js";
import {
  locationUpdateValidator,
  locationDeleteValidator,
  locationCreateValidator,
  locationSearchValidator,
} from "../utils/validator/location_validator.js";

const locationRouter = Router();

locationRouter.post(
  "/create",
  authMiddleware,
  authorizeMiddleware(["LOCATION_CREATE"]),
  locationCreateValidator,
  validateMiddleware,
  createLocationController,
);

locationRouter.post(
  "/search",
  authMiddleware,
  authorizeMiddleware(["LOCATION_SEARCH"]),
  locationSearchValidator,
  validateMiddleware,
  searchLocationController,
);

locationRouter.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["LOCATION_UPDATE"]),
  locationUpdateValidator,
  validateMiddleware,
  updateLocationController,
);

locationRouter.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware(["LOCATION_DELETE"]),
  locationDeleteValidator,
  validateMiddleware,
  deleteLocationController,
);

export default locationRouter;
