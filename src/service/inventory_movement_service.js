import { CODES } from "../utils/const/codes.js";
import { save } from "../repositories/inventory_movement_repository.js"
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { serviceHandler } from "../utils/handler/service_handler.js";

const inventory_movement_service = "inventory movement service: "

export const createInventoryMovement = serviceHandler(
    inventory_movement_service,
    CODES.INVENTORY_MOVEMENT.NOT_FOUND,
    async (inventoryMovementData = {}, ctx) => {
        Log.infoCtx(
            ctx,
            inventory_movement_service + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            inventoryMovementData,
        );

        const resp = await save(inventoryMovementData, ctx);
        Log.infoCtx(
            ctx,
            inventory_movement_service + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            resp,
        );
        return resp;
    }
);