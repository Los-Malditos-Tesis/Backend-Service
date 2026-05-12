import { Router } from "express";
import authRouter from "./auth_route.js";
import supplierRouter from "./supplier_route.js";
import locationRouter from "./location_route.js";
import productRouter from "./product_route.js";
import warehouseRouter from "./warehouse_route.js";
import storeRouter from "./store_route.js";
import deviceRouter from "./device_route.js";
import orderRouter from "./order_route.js";
import scanRouter from "./scan_event_route.js";
import automationRouter from "./automation_route.js";
import userRouter from "./user_route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/device", deviceRouter);
router.use("/suppliers", supplierRouter);
router.use("/location", locationRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/warehouse", warehouseRouter);
router.use("/store", storeRouter);
router.use("/scan", scanRouter);
router.use("/automation", automationRouter);
router.use("/user", userRouter);

export default router;
