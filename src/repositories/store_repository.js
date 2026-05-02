import { Op } from "sequelize";
import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { Log } from "../libs/logger/logger.js";

const storeRepository = "store repository: ";

export const create = repositoryHandler(
    storeRepository,
    async (ctx, store = {}, options = {}) => {
        Log.infoCtx(ctx, storeRepository, "data en repo", store)
        return await db.Store.create(store, options)
    }
)

export const findById = repositoryHandler(
    storeRepository,
    async (ctx, id = "", options = {}) => {
        return await db.Store.findByPk(id, options)
    }
)

export const findByCode = repositoryHandler(
    storeRepository,
    async (ctx, code = "", options = {}) => {
        return await db.Store.findOne({
            where: {
                code: code
            },
            ...options
        })
    }
)

export const findAll = repositoryHandler(
    storeRepository,
    async (ctx, { page = 1, limit = 10, code, name } = {}, options = {}) => {

        const safePage = Math.max(1, page);
        const safeLimit = Math.max(1, limit);
        const offset = (safePage - 1) * safeLimit;

        const where = {};

        if (code) {
            where.code = {
                [Op.iLike]: `%${code}%`
            };
        }

        if (name) {
            where.name = {
                [Op.iLike]: `%${name}%`
            };
        }

        return await db.Store.findAndCountAll({
            where,
            limit: safeLimit,
            offset,
            order: [['created_at', 'DESC']],
            ...options
        });
    }
);


export const update = repositoryHandler(
    storeRepository,
    async (ctx, id = "", data = {}, options = {}) => {
        return await db.Store.update(data, {
            where: { id },
            returning: true,
            ...options
        });
    }
);

export const remove = repositoryHandler(
    storeRepository,
    async (ctx, id = "", options = {}) => {
        return await db.Store.destroy({
            where: { id },
            ...options
        });
    }
);