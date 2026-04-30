import { Router } from "express";
import { createProductController } from "../controller/product_controller.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { validateCreateProduct } from "../utils/validator/product_validator.js";

const productRouter = Router();

productRouter.post(
    "/create",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateCreateProduct,
    validateMiddleware,
    createProductController
)


export default productRouter;