import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { getWarehouseById } from "./warehouse_service.js";
import { ORDER_TYPES, ORDER_STATUS } from "../utils/const/status.js";
import {
  create,
  findById,
  remove,
  searchOrders,
} from "../repositories/order_repository.js";

const orderService = "order service: ";

export const createOrder = serviceHandler(
  orderService,
  CODES.ORDER.NOT_FOUND,
  async (data = {}, ctx) => {
    Log.infoCtx(
      ctx,
      orderService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      data,
    );

    const {
      type,
      unit_type,
      warehouse_id,
      destination_warehouse_id,
      store_id,
    } = data;

    //tipo TRANSFER necesita warehouse destino
    if (type === ORDER_TYPES.TRANSFER && !destination_warehouse_id) {
      throw new AppError(
        "TRANSFER orders require a destination warehouse",
        400,
        CODES.RESOURCE.INVALID_OPERATION,
      );
    }

    //tipo SALE necesita tienda
    if (type === ORDER_TYPES.SALE && !store_id) {
      throw new AppError(
        "SALE orders require a destination store",
        400,
        CODES.RESOURCE.INVALID_OPERATION,
      );
    }

    // validar warehouse origen
    const warehouse = await getWarehouseById(warehouse_id, ctx);
    if (!warehouse) {
      throw new AppError(
        "Origin warehouse not found",
        404,
        CODES.RESOURCE.NOT_FOUND,
      );
    }

    const order = await create(
      {
        ...data,
        total_quantity: 0,
        status: "PENDING",
      },
      ctx,
    );

    Log.infoCtx(
      ctx,
      orderService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      order,
    );

    return order;
  },
);

export const getOrderById = serviceHandler(
  orderService,
  CODES.ORDER.NOT_FOUND,
  async (id = "", ctx) => {
    Log.infoCtx(
      ctx,
      orderService + consoleKeys.StartKey,
      consoleKeys.ParamKey,
      req.params,
    );

    const order = await findById(id, ctx);

    if (!order) {
      throw new AppError(
        "La orden no fue encontrada",
        404,
        CODES.ORDER.NOT_FOUND,
      );
    }

    Log.infoCtx(
      ctx,
      orderService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      order,
    );

    return order;
  },
);

export const searchCameras = serviceHandler(
  orderService,
  CODES.CAMERA.NOT_FOUND,
  async (query = "", ctx) => {
    Log.infoCtx(
      ctx,
      orderService + consoleKeys.StartKey,
      consoleKeys.ParamKey,
      query,
    );

    if (query.page < 1 || query.limit < 1)
      throw new AppError(
        "Numero de paginacion invalido",
        400,
        CODES.RESOURCE.INVALID_OPERATION,
      );

    const orders = await searchOrders(query, query.limit, query.page, ctx);

    Log.infoCtx(
      ctx,
      orderService + consoleKeys.SuccessKey,
      consoleKeys.InformationKey,
      orders,
    );
    return orders;
  },
);

export const updateOrder = serviceHandler(
  orderService,
  CODES.ORDER.NOT_FOUND,
  async (data = {}, ctx) => {
    Log.infoCtx(
      ctx,
      orderService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      data,
    );

    const order = await findById(data.id, ctx);

    if (!order) {
      throw new AppError(
        "La orden no fue encontrada",
        404,
        CODES.ORDER.NOT_FOUND,
      );
    }

    if (
      [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED].includes(order.status)
    ) {
      throw new AppError(
        "Cannot modify a completed or cancelled order",
        400,
        CODES.RESOURCE.INVALID_OPERATION,
      );
    }

    const updatedOrder = await updateOrder(data, order, ctx);

    Log.infoCtx(
      ctx,
      orderService + consoleKeys.SuccessKey,
      consoleKeys.InformationKey,
      updatedOrder,
    );
    return updatedOrder;
  },
);

export const changeOrderStatus = serviceHandler(
  orderService,
  CODES.CAMERA.NOT_FOUND,
  async (id = "", status = "", ctx) => {
    Log.infoCtx(
      ctx,
      orderService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { id, status },
    );

    const order = await findById(id, ctx);

    if (!order) {
      throw new AppError(
        "La orden no fue encontrada",
        404,
        CODES.ORDER.NOT_FOUND,
      );
    }

    const validTransitions = {
      [ORDER_STATUS.PENDING]: [ORDER_STATUS.SHIPPED, ORDER_STATUS.CANCELLED],
      [ORDER_STATUS.SHIPPED]: [ORDER_STATUS.DELIVERED],
      [ORDER_STATUS.DELIVERED]: [],
      [ORDER_STATUS.CANCELLED]: [],
    };

    if (!validTransitions[order.status]?.includes(status)) {
      throw new AppError(
        `Invalid status transition from ${order.status} to ${status}`,
        400,
        CODES.RESOURCE.INVALID_OPERATION,
      );
    }

    const updatedOrder = await updateOrder({ status }, order, ctx);

    Log.infoCtx(
      ctx,
      orderService + consoleKeys.SuccessKey,
      consoleKeys.InformationKey,
      updatedOrder,
    );
    return updatedOrder;
  },
);

export const deleteOrder = serviceHandler(
  orderService,
  CODES.CAMERA.NOT_FOUND,
  async (id = "", ctx) => {
    Log.infoCtx(
      ctx,
      orderService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      { id },
    );

    const order = await findById(id, ctx);

    if (!order) {
      throw new AppError(
        "La orden no fue encontrada",
        404,
        CODES.ORDER.NOT_FOUND,
      );
    }

    if (
      order.status === ORDER_STATUS.SHIPPED ||
      order.status === ORDER_STATUS.DELIVERED
    ) {
      throw new AppError(
        "Cannot delete shipped or delivered orders",
        400,
        CODES.RESOURCE.INVALID_OPERATION,
      );
    }

    const deleted = await remove(order, ctx);

    Log.infoCtx(
      ctx,
      orderService + consoleKeys.SuccessKey,
      consoleKeys.InformationKey,
      deleted,
    );
    return deleted;
  },
);
