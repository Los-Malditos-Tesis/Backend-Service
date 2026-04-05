import { Op } from "sequelize"
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
    async (ctx) => {
        return await db.Camera.findAll()
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