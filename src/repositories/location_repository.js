import db from "../models/index.js";
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { PALLETS_STATUS } from "../utils/const/status.js";

const locationRepository = "location repository: ";

export const save = repositoryHandler(
  locationRepository,
  async (location = {}, transaction = {}, ctx) => {
    const [result] = await db.Location.upsert(location, { transaction });
    return result;
  },
);

export const findAll = repositoryHandler(
  locationRepository,
  async (transaction = {}, ctx) => {
    return await db.Location.findAll({ transaction });
  },
);

export const findById = repositoryHandler(
  locationRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Location.findByPk(id, { transaction });
  },
);

export const findByZone = repositoryHandler(
  locationRepository,
  async (zone = "", transaction = {}, ctx) => {
    return await db.Location.findOne({
      where: {
        zone: zone,
      },
      transaction,
    });
  },
);

export const findZonePallets = repositoryHandler(
  locationRepository,
  async (zone = "", transaction = {}, ctx) => {
    return await db.Location.findOne({
      where: {
        zone: zone,
      },
      include: [
        {
          model: db.Pallet,
          as: "Pallets",
          include: [
            {
              model: db.Box,
              as: "Boxes",
              include: [{ model: db.Product, as: "Product" }],
            },
          ],
        },
      ],
      transaction,
    });
  },
);

export const findByWarehouseId = repositoryHandler(
  locationRepository,
  async (warehouseId = "", transaction = {}, ctx) => {
    return await db.Location.findAll({
      where: {
        warehouse_id: warehouseId,
      },
      include: [{ model: db.Warehouse, as: "Warehouse" }],
      transaction,
    });
  },
);

export const deleteById = repositoryHandler(
  locationRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Location.destroy({
      where: {
        id: id,
      },
      transaction,
    });
  },
);

export const search = repositoryHandler(
  locationRepository,
  async (query = {}, limit = 10, page = 1, transaction = {}, ctx) => {
    const offset = (page - 1) * limit;
    const { id, zone } = query;
    const whereClouse = {
      deleted_at: null,
    };

    if (id) whereClouse.id = { [Op.iLike]: `%${id}%` };
    if (zone) whereClouse.zone = { [Op.iLike]: `%${zone}%` };

    const { rows, count } = await db.Location.findAndCountAll({
      where: whereClouse,
      limit,
      offset,
      order: [["zone", "ASC"]],
      include: [{ model: db.Warehouse, as: "Warehouse" }],
      transaction,
    });

    return {
      items: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  },
);

export const hasStoredPallets = repositoryHandler(
  locationRepository,
  async (zone = "", transaction = {}, ctx) => {
    const count = await db.Pallet.count({
      include: [
        {
          model: db.Location,
          as: "Location",
          where: { zone: zone },
        },
      ],
      where: { status: PALLETS_STATUS.STORED },
      transaction,
    });
    return count > 0;
  },
);

export const findByCategory = repositoryHandler(
  locationRepository,
  async (category = "", transaction = {}, ctx) => {
    return await db.Location.findAll({
      where: {
        category: { [Op.iLike]: `%${category}%` },
      },
      include: [{ model: db.Warehouse, as: "Warehouse" }],
      transaction,
    });
  },
);
