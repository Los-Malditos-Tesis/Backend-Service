import { Op, where } from "sequelize"
import db from "../models/index.js"
import { repositoryHandler } from "../utils/handler/repository_handler.js"

const cameraRepository = "camera repository: "

export const save = repositoryHandler(
    cameraRepository,
    async (camera = {}, ctx) => {
        return await db.Camera.create(camera)
    }
)

export const findAll = repositoryHandler(
    cameraRepository,
    async ({ page = 1, limit = 10, locationId, code, includeLocation = true }, ctx) => {

        const offset = (page - 1) * limit;

        const where = {};

        if (locationId) {
            where.location_id = locationId;
        }

        if (code) {
            where.code = {
                [Op.like]: `%${code}%`
            };
        }

        return await db.Camera.findAndCountAll({
            where,
            limit,
            offset,
            order: [["created_at", "DESC"]],
            include: includeLocation ? [
                {
                    model: db.Location,
                    as: "location",
                    attributes: ["id", "zone"]
                }
            ] : []
        });
    }
)

export const findById = repositoryHandler(
    cameraRepository,
    async (id = "", ctx) => {
        return await db.Camera.findByPk(id)
    }
)

export const findByCode = repositoryHandler(
    cameraRepository,
    async (code = "", ctx) => {
        return await db.Camera.findOne({
            where: {
                code: code
            }
        })
    }
)

export const findByLocationId = repositoryHandler(
    cameraRepository,
    async (locationId = "", ctx) => {
        return await db.Camera.findAll({
            where: {
                location_id: locationId
            }
        })
    }
)

export const findLiveZone = repositoryHandler(
    cameraRepository,
    async (id = "", zone = "", ctx) => {
        return await db.Camera.findAll({
            where: {
                id: id
            },
            include: [
                {
                    model: db.Location, as: "Location",
                    where: {
                        zone: {
                            [Op.like]: `%${zone}%`
                        }
                    },
                    include: [{
                        model: db.Pallet, as: "Pallets",
                        include: [{ model: db.Box, as: "Boxes" }]
                    }],
                }
            ]
        })
    }
)

export const getLastEventByCameraId = repositoryHandler(
    cameraRepository,
    async (cameraId = "", ctx) => {
        return await db.Camera.findOne({
            where: {
                id: cameraId
            },
            include: [
                {
                    model: db.ScanEvent, as: "ScanEvents",
                    order: [["createdAt", "DESC"]],
                    limit: 1
                }
            ]
        })
    }
)


export const deleteById = repositoryHandler(
    cameraRepository,
    async (id = "", ctx) => {
        return await db.Camera.destroy({
            where: {
                id: id
            }
        })
    }
)

export const updateCamera = repositoryHandler(
    cameraRepository,
    async (data = {}, camera = {}, ctx) => {
        return await camera.update(data)
    }
)