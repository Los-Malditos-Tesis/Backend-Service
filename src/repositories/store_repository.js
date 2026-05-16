import { Op } from "sequelize";
import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { Log } from "../libs/logger/logger.js";

const storeRepository = "store repository: ";

export const create = repositoryHandler(
  storeRepository,
  async (store = {}, options = {}, transaction = {}, ctx) => {
    Log.infoCtx(ctx, storeRepository, "data en repo", store);
    return await db.Store.create(store, { ...options, transaction });
  },
);

export const findById = repositoryHandler(
  storeRepository,
  async (id = "", options = {}, transaction = {}, ctx) => {
    return await db.Store.findByPk(id, { ...options, transaction });
  },
);

export const findByCode = repositoryHandler(
  storeRepository,
  async (code = "", options = {}, transaction = {}, ctx) => {
    return await db.Store.findOne({
      where: {
        code: code,
      },
      ...options,
      transaction,
    });
  },
);

export const findAll = repositoryHandler(
  storeRepository,
  async (
    { page = 1, limit = 10, code, name } = {},
    options = {},
    transaction = {},
    ctx,
  ) => {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const offset = (safePage - 1) * safeLimit;

    const where = {};

    if (code) {
      where.code = {
        [Op.iLike]: `%${code}%`,
      };
    }

    if (name) {
      where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    const { rows, count } = await db.Store.findAndCountAll({
      where,
      limit: safeLimit,
      offset,
      order: [["created_at", "DESC"]],
      ...options,
      transaction,
    });

    return {
      items: rows,
      total: count,
      totalPages: Math.ceil(count / safeLimit),
      currentPage: safePage,
    };
  },
);

export const update = repositoryHandler(
  storeRepository,
  async (id = "", data = {}, options = {}, transaction = {}, ctx) => {
    return await db.Store.update(data, {
      where: { id },
      returning: true,
      ...options,
      transaction,
    });
  },
);

export const remove = repositoryHandler(
  storeRepository,
  async (id = "", options = {}, transaction = {}, ctx) => {
    return await db.Store.destroy({
      where: { id },
      ...options,
      transaction,
    });
  },
);
