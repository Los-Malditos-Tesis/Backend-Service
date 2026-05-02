import { Router } from "express";
import authRouter from "./auth_route.js";
import supplierRouter from "./supplier_route.js";
import locationRouter from "./location_route.js";
import productRouter from "./product_route.js";
import warehouseRouter from "./warehouse_route.js";
import storeRouter from "./store_route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/suppliers", supplierRouter);
router.use("/location", locationRouter);
router.use("/product", productRouter);
router.use("/warehouse", warehouseRouter);
router.use("/store", storeRouter);

export default router;
