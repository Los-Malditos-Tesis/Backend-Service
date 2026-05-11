import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize_middleware.js";
import { validateMiddleware } from "../middlewares/validator_moddleware.js";
import { createConfigParamsController, deleteByIdConfigParamsController, findAllConfigParamsController, findByIdConfigParamsController, updateConfigParamsController } from "../controller/config_params_controller.js";

const configParamsRouter = Router();

configParamsRouter.post(
    "/create",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateCreateConfigParams,
    validateMiddleware,
    createConfigParamsController
);

configParamsRouter.get(
    "/",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "USER"]),
    findAllConfigParamsController
);

configParamsRouter.get(
    "/:id",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "USER"]),
    validateIdMiddelware,
    validateMiddleware,
    findByIdConfigParamsController
)
configParamsRouter.put(
    "/:id",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateUpdateConfigParams,
    validateMiddleware,
    updateConfigParamsController
)
configParamsRouter.delete(
    "/:id",
    authMiddleware,
    authorizeMiddleware(["ADMIN", "SUPERADMIN"]),
    validateIdMiddelware,
    validateMiddleware,
    deleteByIdConfigParamsController
)


export default configParamsRouter;