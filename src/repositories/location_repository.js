import db from "../models/index.js"
import { repositoryHandler } from "../utils/handler/repository_handler.js"

const locationRepository = "location repository: "

export const save = repositoryHandler(
    locationRepository,
    async (location = {}, ctx) => {
        return await db.Location.create(location)
    }
)

export const findAll = repositoryHandler(
    locationRepository,
    async (ctx) => {
        return await db.Location.findAll()
    }
)

export const findById = repositoryHandler(
    locationRepository,
    async (id = "", ctx) => {
        return await db.Location.findByPk(id)
    }
)


export const findByZone = repositoryHandler(
    locationRepository,
    async (zone = "", ctx) => {
        return await db.Location.findOne({
            where: {
                zone: zone
            }
        })
    }
)

export const findZonePallets = repositoryHandler(
    locationRepository,
    async (zone = "", ctx) => {
        return await db.Location.findOne({
            where: {
                zone: zone
            },
            include: [
                {
                    model: db.Pallet, as: "Pallets",
                    include: [{
                        model: db.Box, as: "Boxes",
                        include: [{ model: db.Product, as: "Product" }]
                    }],
                }
            ]
        })
    }
)

export const findByWarehouseId = repositoryHandler(
    locationRepository,
    async (warehouseId = "", ctx) => {
        return await db.Location.findAll({
            where: {
                warehouse_id: warehouseId
            },
            include: [
                { model: db.Warehouse, as: "Warehouse" }
            ]
        })
    }
)

export const deleteById = repositoryHandler(
    locationRepository,
    async (id = "", ctx) => {
        return await db.Location.destroy({
            where: {
                id: id
            }
        })
    }
)