import db from "../models/index.js";
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const warehouseRepository = "warehouse repository: ";

export const save = repositoryHandler(
  warehouseRepository,
  async (warehouse = {}, transaction = {}, ctx) => {
    const result = await db.Warehouse.create(warehouse, { transaction });
    return result;
  },
);

export const findAll = repositoryHandler(
  warehouseRepository,
  async (transaction = {}, ctx) => {
    return await db.Warehouse.findAll({ transaction });
  },
);

export const findById = repositoryHandler(
  warehouseRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Warehouse.findByPk(id, { transaction });
  },
);

export const getWarehouseInventory = repositoryHandler(
  warehouseRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Warehouse.findByPk(
      id,
      {
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
      },
      { transaction },
    );
  },
);

export const getWarehouseInventoryByLocation = repositoryHandler(
  warehouseRepository,
  async (id = "", locationId = "", transaction = {}, ctx) => {
    return await db.Warehouse.findByPk(
      id,
      {
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
      },
      { transaction },
    );
  },
);

export const getWarehouseStructure = repositoryHandler(
  warehouseRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Warehouse.findByPk(
      id,
      {
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
      },
      { transaction },
    );
  },
);

export const findLocationByQrInWarehouse = repositoryHandler(
  warehouseRepository,
  async (id = "", zone = "", transaction = {}, ctx) => {
    return await db.Warehouse.findByPk(
      id,
      {
        include: [
          {
            model: db.Location,
            as: "Locations",
            where: {
              zone: zone,
            },
          },
        ],
      },
      { transaction },
    );
  },
);

export const deleteById = repositoryHandler(
  warehouseRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Warehouse.destroy({
      where: {
        id: id,
      },
      transaction,
    });
  },
);

export const search = repositoryHandler(
  warehouseRepository,
  async (query = {}, limit = 10, page = 1, transaction = {}, ctx) => {
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

export const update = repositoryHandler(
  warehouseRepository,
  async (id = "", warehouseData = {}, transaction = {}, ctx) => {
    const result = await db.Warehouse.update(warehouseData, {
      where: {
        id: id,
      },
      returning: true,
      transaction,
    });
    return result[1];
  },
);
