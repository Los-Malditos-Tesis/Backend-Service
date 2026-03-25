import db from "../models/index.js"
import { repositoryHandler } from "../../pkg/utils/handler/repository_handler.js"
import { ITEM_TYPES } from "../../pkg/utils/const/status"
import { Op } from "sequelize"

const scanEventRepository = "scan event repository: "

export const save = repositoryHandler(
    scanEventRepository,
    async (scanEvent = {}, ctx) => {
        return await db.ScanEvent.create(scanEvent)
    }
)

export const findAll = repositoryHandler(
    scanEventRepository,
    async (ctx) => {
        return await db.ScanEvent.findAll()
    }
)

export const findById = repositoryHandler(
    scanEventRepository,
    async (id = "", ctx) => {
        return await db.ScanEvent.findByPk(id)
    }
)

export const findByQrCode = repositoryHandler(
    scanEventRepository,
    async (qrCode = "", ctx) => {
        return await db.ScanEvent.findOne({
            where: {
                qrCode: qrCode
            }
        })
    }
)

export const findByDetectedType = repositoryHandler(
    scanEventRepository,
    async (detectedType = ITEM_TYPES.PALLET, ctx) => {
        return await db.ScanEvent.findAll({
            where: {
                detectedType: detectedType
            }
        })
    }
)

export const findHighLevelConfidense = repositoryHandler(
    scanEventRepository,
    async (confidense = 0.8, ctx) => {
        return await db.ScanEvent.findAll({
            where: {
                confidense: {
                    [Op.gte]: confidense
                }
            }
        })
    }
)

export const findByCameraId = repositoryHandler(
    scanEventRepository,
    async (cameraId = "", ctx) => {
        return await db.ScanEvent.findAll({
            where: {
                camera_id: cameraId
            }
        })
    }
)

export const deleteById = repositoryHandler(
    scanEventRepository,
    async (id = "", ctx) => {
        return await db.ScanEvent.destroy({
            where: {
                id: id
            }
        })
    }
)