import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { PALLETS_STATUS } from "../utils/const/status.js";

const boxRepository = "box repository: ";

export const save = repositoryHandler(
  boxRepository,
  async (box = {}, transaction = {}, ctx) => {
    return await db.Box.create(box, { transaction });
  },
);

export const findAll = repositoryHandler(
  boxRepository,
  async (options = {}, transaction = {}, ctx) => {
    return await db.Box.findAll({
      limit: safeLimit,
      offset,
      transaction,
      order: [["created_at", "DESC"]],
      ...options,
    });
  },
);

export const findById = repositoryHandler(
  boxRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Box.findByPk(id, { transaction });
  },
);

export const findByQrCode = repositoryHandler(
  boxRepository,
  async (qrCode = "", transaction = {}, ctx) => {
    return await db.Box.findOne({
      where: {
        qrCode: qrCode,
      },
      transaction,
    });
  },
);

export const findByPallet = repositoryHandler(
  boxRepository,
  async (palletId = "", transaction = {}, ctx) => {
    return await db.Box.findAll({
      where: {
        pallet_id: palletId,
      },
      transaction,
    });
  },
);

export const findByProductId = repositoryHandler(
  boxRepository,
  async (productId = "", limit = 10, transaction = {}, ctx) => {
    return await db.Box.findAll({
      where: {
        product_id: productId,
        status: PALLETS_STATUS.CREATED,
      },
      include: [{ model: db.Product, as: "Product" }],
      limit: limit,
      order: [["created_at", "ASC"]],
      transaction,
    });
  },
);

export const findHistoryByBoxId = repositoryHandler(
  boxRepository,
  async (boxId = "", transaction = {}, ctx) => {
    return await db.Box.findAll({
      where: {
        id: boxId,
      },
      include: [{ model: db.InventoryMovement, as: "InventoryMovements" }],
      transaction,
    });
  },
);

export const deleteById = repositoryHandler(
  boxRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Box.destroy({
      where: {
        id: id,
      },
      transaction,
    });
  },
);

export const update = repositoryHandler(
  boxRepository,
  async (id = "", data = {}, transaction = {}, ctx) => {
    const [updated] = await db.Box.update(data, {
      where: {
        id: id,
      },
      transaction,
    });
    return updated;
  },
);

export const findByCode = repositoryHandler(
  boxRepository,
  async (code = "", transaction = {}, ctx) => {
    return await db.Box.findOne({
      where: {
        code: code,
      },
      transaction,
    });
  },
);
