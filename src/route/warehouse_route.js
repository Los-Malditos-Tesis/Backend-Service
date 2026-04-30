import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateCreateWarehouse, validateDeleteWarehouse, validateGetWarehouseById, validateGetWarehouseInventory, validateSearchWarehouses, validateUpdateWarehouse } from "../utils/validator/warehouse_validator.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { createWarehouseController, deleteWarehouseController, getWarehouseByIdController, getWarehouseInventoryController, getWarehouseStructureController, searchWarehousesController, updateWarehouseController } from "../controller/warehouse_controller.js";

const warehouseRouter = Router();

warehouseRouter.get(
    "/:id",
    authMiddleware,
    validateGetWarehouseById,
    validateMiddleware,
    getWarehouseByIdController
)

warehouseRouter.get(
    "/inventory/:locationId/in/:id",
    authMiddleware,
    validateGetWarehouseInventory,
    validateMiddleware,
    getWarehouseInventoryController
)

warehouseRouter.get(
    "/structure/:id",
    authMiddleware,
    validateGetWarehouseById,
    validateMiddleware,
    getWarehouseStructureController
)

warehouseRouter.post(
    "/search",
    authMiddleware,
    validateSearchWarehouses,
    validateMiddleware,
    searchWarehousesController
)

warehouseRouter.post(
    "/create",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateCreateWarehouse,
    validateMiddleware,
    createWarehouseController
)

warehouseRouter.put(
    "/update",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateUpdateWarehouse,
    validateMiddleware,
    updateWarehouseController
)

warehouseRouter.delete(
    "/delete/:id",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateDeleteWarehouse,
    validateMiddleware,
    deleteWarehouseController
)

export default warehouseRouter;
