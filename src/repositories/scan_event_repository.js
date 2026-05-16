import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { ITEM_TYPES } from "../utils/const/status.js";
import { Op } from "sequelize";

const scanEventRepository = "scan event repository: ";

export const save = repositoryHandler(
  scanEventRepository,
  async (scanEvent = {}, transaction = {}, ctx) => {
    return await db.ScanEvent.create(scanEvent, { transaction });
  },
);

export const findAll = repositoryHandler(
  scanEventRepository,
  async (transaction = {}, ctx) => {
    return await db.ScanEvent.findAll({ transaction });
  },
);

export const findById = repositoryHandler(
  scanEventRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.ScanEvent.findByPk(id, { transaction });
  },
);

export const findByQrCode = repositoryHandler(
  scanEventRepository,
  async (qrCode = "", transaction = {}, ctx) => {
    return await db.ScanEvent.findOne({
      where: {
        qrCode: qrCode,
      },
      transaction,
    });
  },
);

export const findByDetectedType = repositoryHandler(
  scanEventRepository,
  async (detectedType = ITEM_TYPES.PALLET, transaction = {}, ctx) => {
    return await db.ScanEvent.findAll({
      where: {
        detectedType: detectedType,
      },
      transaction,
    });
  },
);

export const findHighLevelConfidense = repositoryHandler(
  scanEventRepository,
  async (confidense = 0.8, transaction = {}, ctx) => {
    return await db.ScanEvent.findAll({
      where: {
        confidense: {
          [Op.gte]: confidense,
        },
      },
      transaction,
    });
  },
);

export const findByCameraId = repositoryHandler(
  scanEventRepository,
  async (cameraId = "", transaction = {}, ctx) => {
    return await db.ScanEvent.findAll({
      where: {
        camera_id: cameraId,
      },
      transaction,
    });
  },
);

export const findCameraByLowConfidense = repositoryHandler(
  scanEventRepository,
  async (confidense = 0.4, transaction = {}, ctx) => {
    return await db.ScanEvent.findAll({
      where: {
        confidense: {
          [Op.lt]: confidense,
        },
      },
      include: [{ model: db.Camera, as: "Camera" }],
      transaction,
    });
  },
);

export const deleteById = repositoryHandler(
  scanEventRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.ScanEvent.destroy({
      where: {
        id: id,
      },
      transaction,
    });
  },
);

export const search = repositoryHandler(
  scanEventRepository,
  async (query = {}, limit = 10, page = 1, transaction = {}, ctx) => {
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
      transaction,
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
