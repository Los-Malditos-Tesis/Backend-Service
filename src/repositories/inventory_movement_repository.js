import db from "../models/index.js";
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const inventoryMovementRepository = "inventory movement repository: ";

export const save = repositoryHandler(
  inventoryMovementRepository,
  async (inventoryMovement = {}, transaction = {}, ctx) => {
    return await db.InventoryMovement.create(inventoryMovement, {
      transaction,
    });
  },
);

export const findAll = repositoryHandler(
  inventoryMovementRepository,
  async (transaction = {}, ctx) => {
    return await db.InventoryMovement.findAll({ transaction });
  },
);

export const findById = repositoryHandler(
  inventoryMovementRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.InventoryMovement.findByPk(id, { transaction });
  },
);

export const findByTimeRange = repositoryHandler(
  inventoryMovementRepository,
  async (startTime = "", endTime = "", transaction = {}, ctx) => {
    return await db.InventoryMovement.findAll({
      where: {
        createdAt: {
          [Op.between]: [startTime, endTime],
        },
      },
      transaction,
    });
  },
);

export const deleteById = repositoryHandler(
  inventoryMovementRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.InventoryMovement.destroy({
      where: {
        id: id,
      },
      transaction,
    });
  },
);
