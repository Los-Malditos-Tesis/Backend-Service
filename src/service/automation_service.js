import { decode } from "jsonwebtoken";
import { AppError } from "../errors/app_error.js";
import { CODES } from "../utils/const/codes.js";
import { DEVICE_STATUS, ITEM_TYPES, ORDER_STATUS, ORDER_TYPES, ORDER_UNIT_TYPES, PALLETS_STATUS } from "../utils/const/status.js";
import { parseGS1 } from "../utils/gs1_util.js";
import { createBox, updateBox } from "./box_service.js";
import { createInventoryMovement } from "./inventory_movement_service.js";
import { findOrdersByWarehouseAndStatus, findOrdersByWarehouseAndStatusWithProduct, updateOrder } from "./order_service.js";
import { createPallet, updatePallet } from "./pallet_service.js";
import { findProductByCode, getProductById } from "./product_service.js"
import { createScanEvent } from "./scan_event_service.js"
import { serviceHandler } from "../utils/handler/service_handler.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { findByCode as findBoxByCode } from "../repositories/box_repository.js"
import { findByCode as findPalletByCode } from "../repositories/pallet_repository.js"


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

        const decodedGS1 = parseGS1(gs1Code);
        if (!decodedGS1) {
            throw new AppError("Invalid GS1 code", 400, CODES.GS1.INVALID);
        }

        //check if item exists in warehosue 
        const item = decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET
            ? await findPalletByCode(decodedGS1.code, ctx)
            : await findBoxByCode(decodedGS1.code, ctx);


        const orders = await findOrdersByWarehouseAndStatus(
            cameraData.location.warehouse_id,
            decodedGS1.unit_type,
            decodedGS1.code,
            ORDER_STATUS.DISPATCHED,
            ctx
        );

        if (orders && orders.length > 0) {
            const order = orders[0];
            await processDeliveredOrder(order, item.id, ctx);

            const inventoryMovement = order.unit_type == ORDER_UNIT_TYPES.PALLET
                ? { type: ITEM_TYPES.PALLET, pallet_id: item.id, state: PALLETS_STATUS.DELIVERED }
                : { type: ITEM_TYPES.BOX, box_id: item.id, state: PALLETS_STATUS.DELIVERED }

            await createInventoryMovement(inventoryMovement, ctx)
        }
        else {
            if (item) {
                Log.infoCtx(
                    ctx,
                    automationService + consoleKeys.StartKey,
                    consoleKeys.RequestKey + "create scan event",
                    decodedGS1,
                );
                await createScanEvent({
                    camera_id: cameraData.id,
                    qrCode: decodedGS1.raw,
                    detectedType: decodedGS1.unit_type,
                    status: DEVICE_STATUS.ERROR,
                    confidence: decodedGS1.confidence
                }, ctx);

                throw new AppError("Unidad con existencia", 409, CODES.SCAN_EVENT.ALREADY_EXISTS);
            }
            Log.infoCtx(
                ctx,
                automationService + consoleKeys.StartKey,
                consoleKeys.RequestKey + "create scan event",
                decodedGS1,
            );

            await processNewMerchandise(decodedGS1, ctx);

            Log.infoCtx(
                ctx,
                automationService + consoleKeys.StartKey,
                consoleKeys.RequestKey + "process new merchandise",
                decodedGS1,
            );

            const newItem = decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET
                ? await findPalletByCode(decodedGS1.code, ctx)
                : await findBoxByCode(decodedGS1.code, ctx);


            const inventoryMovement = decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET
                ? { type: ITEM_TYPES.PALLET, pallet_id: newItem.id, state: PALLETS_STATUS.CREATED }
                : { type: ITEM_TYPES.BOX, box_id: newItem.id, state: PALLETS_STATUS.CREATED }

            Log.infoCtx(
                ctx,
                automationService + consoleKeys.StartKey,
                consoleKeys.RequestKey + "create scan event",
                decodedGS1,
            );

            await createInventoryMovement(inventoryMovement, ctx)
        }

        Log.infoCtx(
            ctx,
            automationService + consoleKeys.StartKey,
            consoleKeys.RequestKey + "create scan event",
            decodedGS1,
        );

        return await createScanEvent({
            camera_id: cameraData.id,
            qrCode: gs1Code,
            detectedType: decodedGS1.unit_type,
            status: DEVICE_STATUS.OK,
            confidence: decodedGS1.confidence
        }, ctx);
    },

);

// sub private functions 
// delivered logic
async function processDeliveredOrder(order, item_id, ctx) {
    await updateOrder({ id: order.id, status: ORDER_STATUS.DELIVERED, total_delivered: order.total_delivered + 1 }, ctx);

    const unitUpdate = { id: item_id, status: PALLETS_STATUS.DELIVERED, location_id: null };

    return order.type === ORDER_UNIT_TYPES.PALLET
        ? await updatePallet(unitUpdate, ctx)
        : await updateBox(unitUpdate, ctx);
}

// new merchandise logic
async function processNewMerchandise(decodedGS1 = {}, ctx) {
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
            quantity: decodedGS1.count30,
            status: PALLETS_STATUS.CREATED,
            product_id: product.id,
        }, ctx);
}

//Missing take shoot to update all zones in warehosue

//Missing order taken automation 
export const dispatchMerchandiseService = serviceHandler(
    automationService,
    CODES.SCAN_EVENT.NOT_FOUND,
    async (gs1Code = "", cameraData = {}, ctx) => {
        Log.infoCtx(
            ctx,
            automationService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            gs1Code,
        );

        const decodedGS1 = parseGS1(gs1Code);
        if (!decodedGS1) {
            throw new AppError("Invalid GS1 code", 400, CODES.GS1.INVALID);
        }

        const productExistance = await findProductByCode(decodedGS1.gtin, ctx);
        if (!productExistance) {
            await createScanEvent({
                qrCode: decodedGS1.raw,
                detectedType: decodedGS1.unit_type,
                status: DEVICE_STATUS.ERROR,
                confidence: decodedGS1.confidence
            }, ctx);
            throw new AppError("Product not found", 404, CODES.PRODUCT.NOT_FOUND);
        }

        //find orders with current product 
        const orders = await findOrdersByWarehouseAndStatusWithProduct(
            cameraData.location.warehouse_id,
            productExistance.id,
            ORDER_STATUS.PENDING,
            ctx
        );

        if (orders.length < 1) {
            await createScanEvent({
                qrCode: gs1Code,
                detectedType: decodedGS1.unit_type,
                status: DEVICE_STATUS.ERROR,
                confidence: decodedGS1.confidence
            }, ctx);
            throw new AppError("No pending orders found for this product", 404, CODES.ORDER.NOT_FOUND);
        }

        const item = await processDispatchedItem(decodedGS1, ctx);

        const isOrderCompleted = decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET
            ? orders[0].pallets.length > orders[0].total_quantity - 1
            : orders[0].boxes.length > orders[0].total_quantity - 1;

        decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET
            ? await orders[0].addPallet(item.id, { logging: false })
            : await orders[0].addBox(item.id), { logging: false };


        await updateOrder({ id: orders[0].id, status: isOrderCompleted ? ORDER_STATUS.DISPATCHED : ORDER_STATUS.PENDING }, ctx);

        Log.infoCtx(
            ctx,
            automationService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            { id: orders[0].id, status: isOrderCompleted ? ORDER_STATUS.DISPATCHED : ORDER_STATUS.PENDING },
        );

        return await createScanEvent({
            qrCode: decodedGS1.raw,
            detectedType: decodedGS1.unit_type,
            status: DEVICE_STATUS.OK,
            confidence: decodedGS1.confidence
        }, ctx);
    }
);

async function processDispatchedItem(decodedGS1 = {}, ctx) {
    //find box or pallet 
    const item = decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET
        ? await findPalletByCode(decodedGS1.code, ctx)
        : await findBoxByCode(decodedGS1.code, ctx);

    if (!item) {
        await createScanEvent({
            qrCode: decodedGS1.raw,
            detectedType: decodedGS1.unit_type,
            status: DEVICE_STATUS.ERROR,
            confidence: decodedGS1.confidence
        }, ctx);
        throw new AppError("Item not found", 404, CODES.SCAN_EVENT.NOT_FOUND);
    }

    const updateItemRequest = {
        id: item.id,
        status: PALLETS_STATUS.PP_DISPATCHED,
        location_id: null
    }

    decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET
        ? await updatePallet(updateItemRequest, ctx)
        : await updateBox(updateItemRequest, ctx);

    const inventoryMovement = decodedGS1.unit_type == ORDER_UNIT_TYPES.PALLET
        ? { type: ITEM_TYPES.PALLET, pallet_id: item.id, state: PALLETS_STATUS.PP_DISPATCHED }
        : { type: ITEM_TYPES.BOX, box_id: item.id, state: PALLETS_STATUS.PP_DISPATCHED }

    await createInventoryMovement(inventoryMovement, ctx)

    return item;
}