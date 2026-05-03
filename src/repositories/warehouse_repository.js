import db from "../models/index.js";
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const warehouseRepository = "warehouse repository: ";

export const save = repositoryHandler(
  warehouseRepository,
  async (warehouse = {}, ctx) => {
    const [result] = await db.Warehouse.upsert(warehouse);
    return result;
  },
);

export const findAll = repositoryHandler(warehouseRepository, async (ctx) => {
  return await db.Warehouse.findAll();
});

export const findById = repositoryHandler(
  warehouseRepository,
  async (id = "", ctx) => {
    return await db.Warehouse.findByPk(id);
  },
);

export const getWarehouseInventory = repositoryHandler(
  warehouseRepository,
  async (id = "", ctx) => {
    return await db.Warehouse.findByPk(id, {
      include: [
        {
          model: db.Location,
          as: "Locations",
          include: [
            {
              model: db.Pallet,
              as: "Pallets",
              include: [
                {
                  model: db.Box,
                  as: "Boxes",
                  include: [
                    {
                      model: db.Product,
                      as: "Product",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  },
);

export const getWarehouseInventoryByLocation = repositoryHandler(
  warehouseRepository,
  async (id = "", locationId = "", ctx) => {
    return await db.Warehouse.findByPk(id, {
      include: [
        {
          model: db.Location,
          as: "Locations",
          where: {
            id: locationId,
          },
          include: [
            {
              model: db.Pallet,
              as: "Pallets",
              include: [
                {
                  model: db.Box,
                  as: "Boxes",
                  include: [
                    {
                      model: db.Product,
                      as: "Product",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  },
);

export const getWarehouseStructure = repositoryHandler(
  warehouseRepository,
  async (id = "", ctx) => {
    return await db.Warehouse.findByPk(id, {
      include: [
        {
          model: db.Location,
          as: "Locations",
          include: [
            {
              model: db.Camera,
              as: "Cameras",
            },
          ],
        },
      ],
    });
  },
);

export const findLocationByQrInWarehouse = repositoryHandler(
  warehouseRepository,
  async (id = "", zone = "", ctx) => {
    return await db.Warehouse.findByPk(id, {
      include: [
        {
          model: db.Location,
          as: "Locations",
          where: {
            zone: zone,
          },
        },
      ],
    });
  },
);

export const deleteById = repositoryHandler(
  warehouseRepository,
  async (id = "", ctx) => {
    return await db.Warehouse.destroy({
      where: {
        id: id,
      },
    });
  },
);

export const search = repositoryHandler(
  warehouseRepository,
  async (query = {}, limit = 10, page = 1, ctx) => {
    const { name, address, user_id } = query;

    const offset = (page - 1) * limit;
    const whereClause = { deleted_at: null };

    if (name) whereClause.name = { [Op.iLike]: `%${name}%` };

    if (address) whereClause.address = { [Op.iLike]: `%${address}%` };

    if (user_id) whereClause.user_id = { [Op.eq]: user_id };

    const { rows, count } = await db.Warehouse.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["name", "ASC"]],
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
  warehouseRepository,
  async (id = "", warehouseData = {}, ctx) => {
    const result = await db.Warehouse.update(warehouseData, {
      where: {
        id: id,
      },
      returning: true,
    });
    return result[1];
  },
);
