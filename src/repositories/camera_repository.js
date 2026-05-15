import { Op, where } from "sequelize";
import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const cameraRepository = "camera repository: ";

export const save = repositoryHandler(
  cameraRepository,
  async (camera = {}, ctx) => {
    return await db.Camera.create(camera);
  },
);

export const searchCameras = repositoryHandler(
  cameraRepository,
  async (
    { page = 1, limit = 10, locationId, code, includeLocation = true },
    options = {},
    ctx,
  ) => {
    const offset = (page - 1) * limit;

    const where = {};

    if (locationId) {
      where.location_id = locationId;
    }

    if (code) {
      where.code = {
        [Op.like]: `%${code}%`,
      };
    }

    const { rows, count } = await db.Camera.scope("withApiKey").findAndCountAll(
      {
        where,
        limit,
        offset,
        order: [["created_at", "DESC"]],
        include: includeLocation
          ? [
              {
                model: db.Location,
                as: "location",
                attributes: ["id", "zone"],
              },
            ]
          : undefined,
        ...options,
      },
    );

    const items = rows.map((camera) => {
      return {
        ...camera.toJSON(),
        api_key: maskApiKey(camera.api_key),
      };
    });

    return {
      items: items,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  },
);

const maskApiKey = (item = "") => {
  if (!item) return item;
  return `${item.slice(0, 4)}********${item.slice(-4)}`;
};

export const findById = repositoryHandler(
  cameraRepository,
  async (id = "", ctx) => {
    return await db.Camera.findByPk(id, {
      include: [
        {
          model: db.Location,
          as: "location",
        },
      ],
    });
  },
);

export const findByCode = repositoryHandler(
  cameraRepository,
  async (code = "", ctx) => {
    return await db.Camera.scope("withApiKey").findOne({
      where: {
        code: code,
      },
      include: [
        {
          model: db.Location,
          as: "location",
        },
      ],
    });
  },
);

export const findByLocationId = repositoryHandler(
  cameraRepository,
  async (locationId = "", ctx) => {
    return await db.Camera.findAll({
      where: {
        location_id: locationId,
      },
    });
  },
);

export const findLiveZone = repositoryHandler(
  cameraRepository,
  async (id = "", zone = "", ctx) => {
    return await db.Camera.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: db.Location,
          as: "Location",
          where: {
            zone: {
              [Op.like]: `%${zone}%`,
            },
          },
          include: [
            {
              model: db.Pallet,
              as: "Pallets",
              include: [{ model: db.Box, as: "Boxes" }],
            },
          ],
        },
      ],
    });
  },
);

export const getLastEventByCameraId = repositoryHandler(
  cameraRepository,
  async (cameraId = "", ctx) => {
    return await db.Camera.findOne({
      where: {
        id: cameraId,
      },
      include: [
        {
          model: db.ScanEvent,
          as: "ScanEvents",
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
      ],
    });
  },
);

export const deleteById = repositoryHandler(
  cameraRepository,
  async (id = "", ctx) => {
    return await db.Camera.destroy({
      where: {
        id: id,
      },
    });
  },
);

export const updateCamera = repositoryHandler(
  cameraRepository,
  async (data = {}, camera = {}, ctx) => {
    return await camera.update(data);
  },
);

export const findAllByLocations = repositoryHandler(
  cameraRepository,
  async (locationIds = [], ctx) => {
    return await db.Camera.findAll({
      where: {
        location_id: {
          [Op.in]: locationIds,
        },
      },
    });
  },
);
