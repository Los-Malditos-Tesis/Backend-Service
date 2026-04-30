import { Router } from "express";
import authRouter from "./auth_route.js";
import supplierRouter from "./supplier_route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/supplier", supplierRouter);

export default router;
