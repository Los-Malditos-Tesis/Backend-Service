import { CODES } from "../utils/const/codes";
import { ORDER_STATUS, ORDER_TYPES, ORDER_UNIT_TYPES, PALLETS_STATUS } from "../utils/const/status";
import { findPendingOrdersByWarehouse, updateOrder } from "./order_service";
import { updatePallet } from "./pallet_service";

const automationService = "automation service";

export const registerMerchandiseService = serviceHandler(
    automationService,
    CODES.PRODUCT.NOT_FOUND,
    async (gs1Code = "", cameraData = {}, ctx) => {

        Log.infoCtx(
            ctx,
            automationService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            gs1Code,
        );

        const merchandiseData = {} //here consume utility to retreive merchandise from gs1 code
        //validate belongs to order
        const ordersMerchandise = await findPendingOrdersByWarehouse(
            cameraData.warehouse_id,
            merchandiseData.unit_type,
            merchandiseData.id,
            ctx
        )

        if (ordersMerchandise.size == 1) {
            const order = ordersMerchandise[0];
            order.status = ORDER_STATUS.SHIPPED;
            // updating order status 
            updateOrder(order, ctx);

            if (order.type == ORDER_UNIT_TYPES.BOX) {

            } else {
                updatePallet({ id: merchandiseData.id, status: PALLETS_STATUS.DELIVERED }, ctx)
            }

        }
    },
);