import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { getDashboardController } from "../controller/dashboard_controller.js";

const dashboardRoute = Router();
dashboardRoute.get(
  "/",
  authMiddleware,
  authorizeMiddleware(["SUPERADMIN", "ADMIN"]),
  getDashboardController,
);

export default dashboardRoute;
