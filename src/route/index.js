import { Router } from "express";
import authRouter from "./auth_route.js";
import locationRouter from "./location_route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/location", locationRouter);

export default router;
