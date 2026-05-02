import { Router } from "express";
import {
  createStoreController,
  findStoreByCodeController,
  deleteStoreController,
  searchStoresController,
  updateStoreController,
} from "../controller/store_controller.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  validateCreateStore,
  validateGetStoreByCode,
  validateIdParamStore,
  validateSearchStores,
  validateUpdateStore,
} from "../utils/validator/store_validator.js";

const storeRouter = Router();

storeRouter.post(
  "/create",
  authMiddleware,
  authorizeMiddleware(["STORE_CREATE"]),
  validateCreateStore,
  validateMiddleware,
  createStoreController,
);

storeRouter.get(
  "/find-by-code/:code",
  authMiddleware,
  authorizeMiddleware(["STORE_SEARCH"]),
  validateGetStoreByCode,
  validateMiddleware,
  findStoreByCodeController,
);

storeRouter.post(
  "/search",
  authMiddleware,
  authorizeMiddleware(["STORE_SEARCH"]),
  validateSearchStores,
  validateMiddleware,
  searchStoresController,
);

storeRouter.put(
  "/update",
  authMiddleware,
  authorizeMiddleware(["STORE_UPDATE"]),
  validateUpdateStore,
  validateMiddleware,
  updateStoreController,
);

storeRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorizeMiddleware(["STORE_DELETE"]),
  validateIdParamStore,
  validateMiddleware,
  deleteStoreController,
);

export default storeRouter;
