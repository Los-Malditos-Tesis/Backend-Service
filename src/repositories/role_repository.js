import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const roleRepository = "role repository: "

export const findByName = repositoryHandler(
    roleRepository,
    async (name = "", ctx) => {
        return await db.Role.findOne({
            where: {
                name: name
            }
        })
    }
)

export const findById = repositoryHandler(
    roleRepository,
    async (id = "", ctx) => {
        return await db.Role.findByPk(id);
    }
)

export const findAllByIds = repositoryHandler(
    roleRepository,
    async (ids = [], ctx) => {
        return await db.Role.findAll({
            where: {
                id: ids
            }
        })
    }
)