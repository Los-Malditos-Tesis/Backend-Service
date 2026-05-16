import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const palletRepository = "pallet repository: ";

export const save = repositoryHandler(
  palletRepository,
  async (pallet = {}, transaction = {}, ctx) => {
    return await db.Pallet.create(pallet, { transaction });
  },
);

export const findAll = repositoryHandler(
  palletRepository,
  async (transaction = {}, ctx) => {
    return await db.Pallet.findAll({ transaction });
  },
);

export const findById = repositoryHandler(
  palletRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Pallet.findByPk(id, { transaction });
  },
);

export const findByQrCode = repositoryHandler(
  palletRepository,
  async (qrCode = "", transaction = {}, ctx) => {
    return await db.Pallet.findOne({
      where: {
        qrCode: qrCode,
      },
      transaction,
    });
  },
);

export const findByCode = repositoryHandler(
  palletRepository,
  async (code = "", transaction = {}, ctx) => {
    return await db.Pallet.findOne({
      where: {
        code: code,
      },
      transaction,
    });
  },
);

export const findByStatus = repositoryHandler(
  palletRepository,
  async (status = PALLETS_STATUS.CREATED, transaction = {}, ctx) => {
    return await db.Pallet.findAll({
      where: {
        status: status,
      },
      transaction,
    });
  },
);

export const findByLocationId = repositoryHandler(
  palletRepository,
  async (locationId = "", transaction = {}, ctx) => {
    return await db.Pallet.findAll({
      where: {
        location_id: locationId,
      },
      include: [{ model: db.Location, as: "Location" }],
      transaction,
    });
  },
);

export const findHistoryByPalletId = repositoryHandler(
  palletRepository,
  async (palletId = "", transaction = {}, ctx) => {
    return await db.Pallet.findAll({
      where: {
        id: palletId,
      },
      include: [{ model: db.InventoryMovement, as: "InventoryMovements" }],
      transaction,
    });
  },
);

export const deleteById = repositoryHandler(
  palletRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Pallet.destroy({
      where: {
        id: id,
      },
      transaction,
    });
  },
);

export const update = repositoryHandler(
  palletRepository,
  async (id = "", data = {}, transaction = {}, ctx) => {
    const updated = await db.Pallet.update(data, {
      where: {
        id: id,
      },
      transaction,
    });
    return updated;
  },
);

export const findByProductId = repositoryHandler(
  palletRepository,
  async (productId = "", transaction = {}, ctx) => {
    return await db.Pallet.findOne({
      where: {
        product_id: productId,
      },
      order: [["createdAt", "ASC"]],
      transaction,
    });
  },
);
