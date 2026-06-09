import { AppError } from "../errors/app_error.js";
import crypto from "crypto";
import { CODES } from "../utils/const/codes.js";
import {
  CONFIG_TYPE,
  DEVICE_STATUS,
  ITEM_TYPES,
  ORDER_STATUS,
  ORDER_TYPES,
  ORDER_UNIT_TYPES,
  PALLETS_STATUS,
  SCANNING_MODE_CONFIG,
  MOVEMENT_TYPE,
} from "../utils/const/status.js";
import { parseGS1 } from "../utils/gs1_util.js";
import { createBox, updateBox } from "./box_service.js";
import { createInventoryMovement } from "./inventory_movement_service.js";
import {
  findIncomingOrdersForReceiptService,
  findOutgoingOrdersForDispatchService,
  updateOrder,
} from "./order_service.js";
import { createPallet, updatePallet } from "./pallet_service.js";
import { findProductByCode, getProductById } from "./product_service.js";
import { createScanEvent } from "./scan_event_service.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { Log } from "../libs/logger/logger.js";
import { publishScanRequest } from "../libs/mqtt/mqtt_publisher.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { findByCode as findBoxByCode } from "../repositories/box_repository.js";
import { findByCode as findPalletByCode } from "../repositories/pallet_repository.js";
import { findByKeyAndWarehouseConfigParams } from "../service/config_params_service.js";
import { waitForScanResults } from "../libs/mqtt/wait_for_scan_result.js";
import { config } from "../config/config.js";
import {
  findAllByCategory,
  findAllExceptCategory,
} from "../repositories/location_repository.js";
import { SEARCH_MODE } from "../utils/const/searchMode.js";

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
    const item =
      decodedGS1.unit_type == ITEM_TYPES.PALLET
        ? await findPalletByCode(decodedGS1.code, ctx)
        : await findBoxByCode(decodedGS1.code, ctx);

    let resultItem = {};

    const orders = await findIncomingOrdersForReceiptService(
      cameraData.location.warehouse_id,
      decodedGS1.unit_type,
      decodedGS1.code,
      ORDER_STATUS.DISPATCHED,
      ctx,
    );

    if (orders && orders.length > 0) {
      const order = orders[0];
      await processDeliveredOrder(order, item.id, ctx);

      const inventoryMovement =
        order.unit_type == ITEM_TYPES.PALLET
          ? {
              type: ITEM_TYPES.PALLET,
              pallet_id: item.id,
              state: PALLETS_STATUS.DELIVERED,
            }
          : {
              type: ITEM_TYPES.BOX,
              box_id: item.id,
              state: PALLETS_STATUS.DELIVERED,
            };

      resultItem = item;
      await createInventoryMovement(inventoryMovement, ctx);
    } else {
      if (item) {
        await createScanEvent(
          {
            camera_id: cameraData.id,
            qrCode: decodedGS1.raw,
            detectedType: decodedGS1.unit_type,
            status: DEVICE_STATUS.ERROR,
            confidence: decodedGS1.confidence,
            type: MOVEMENT_TYPE.ENTRY,
            errorMessage: "Unidad con existencia",
            itemCode: decodedGS1.code,
            warehouseId: cameraData.location.warehouse_id,
            productId: item.product_id,
          },
          ctx,
        );

        throw new AppError(
          "Unidad con existencia",
          409,
          CODES.SCAN_EVENT.ALREADY_EXISTS,
        );
      }

      resultItem = await processNewMerchandise(
        decodedGS1,
        cameraData.location.warehouse_id,
        ctx,
      );

      Log.infoCtx(
        ctx,
        automationService + consoleKeys.StartKey,
        consoleKeys.RequestKey + "item:",
        decodedGS1,
      );

      const newItem =
        decodedGS1.unit_type == ITEM_TYPES.PALLET
          ? await findPalletByCode(decodedGS1.code, ctx)
          : await findBoxByCode(decodedGS1.code, ctx);

      const inventoryMovement =
        decodedGS1.unit_type == ITEM_TYPES.PALLET
          ? {
              type: ITEM_TYPES.PALLET,
              pallet_id: newItem.id,
              state: PALLETS_STATUS.CREATED,
            }
          : {
              type: ITEM_TYPES.BOX,
              box_id: newItem.id,
              state: PALLETS_STATUS.CREATED,
            };

      await createInventoryMovement(
        inventoryMovement,
        cameraData.location.id,
        ctx,
      );
    }

    Log.infoCtx(
      ctx,
      automationService + consoleKeys.StartKey,
      consoleKeys.RequestKey + "create scan event",
      decodedGS1,
    );

    return await createScanEvent(
      {
        camera_id: cameraData.id,
        qrCode: decodedGS1.raw,
        detectedType: decodedGS1.unit_type,
        status: DEVICE_STATUS.OK,
        confidence: decodedGS1.confidence,
        type: MOVEMENT_TYPE.ENTRY,
        itemCode: decodedGS1.code,
        warehouse_id: cameraData.location.warehouse_id,
        product_id: resultItem ? resultItem.product_id : null,
        order_id: orders && orders.length > 0 ? orders[0].id : null,
      },
      ctx,
    );
  },
);

// sub private functions
// delivered logic
async function processDeliveredOrder(order, item_id, ctx) {
  await updateOrder(
    {
      id: order.id,
      status: ORDER_STATUS.DELIVERED,
      total_delivered: order.total_delivered + 1,
    },
    ctx,
  );

  const unitUpdate = {
    id: item_id,
    status: PALLETS_STATUS.DELIVERED,
    warehouse_id: null,
  };

  return order.unit_type == ORDER_UNIT_TYPES.PALLET
    ? await updatePallet(unitUpdate, ctx)
    : await updateBox(unitUpdate, ctx);
}

// new merchandise logic
async function processNewMerchandise(decodedGS1 = {}, warehouse_id = "", ctx) {
  const product = await findProductByCode(decodedGS1.gtin, ctx);

  return decodedGS1.unit_type === ITEM_TYPES.PALLET
    ? await createPallet(
        {
          code: decodedGS1.code, // (00)
          qrCode: decodedGS1.raw,
          quantityBox: decodedGS1.count37, // (37)
          quantityUnitsInBox: decodedGS1.count30, // (30)
          status: PALLETS_STATUS.CREATED,
          product_id: product.id,
          warehouse_id: warehouse_id,
        },
        ctx,
      )
    : await createBox(
        {
          code: decodedGS1.code,
          qrCode: decodedGS1.raw,
          quantity: decodedGS1.count30,
          status: PALLETS_STATUS.CREATED,
          product_id: product.id,
          warehouse_id: warehouse_id,
        },
        ctx,
      );
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
      await createScanEvent(
        {
          camera_id: cameraData.id,
          qrCode: decodedGS1.raw,
          detectedType: decodedGS1.unit_type,
          status: DEVICE_STATUS.ERROR,
          confidence: decodedGS1.confidence,
          type: MOVEMENT_TYPE.EXIT,
          errorMessage: "Product not found",
          itemCode: decodedGS1.code,
          warehouse_id: cameraData.location?.warehouse_id,
        },
        ctx,
      );
      throw new AppError("Product not found", 404, CODES.PRODUCT.NOT_FOUND);
    }

    //find orders with current product
    const orders = await findOutgoingOrdersForDispatchService(
      cameraData.location.warehouse_id,
      decodedGS1.unit_type,
      productExistance.code,
      ORDER_STATUS.PENDING,
      ctx,
    );

    if (orders.length < 1) {
      await createScanEvent(
        {
          camera_id: cameraData.id,
          qrCode: decodedGS1.raw,
          detectedType: decodedGS1.unit_type,
          status: DEVICE_STATUS.ERROR,
          confidence: decodedGS1.confidence,
          type: MOVEMENT_TYPE.EXIT,
          errorMessage: "No existen ordenes pendientes para este producto",
          itemCode: decodedGS1.code,
          warehouse_id: cameraData.location?.warehouse_id,
          product_id: productExistance.id,
        },
        ctx,
      );
      throw new AppError(
        "No existen ordenes pendientes para este producto",
        404,
        CODES.ORDER.NOT_FOUND,
      );
    }

    const item = await processDispatchedItem(
      decodedGS1,
      cameraData,
      productExistance,
      ctx,
    );

    const isOrderCompleted =
      orders[0].total_dispatched + 1 >= orders[0].total_quantity;

    decodedGS1.unit_type == ITEM_TYPES.PALLET
      ? await orders[0].addPallet(item.id, { logging: false })
      : await orders[0].addBox(item.id, { logging: false });

    await updateOrder(
      {
        id: orders[0].id,
        status: isOrderCompleted
          ? ORDER_STATUS.DISPATCHED
          : ORDER_STATUS.PENDING,
        total_dispatched: orders[0].total_dispatched + 1,
      },
      ctx,
    );

    Log.infoCtx(
      ctx,
      automationService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      {
        id: orders[0].id,
        status: isOrderCompleted
          ? ORDER_STATUS.DISPATCHED
          : ORDER_STATUS.PENDING,
      },
    );

    return await createScanEvent(
      {
        camera_id: cameraData.id,
        qrCode: decodedGS1.raw,
        detectedType: decodedGS1.unit_type,
        status: DEVICE_STATUS.OK,
        confidence: decodedGS1.confidence,
        type: MOVEMENT_TYPE.EXIT,
        itemCode: decodedGS1.code,
        warehouse_id: cameraData.location?.warehouse_id,
        product_id: productExistance.id,
        order_id: orders[0].id,
      },
      ctx,
    );
  },
);

async function processDispatchedItem(
  decodedGS1 = {},
  cameraData = {},
  productExistance = {},
  ctx,
) {
  //find box or pallet
  const item =
    decodedGS1.unit_type == ITEM_TYPES.PALLET
      ? await findPalletByCode(decodedGS1.code, ctx)
      : await findBoxByCode(decodedGS1.code, ctx);

  if (!item) {
    await createScanEvent(
      {
        camera_id: cameraData.id,
        qrCode: decodedGS1.raw,
        detectedType: decodedGS1.unit_type,
        status: DEVICE_STATUS.ERROR,
        confidence: decodedGS1.confidence,
        type: MOVEMENT_TYPE.EXIT,
        errorMessage: "Unidad no encontrada",
        itemCode: decodedGS1.code,
        warehouse_id: cameraData.location?.warehouse_id,
        product_id: productExistance?.id,
      },
      ctx,
    );
    throw new AppError("Unidad no encontrada", 404, CODES.SCAN_EVENT.NOT_FOUND);
  }

  if (item.product_id !== productExistance.id) {
    await createScanEvent(
      {
        camera_id: cameraData.id,
        qrCode: decodedGS1.raw,
        detectedType: decodedGS1.unit_type,
        status: DEVICE_STATUS.ERROR,
        confidence: decodedGS1.confidence,
        type: MOVEMENT_TYPE.EXIT,
        errorMessage:
          "Inconsistencia: El bulto escaneado pertenece a otro producto",
        itemCode: decodedGS1.code,
        warehouse_id: cameraData.location?.warehouse_id,
        product_id: productExistance?.id,
      },
      ctx,
    );
    throw new AppError(
      "Inconsistencia: El bulto escaneado pertenece a otro producto",
      404,
      CODES.SCAN_EVENT.NOT_FOUND,
    );
  }

  if (item.status === PALLETS_STATUS.PP_DISPATCHED) {
    await createScanEvent(
      {
        camera_id: cameraData.id,
        qrCode: decodedGS1.raw,
        detectedType: decodedGS1.unit_type,
        status: DEVICE_STATUS.ERROR,
        confidence: decodedGS1.confidence,
        type: MOVEMENT_TYPE.EXIT,
        errorMessage: "Inconsistencia: El bulto se encuentra despachado",
        itemCode: decodedGS1.code,
        warehouse_id: cameraData.location?.warehouse_id,
        product_id: productExistance?.id,
      },
      ctx,
    );
    throw new AppError(
      "Inconsistencia: El bulto ya se encuentra en proceso de despacho",
      400,
      CODES.SCAN_EVENT.INVALID_STATUS,
    );
  }

  const updateItemRequest = {
    id: item.id,
    status: PALLETS_STATUS.PP_DISPATCHED,
    warehouse_id: null,
  };

  decodedGS1.unit_type == ITEM_TYPES.PALLET
    ? await updatePallet(updateItemRequest, ctx)
    : await updateBox(updateItemRequest, ctx);

  const inventoryMovement =
    decodedGS1.unit_type == ITEM_TYPES.PALLET
      ? {
          type: ITEM_TYPES.PALLET,
          pallet_id: item.id,
          state: PALLETS_STATUS.PP_DISPATCHED,
        }
      : {
          type: ITEM_TYPES.BOX,
          box_id: item.id,
          state: PALLETS_STATUS.PP_DISPATCHED,
        };

  await createInventoryMovement(inventoryMovement, ctx);

  return item;
}

export const searchProductInZones = async (data = {}, ctx) => {
  Log.infoCtx(ctx, automationService + consoleKeys.StartKey, "REQUEST", data);

  const product = await getProductById(data.productId, ctx);

  if (!product) {
    throw new AppError("El producto no existe", 404, CODES.PRODUCT.NOT_FOUND);
  }

  let zones;
  if (data.searchLevel === SEARCH_MODE.PRIMARY_ZONE) {
    zones = await findAllByCategory(data.category, ctx);
  } else {
    zones = await findAllExceptCategory(data.category, ctx);
  }

  const cameraCodes = buildCameraCodes(zones);

  if (cameraCodes.length === 0) {
    throw new AppError(
      "No hay cámaras activas para la categoría: " + data.category,
      400,
      CODES.CAMERA.NOT_ACTIVE,
    );
  }

  const correlationId = crypto.randomUUID();

  await publishScanRequest({
    cameras: cameraCodes,
    correlationId,
  });

  Log.infoCtx(ctx, automationService + "MQTT", "PUBLISH", {
    cameras: cameraCodes,
    correlationId,
  });

  const scanResult = await waitForScanResults(
    correlationId,
    product.code,
    cameraCodes,
    config.timeoutMqtt,
  );

  if (!scanResult) {
    throw new AppError(
      "No se encontraron existencias",
      400,
      CODES.PRODUCT.NOT_MATCH,
    );
  }

  Log.infoCtx(
    ctx,
    automationService + consoleKeys.SuccessKey,
    consoleKeys.ResponseKey,
    scanResult,
  );

  const { detections, respondedCameras, pendingCameras } = scanResult;
  let status = "not found";
  if (detections.length > 0) status = "found";

  if (pendingCameras.length > 0) status = "partial response";

  Log.infoCtx(ctx, automationService + consoleKeys.EndKey);

  const matchedCameras = detections.map((d) => d.cameraCode);

  return {
    status,
    correlationId,
    product: {
      id: product.id,
      code: product.code,
      name: product.name,
      category: product.category,
    },
    matchedCameras,
    respondedCameras,
    notRespondedCameras: pendingCameras,
    scannedAt: new Date().toISOString(),
  };
};

export const buildCameraCodes = (locations) => {
  return locations.flatMap((location) =>
    location.Cameras.map((camera) => camera.code),
  );
};

export const inventoryAutomationService = serviceHandler(
  automationService,
  CODES.SCAN_EVENT.NOT_FOUND,
  async (gs1Code = "", cameraData = {}, ctx) => {
    Log.infoCtx(
      ctx,
      automationService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      gs1Code,
    );

    const warehouseConfig = await findByKeyAndWarehouseConfigParams(
      CONFIG_TYPE.SCANNING_MODE,
      cameraData.location.warehouse_id,
      ctx,
    );

    if (warehouseConfig.value == SCANNING_MODE_CONFIG.ENTRY)
      return await registerMerchandiseService(gs1Code, cameraData, ctx);
    else return await dispatchMerchandiseService(gs1Code, cameraData, ctx);
  },
);
