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

export const findByLocationId = repositoryHandler(
  palletRepository,
  async (locationId = "", ctx) => {
    return await db.Pallet.findAll({
      where: {
        location_id: locationId,
      },
      include: [{ model: db.Location, as: "Location" }],
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
