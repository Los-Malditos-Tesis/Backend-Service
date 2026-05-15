import db from "../models/index.js";
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { PALLETS_STATUS } from "../utils/const/status.js";

const locationRepository = "location repository: ";

export const save = repositoryHandler(
  locationRepository,
  async (location = {}, ctx) => {
    const [result] = await db.Location.upsert(location);
    return result;
  },
);

export const findAll = repositoryHandler(locationRepository, async (ctx) => {
  return await db.Location.findAll();
});

export const findById = repositoryHandler(
  locationRepository,
  async (id = "", ctx) => {
    return await db.Location.findByPk(id);
  },
);

export const findByZone = repositoryHandler(
  locationRepository,
  async (zone = "", ctx) => {
    return await db.Location.findOne({
      where: {
        zone: zone,
      },
    });
  },
);

export const findZonePallets = repositoryHandler(
  locationRepository,
  async (zone = "", ctx) => {
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
    });
  },
);

export const findByWarehouseId = repositoryHandler(
  locationRepository,
  async (warehouseId = "", ctx) => {
    return await db.Location.findAll({
      where: {
        warehouse_id: warehouseId,
      },
      include: [{ model: db.Warehouse, as: "Warehouse" }],
    });
  },
);

export const deleteById = repositoryHandler(
  locationRepository,
  async (id = "", ctx) => {
    return await db.Location.destroy({
      where: {
        id: id,
      },
    });
  },
);

export const search = repositoryHandler(
  locationRepository,
  async (query = {}, limit = 10, page = 1, ctx) => {
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
  async (zone = "", ctx) => {
    const count = await db.Pallet.count({
      include: [
        {
          model: db.Location,
          as: "Location",
          where: { zone: zone },
        },
      ],
      where: { status: PALLETS_STATUS.STORED },
    });
    return count > 0;
  },
);

export const findByCategory = repositoryHandler(
  locationRepository,
  async (category = "", ctx) => {
    return await db.Location.findAll({
      where: {
        category: { [Op.iLike]: `%${category}%` },
      },
      include: [{ model: db.Warehouse, as: "Warehouse" }],
    });
  },
);
