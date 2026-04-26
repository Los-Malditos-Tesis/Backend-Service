import db from "../models/index.js"
import { repositoryHandler } from "../utils/handler/repository_handler.js"
import { PALLETS_STATUS } from "../../pkg/utils/const/status.js"

const boxRepository = "box repository: "

export const save = repositoryHandler(
    boxRepository,
    async (box = {}, ctx) => {
        return await db.Box.create(box)
    }
)

export const findAll = repositoryHandler(
    boxRepository,
    async (ctx) => {
        return await db.Box.findAll()
    }
)

export const findById = repositoryHandler(
    boxRepository,
    async (id = "", ctx) => {
        return await db.Box.findByPk(id)
    }
)

export const findByQrCode = repositoryHandler(
    boxRepository,
    async (qrCode = "", ctx) => {
        return await db.Box.findOne({
            where: {
                qrCode: qrCode
            }
        })
    }
)

export const findByPallet = repositoryHandler(
    boxRepository,
    async (palletId = "", ctx) => {
        return await db.Box.findAll({
            where: {
                pallet_id: palletId
            }
        })
    }
)

export const findByProductId = repositoryHandler(
    boxRepository,
    async (productId = "", limit = 10, ctx) => {
        return await db.Box.findAll({
            where: {
                product_id: productId,
                status: PALLETS_STATUS.CREATED
            },
            include: [
                { model: db.Product, as: 'Product' }
            ],
            limit: limit,
            order: [['created_at', 'ASC']]
        })
    }
)

export const findHistoryByBoxId = repositoryHandler(
    boxRepository,
    async (boxId = "", ctx) => {
        return await db.Box.findAll({
            where: {
                id: boxId
            },
            include: [
                { model: db.InventoryMovement, as: "InventoryMovements" }
            ]
        })
    }
)

export const deleteById = repositoryHandler(
    boxRepository,
    async (id = "", ctx) => {
        return await db.Box.destroy({
            where: {
                id: id
            }
        })
    }
)