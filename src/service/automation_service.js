import { AppError } from "../errors/app_error.js";
import { CODES } from "../utils/const/codes";
import { DEVICE_STATUS, ORDER_STATUS, ORDER_TYPES, ORDER_UNIT_TYPES, PALLETS_STATUS } from "../utils/const/status";
import { findPendingOrdersByWarehouse, updateOrder } from "./order_service";
import { createPallet, updatePallet } from "./pallet_service";
import { getProductById} from "./product_service.js"
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

        const orders = await findPendingOrdersByWarehouse(
            cameraData.warehouse_id,
            decodedGS1.unit_type,
            decodedGS1.code,
            ctx
        );
        
        if (orders && orders.length > 0) {
                const order = orders[0];
                
                await updateOrder({ 
                    id: order.id, 
                    status: ORDER_STATUS.SHIPPED 
                }, ctx);

                if (order.type !== ORDER_UNIT_TYPES.BOX) {
                    await updatePallet({ 
                        id: merchandiseData.id, 
                        status: PALLETS_STATUS.DELIVERED, 
                        location_id: null 
                    }, ctx);
                }
        }
        else {
                const product = await getProductById(merchandiseData.productCode, ctx);
                
                if (merchandiseData.unit_type === ORDER_UNIT_TYPES.PALLET) {
                    const palletRequest = {
                        code: decodedGS1.sscc,           // (00)
                        qrCode: gs1Code,
                        quantityBox: decodedGS1.count37, // (37)
                        quantityUnitsInBox: decodedGS1.count30, // (30)
                        status: PALLETS_STATUS.CREATED,
                        product_id: product.id,
                    };
                    await createPallet(palletRequest, { transaction: trx });
                }
            }
        
       return await createScanEvent({
                qrCode: gs1Code,
                detectedType: merchandiseData.unit_type,
                status: DEVICE_STATUS.OK,
                confidence: merchandiseData.confidence
            }, ctx);
    },
    
);