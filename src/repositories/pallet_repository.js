import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const palletRepository = "pallet repository: ";

export const save = repositoryHandler(
  palletRepository,
  async (pallet = {}, ctx) => {
    return await db.Pallet.create(pallet);
  },
);

export const findAll = repositoryHandler(palletRepository, async (ctx) => {
  return await db.Pallet.findAll();
});

export const findById = repositoryHandler(
  palletRepository,
  async (id = "", ctx) => {
    return await db.Pallet.findByPk(id);
  },
);

export const findByQrCode = repositoryHandler(
  palletRepository,
  async (qrCode = "", ctx) => {
    return await db.Pallet.findOne({
      where: {
        qrCode: qrCode,
      },
    });
  },
);

export const findByCode = repositoryHandler(
  palletRepository,
  async (code = "", ctx) => {
    return await db.Pallet.findOne({
      where: {
        code: code,
      },
    });
  },
);

export const findByStatus = repositoryHandler(
  palletRepository,
  async (status = PALLETS_STATUS.CREATED, ctx) => {
    return await db.Pallet.findAll({
      where: {
        status: status,
      },
    });
  },
);

export const findByWarehouseId = repositoryHandler(
  palletRepository,
  async (warehouse_id = "", ctx) => {
    return await db.Pallet.findAll({
      where: {
        warehouse_id: warehouse_id,
      },
      include: [{ model: db.Warehouse, as: "Warehouse" }],
    });
  },
);

export const findHistoryByPalletId = repositoryHandler(
  palletRepository,
  async (palletId = "", ctx) => {
    return await db.Pallet.findAll({
      where: {
        id: palletId,
      },
      include: [{ model: db.InventoryMovement, as: "InventoryMovements" }],
    });
  },
);

export const deleteById = repositoryHandler(
  palletRepository,
  async (id = "", ctx) => {
    return await db.Pallet.destroy({
      where: {
        id: id,
      },
    });
  },
);

export const update = repositoryHandler(
  palletRepository,
  async (id = "", data = {}, ctx) => {
    const updated = await db.Pallet.update(data, {
      where: {
        id: id,
      },
    });
    return updated;
  },
);

export const findByProductId = repositoryHandler(
  palletRepository,
  async (productId = "", ctx) => {
    return await db.Pallet.findOne({
      where: {
        product_id: productId,
      },
      order: [["createdAt", "ASC"]],
    });
  },
);

export const search = repositoryHandler(
  palletRepository,
  async (query = {}, limit = 10, page = 1, ctx) => {
    const offset = (page - 1) * limit;
    const { code, qrCode, status, warehouse_id, product_id } = query;
    const whereClause = {};

    if (code) whereClause.code = { [db.Sequelize.Op.iLike]: `%${code}%` };
    if (qrCode) whereClause.qrCode = { [db.Sequelize.Op.iLike]: `%${qrCode}%` };
    if (status) whereClause.status = status;
    if (warehouse_id) whereClause.warehouse_id = warehouse_id;
    if (product_id) whereClause.product_id = product_id;

    const { rows, count } = await db.Pallet.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        { model: db.Warehouse, as: "Warehouse" },
        { model: db.Product, as: "Product" }
      ]
    });

    return {
      items: rows,
      total: count,
    };
  },
);

