import db from "../models/index.js"
import { repositoryHandler } from "../../pkg/utils/handler/repository_handler.js"

const palletRepository = "pallet repository: "

export const save = repositoryHandler(
    palletRepository,
    async (pallet = {}, ctx) => {
        return await db.Pallet.create(pallet)
    }
)

export const findAll = repositoryHandler(
    palletRepository,
    async (ctx) => {
        return await db.Pallet.findAll()
    }
)

export const findById = repositoryHandler(
    palletRepository,
    async (id = "", ctx) => {
        return await db.Pallet.findByPk(id)
    }
)

export const findByQrCode = repositoryHandler(
    palletRepository,
    async (qrCode = "", ctx) => {
        return await db.Pallet.findOne({
            where: {
                qrCode: qrCode
            }
        })
    }
)

export const findByCode = repositoryHandler(
    palletRepository,
    async (code = "", ctx) => {
        return await db.Pallet.findOne({
            where: {
                code: code
            }
        })
    }
)

export const findByStatus = repositoryHandler(
    palletRepository,
    async (status = PALLETS_STATUS.CREATED, ctx) => {
        return await db.Pallet.findAll({
            where: {
                status: status
            }
        })
    }
)

export const findByLocationId = repositoryHandler(
    palletRepository,
    async (locationId = "", ctx) => {
        return await db.Pallet.findAll({
            where: {
                location_id: locationId
            },
            include: [
                { model: db.Location, as: "location" }
            ]
        })
    }
)

export const deleteById = repositoryHandler(
    palletRepository,
    async (id = "", ctx) => {
        return await db.Pallet.destroy({
            where: {
                id: id
            }
        })
    }
)