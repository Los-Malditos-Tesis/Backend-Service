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
  authorizeMiddleware(["ADMIN", "USER"]),
  searchUserController,
);

userRouter.put(
  "/profile/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN"]),
  updateProfileValidator,
  validateMiddleware,
  updateProfileController,
);

userRouter.patch(
  "/status/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN"]),
  updateStatusValidator,
  validateMiddleware,
  updateStatusController,
);

export default userRouter;
