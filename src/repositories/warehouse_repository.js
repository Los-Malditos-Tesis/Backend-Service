import { count } from "console"
import db from "../models/index.js"
import { repositoryHandler } from "../utils/handler/repository_handler.js"

const warehouseRepository = "warehouse repository: "

export const save = repositoryHandler(
    warehouseRepository,
    async (warehouse = {}, ctx) => {
        return await db.Warehouse.create(warehouse)
    }
)

export const findAll = repositoryHandler(
    warehouseRepository,
    async (ctx) => {
        return await db.Warehouse.findAll()
    }
)

export const findById = repositoryHandler(
    warehouseRepository,
    async (id = "", ctx) => {
        return await db.Warehouse.findByPk(id)
    }
)

export const getWarehouseInventory = repositoryHandler(
    warehouseRepository,
    async (id = "", ctx) => {
        return await db.Warehouse.findByPk(id, {
            include: [{
                model: db.Location,
                as: "Locations",
                include: [{
                    model: db.Pallet,
                    as: "Pallets",
                    include: [{
                        model: db.Box,
                        as: "Boxes",
                        include: [{
                            model: db.Product,
                            as: "Product"
                        }]
                    }]
                }]
            }]
        })
    }
)

export const getWarehouseInventoryByLocation = repositoryHandler(
    warehouseRepository,
    async (id = "", locationId = "", ctx) => {
        return await db.Warehouse.findByPk(id, {
            include: [{
                model: db.Location,
                as: "Locations",
                where: {
                    id: locationId
                },
                include: [{
                    model: db.Pallet,
                    as: "Pallets",
                    include: [{
                        model: db.Box,
                        as: "Boxes",
                        include: [{
                            model: db.Product,
                            as: "Product"
                        }]
                    }]
                }]
            }]
        })
    }
)

export const getWarehouseStructure = repositoryHandler(
    warehouseRepository,
    async (id = "", ctx) => {
        return await db.Warehouse.findByPk(id, {
            include: [{
                model: db.Location,
                as: "Locations",
                include: [{
                    model: db.Camera,
                    as: "Cameras"
                }]
            }]
        })
    }
)

export const findLocationByQrInWarehouse = repositoryHandler(
    warehouseRepository,
    async (id = "", zone = "", ctx) => {
        return await db.Warehouse.findByPk(id, {
            include: [{
                model: db.Location,
                as: "Locations",
                where: {
                    zone: zone
                }
            }]
        })
    }
)

export const deleteById = repositoryHandler(
    warehouseRepository,
    async (id = "", ctx) => {
        return await db.Warehouse.destroy({
            where: {
                id: id
            }
        })
    }
)