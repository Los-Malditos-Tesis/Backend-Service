import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  updateProfileValidator,
  updateStatusValidator,
} from "../utils/validator/user_validator.js";
import {
  searchUserController,
  updateProfileController,
  updateStatusController,
} from "../controller/user_controller.js";

const userRouter = Router();

userRouter.get(
  "/search",
  authMiddleware,
  authorizeMiddleware(["SUPERADMIN"]),
  searchUserController,
);

userRouter.put(
  "/profile/:id",
  authMiddleware,
  authorizeMiddleware(["SUPERADMIN"]),
  updateProfileValidator,
  validateMiddleware,
  updateProfileController,
);

userRouter.patch(
  "/status/:id",
  authMiddleware,
  authorizeMiddleware(["SUPERADMIN"]),
  updateStatusValidator,
  validateMiddleware,
  updateStatusController,
);

export default userRouter;
