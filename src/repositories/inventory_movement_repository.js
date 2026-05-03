import db from "../models/index.js";
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const inventoryMovementRepository = "inventory movement repository: ";

export const save = repositoryHandler(
  inventoryMovementRepository,
  async (inventoryMovement = {}, ctx) => {
    return await db.InventoryMovement.create(inventoryMovement);
  },
);

export const findAll = repositoryHandler(
  inventoryMovementRepository,
  async (ctx) => {
    return await db.InventoryMovement.findAll();
  },
);

export const findById = repositoryHandler(
  inventoryMovementRepository,
  async (id = "", ctx) => {
    return await db.InventoryMovement.findByPk(id);
  },
);

export const findByTimeRange = repositoryHandler(
  inventoryMovementRepository,
  async (startTime = "", endTime = "", ctx) => {
    return await db.InventoryMovement.findAll({
      where: {
        createdAt: {
          [Op.between]: [startTime, endTime],
        },
      },
    });
  },
);

export const deleteById = repositoryHandler(
  inventoryMovementRepository,
  async (id = "", ctx) => {
    return await db.InventoryMovement.destroy({
      where: {
        id: id,
      },
    });
  },
);
