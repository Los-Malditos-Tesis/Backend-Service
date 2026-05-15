import db from "../models/index.js"
import { repositoryHandler } from "../utils/handler/repository_handler.js"
import { ITEM_TYPES } from "../utils/const/status.js"
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

export const findCameraByLowConfidense = repositoryHandler(
    scanEventRepository,
    async (confidense = 0.4, ctx) => {
        return await db.ScanEvent.findAll({
            where: {
                confidense: {
                    [Op.lt]: confidense
                }
            },
            include: [
                { model: db.Camera, as: "Camera" }
            ]
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

export const search = repositoryHandler(
    scanEventRepository,
    async (query = {}, limit = 10, page = 1, ctx) => {
        const { id, qrCode, detectedType, status, confidense, camera_id } = query;

        const offset = (page - 1) * limit;
        const whereClause = { deleted_at: null };

        if (id) whereClause.id = { [Op.eq]: id };

        if (qrCode) whereClause.qrCode = { [Op.iLike]: `%${qrCode}%` };

        if (detectedType) whereClause.detectedType = { [Op.eq]: `${detectedType}` };

        if (status) whereClause.status = { [Op.eq]: `${status}` };

        if (confidense) whereClause.confidense = { [Op.gte]: confidense };

        if (camera_id) whereClause.camera_id = { [Op.eq]: `${camera_id}` };

        const { rows, count } = await db.ScanEvent.findAndCountAll({
            where: whereClause,
            limit: limit,
            offset: offset,
            order: [["created_at", "DESC"]],
        });

        return {
            items: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        };
    },
);
