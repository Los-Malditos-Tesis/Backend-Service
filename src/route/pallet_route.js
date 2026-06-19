import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import {
  createPalletController,
  deletePalletController,
  getPalletByIdController,
  getPalletByCodeController,
  searchPalletsController,
  updatePalletController,
} from "../controller/pallet_controller.js";
import {
  validateCreatePallet,
  validateDeletePallet,
  validateGetPalletById,
  validateGetPalletByCode,
  validateSearchPallets,
  validateUpdatePallet,
} from "../utils/validator/pallet_validator.js";

const palletRouter = Router();

palletRouter.get(
  "/find-by-id/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN", "VIEWER", "VIEWER-ORDER"]),
  validateGetPalletById,
  validateMiddleware,
  getPalletByIdController,
);

palletRouter.get(
  "/find-by-code/:code",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN", "VIEWER", "VIEWER-ORDER"]),
  validateGetPalletByCode,
  validateMiddleware,
  getPalletByCodeController,
);

palletRouter.post(
  "/create",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateCreatePallet,
  validateMiddleware,
  createPalletController,
);

palletRouter.post(
  "/search",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN", "VIEWER", "VIEWER-ORDER"]),
  validateSearchPallets,
  validateMiddleware,
  searchPalletsController,
);

palletRouter.put(
  "/update",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateUpdatePallet,
  validateMiddleware,
  updatePalletController,
);

palletRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
  validateDeletePallet,
  validateMiddleware,
  deletePalletController,
);

export default palletRouter;
