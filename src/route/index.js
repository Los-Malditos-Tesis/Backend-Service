import { Router } from "express";
import authRouter from "./auth_route.js";

const router = Router();

router.use("/auth", authRouter);

export default router;