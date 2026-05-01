import { Router } from "express";
import { createStoreController, findStoreByCodeController, deleteStoreController, searchStoresController, updateStoreController } from "../controller/store_controller";
import { authMiddleware } from "../middlewares/auth_middleware";
import { authorizeMiddleware } from "../middlewares/authorize_middleware";
import { validateMiddleware } from "../middlewares/validator_moddleware";
import { validateCreateStore, validateGetStoreByCode, validateIdParamStore, validateSearchStores, validateUpdateStore } from "../utils/validator/store_validator";

const StoreRouter = Router()

StoreRouter.post("/create",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateCreateStore,
    validateMiddleware,
    createStoreController
);

StoreRouter.get("/find-by-code/:code",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateGetStoreByCode,
    validateMiddleware,
    findStoreByCodeController
);

StoreRouter.post("/search",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateSearchStores,
    validateMiddleware,
    searchStoresController
);

StoreRouter.put("/update",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateUpdateStore,
    validateMiddleware,
    updateStoreController
);

StoreRouter.delete("/delete/:id",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateIdParamStore,
    validateMiddleware,
    deleteStoreController
);

export default StoreRouter;