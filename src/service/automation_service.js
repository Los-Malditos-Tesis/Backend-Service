import { decode } from "jsonwebtoken";
import { AppError } from "../errors/app_error.js";
import { CODES } from "../utils/const/codes";
import { DEVICE_STATUS, ITEM_TYPES, ORDER_STATUS, ORDER_TYPES, ORDER_UNIT_TYPES, PALLETS_STATUS } from "../utils/const/status";
import { parseGS1 } from "../utils/gs1_util.js";
import { findBoxByCode, updateBox } from "./box_service.js";
import { createInventoryMovement } from "./inventory_movement_service.js";
import { findPendingOrdersByWarehouse, updateOrder } from "./order_service";
import { createPallet, findPalletByCode, updatePallet } from "./pallet_service";
import { findProductByCode, getProductById } from "./product_service.js"
import { createScanEvent } from "./scan_event_service.js"

const automationService = "automation service";


//validate scan events error missing
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

        const decodedGS1 = parseGS1(gs1Code); //MISSING UTILITY
        if (!decodedGS1) {
            throw new AppError("Invalid GS1 code", 400, CODES.GS1.INVALID);
        }

        //check if item exists in warehosue 
        const item = decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET 
            ? await findPalletByCode(decodedGS1.code, ctx)
            : await findBoxByCode(decodedGS1.code, ctx);


        const orders = await findPendingOrdersByWarehouse(
            cameraData.warehouse_id,
            decodedGS1.unit_type,
            decodedGS1.code,
            ctx
        );

        if (orders && orders.length > 0) {
            const order = orders[0];
            await processOrder(order, item.id, ctx);

            const inventoryMovement = order.unit_type == ORDER_UNIT_TYPES.PALLET
                ? { type: ITEM_TYPES.PALLET, pallet_id: item.id, state: PALLETS_STATUS.DELIVERED}
                : { type: ITEM_TYPES.BOX, box_id: item.id, state: PALLETS_STATUS.DELIVERED}

            await createInventoryMovement(inventoryMovement, ctx)
        }
        else {
            if(item) {
                await createScanEvent({
                    qrCode: gs1Code,
                    detectedType: merchandiseData.unit_type,
                    status: DEVICE_STATUS.ERROR,
                    confidence: merchandiseData.confidence
                }, ctx);

                throw new AppError("Unidad con existencia", 409, CODES.SCAN_EVENT.ALREADY_EXISTS);
            }

            await processNewMerchandise(decodedGS1, ctx);

             const inventoryMovement = order.unit_type == ORDER_UNIT_TYPES.PALLET
                ? { type: ITEM_TYPES.PALLET, pallet_id: item.id, state: PALLETS_STATUS.CREATED}
                : { type: ITEM_TYPES.BOX, box_id: item.id, state: PALLETS_STATUS.CREATED}

            await createInventoryMovement(inventoryMovement, ctx)
        }

        return await createScanEvent({
            qrCode: gs1Code,
            detectedType: merchandiseData.unit_type,
            status: DEVICE_STATUS.OK,
            confidence: merchandiseData.confidence
        }, ctx);
    },

);

// sub private functions 
// delivered logic
async function processOrder(order, item_id, ctx) {
    await updateOrder({ id: order.id, status: ORDER_STATUS.DELIVERED }, ctx);

    const unitUpdate = { id: item_id, status: PALLETS_STATUS.DELIVERED, location_id: null };

    return order.type === ORDER_UNIT_TYPES.PALLET
        ? await updatePallet(unitUpdate, ctx)
        : await updateBox(unitUpdate, ctx);
}

// new merchandise logic
async function processNewMerchandise(decodedGS1={}, ctx) {
    const product = await findProductByCode(decodedGS1.gtin, ctx);

    return decodedGS1.unit_type === ORDER_UNIT_TYPES.PALLET
        ? await createPallet({
            code: decodedGS1.code,           // (00)
            qrCode: decodedGS1.raw,
            quantityBox: decodedGS1.count37, // (37)
            quantityUnitsInBox: decodedGS1.count30, // (30)
            status: PALLETS_STATUS.CREATED,
            product_id: product.id,
        }, ctx)
        : await createBox({
            code: decodedGS1.code,
            qrCode: decodedGS1.raw,
            quantity: decodedGS1.count37,
            status: PALLETS_STATUS.CREATED,
            product_id: product.id,
        }, ctx);
}

//Missing take shoot to update all zones in warehosue 

//Missing order taken automation 