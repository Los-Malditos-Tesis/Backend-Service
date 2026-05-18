import db from "../models/index.js";
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { ORDER_STATUS, ORDER_TYPES, ORDER_UNIT_TYPES } from "../utils/const/status.js";
import { Log } from "../libs/logger/logger.js";

const orderRepository = "order repository: ";

export const create = repositoryHandler(
  orderRepository,
  async (order = {}, ctx) => {
    return await db.Order.create(order);
  },
);

export const findById = repositoryHandler(
  orderRepository,
  async (id = "", ctx) => {
    return await db.Order.scope("withBoxes", "withPallets").findByPk(id, {
      attributes: {
        exclude: ["deleted_at"],
      },
    });
  },
);

export const searchOrders = repositoryHandler(
  orderRepository,
  async (query = "", limit = 10, page = 1, ctx) => {
    const offset = (page - 1) * limit;

    const { id, type, status, unit_type, destination_warehouse_id, origin_warehouse_id, store_id } = query;

    const where = {
      deleted_at: null,
    };

    if (id) where.id = id;
    if (type) where.type = type;
    if (status) where.status = status;
    if (unit_type) where.unit_type = unit_type;
    if (origin_warehouse_id && destination_warehouse_id) {
      where[Op.or] = [
        { origin_warehouse_id },
        { destination_warehouse_id }
      ];
    } else {
      if (origin_warehouse_id) where.origin_warehouse_id = origin_warehouse_id;
      if (destination_warehouse_id) where.destination_warehouse_id = destination_warehouse_id;
    }
    if (store_id) where.store_id = store_id;

    const { rows, count } = await db.Order.findAndCountAll({
      where,
      include: [
        { model: db.Product, attributes: ["id", "code", "name", "sku"] },
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
      attributes: {
        exclude: ["deleted_at"],
      },
    });

    return {
      items: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  },
);

export const update = repositoryHandler(
  orderRepository,
  async (data = {}, order = {}, ctx) => {
    const updated = await order.update(data);
    return updated;
  },
);

export const remove = repositoryHandler(
  orderRepository,
  async (order = {}, ctx) => {
    await order.destroy();
    return { id: order.id };
  },
);

export const findByStatus = repositoryHandler(
  orderRepository,
  async (status = "PENDING", ctx) => {
    return await db.Order.findAll({
      where: { status, deleted_at: null },
      order: [["created_at", "DESC"]],
    });
  },
);

export const findByWarehouseAndStatus = repositoryHandler(
  orderRepository,
  async (warehouse_id = "", orderUnitType = "", merchandise_code = "", status = "", ctx) => {
    const isPallet = orderUnitType == ORDER_UNIT_TYPES.PALLET

    const where = { status, deleted_at: null }
    if (warehouse_id) where.origin_warehouse_id = warehouse_id;

    return await db.Order.findAll({
      where,
      include: [
        {
          model: isPallet ? db.Pallet : db.Box,
          as: isPallet ? "pallets" : "boxes",
          attributes: ["id", "qrCode", "code"],
          where: { code: merchandise_code },
          required: true,
          through: {
            attributes: []
          }
        }
      ],
      order: [["created_at", "DESC"]],
    });
  },
);

export const findByWarehouseAndStatusWithProduct = repositoryHandler(
  orderRepository,
  async (origin_warehouse_id = "", product_id = "", status = "", ctx) => {
    return await db.Order.findAll({
      where: { origin_warehouse_id, status, product_id, deleted_at: null },
      include: [
        {
          model: db.Pallet,
          as: "pallets",
          attributes: ["id"]
        },
        {
          model: db.Box,
          as: "boxes",
          attributes: ["id"]
        }
      ],
      order: [["created_at", "DESC"]],
    });
  }
);