import db from "../models/index.js";
import { Sequelize } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const dashboardRepository = "dashboard repository: ";

export const getStats = repositoryHandler(
  dashboardRepository,
  async (_, ctx) => {
    const [products, users, suppliers, warehouses, stores, locations, cameras] =
      await Promise.all([
        db.Product.count(),
        db.User.count(),
        db.Supplier.count(),
        db.Warehouse.count(),
        db.Store.count(),
        db.Location.count(),
        db.Camera.count(),
      ]);

    return {
      products,
      users,
      suppliers,
      warehouses,
      stores,
      locations,
      cameras,
    };
  },
);

export const getProductsByCategory = repositoryHandler(
  dashboardRepository,
  async (_, ctx) => {
    return await db.Product.findAll({
      attributes: [
        "category",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["category"],
      order: [[Sequelize.literal("count"), "DESC"]],
      raw: true,
    });
  },
);

export const getUsersByRole = repositoryHandler(
  dashboardRepository,
  async (_, ctx) => {
    return await db.Role.findAll({
      attributes: [
        "name",
        [Sequelize.fn("COUNT", Sequelize.col("Users.id")), "count"],
      ],
      include: [
        {
          model: db.User,
          attributes: [],
          through: {
            attributes: [],
          },
          required: false,
        },
      ],
      group: ["Role.id"],
      raw: true,
    });
  },
);

export const getTopWarehouses = repositoryHandler(
  dashboardRepository,
  async (_, ctx) => {
    return await db.Warehouse.findAll({
      include: [
        {
          model: db.Location,
          as: "locations",
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "name",
        [Sequelize.fn("COUNT", Sequelize.col("locations.id")), "locations"],
      ],
      group: ["Warehouse.id"],
      raw: true,
    });
  },
);

export const getCameraCoverage = repositoryHandler(
  dashboardRepository,
  async (_, ctx) => {
    const [locations, monitoredLocations] = await Promise.all([
      db.Location.count(),
      db.Location.count({
        include: [
          {
            model: db.Camera,
            attributes: [],
            required: true,
          },
        ],
        distinct: true,
      }),
    ]);

    return {
      locations,
      monitoredLocations,
    };
  },
);

export const getRegisteredPallets = repositoryHandler(
  dashboardRepository,
  async (_, ctx) => {
    return await db.Pallet.count();
  },
);

export const getLastScan = repositoryHandler(
  dashboardRepository,
  async (_, ctx) => {
    return await db.ScanEvent.findOne({
      order: [["createdAt", "DESC"]],
    });
  },
);
