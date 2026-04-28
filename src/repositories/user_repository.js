import db from "../models/index.js"
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { obfuscatePass } from "../utils/obfuscate/obfucates.js"

const authRepository = "auth repository: "


export const save = repositoryHandler(
    authRepository,
    async (data = {}, ctx) => {
        return await db.User.create(data);
    },
    obfuscatePass
);

export const findByEmail = repositoryHandler(
    authRepository,
    async (email = "", ctx) => {
        return await db.User.findOne({
            where: {
                email: email,
            },
            include: [{
                model: db.Role,
                attributes: ['id', 'name'],
                through: { attributes: [] },
                as: 'roles'
            }]
        })
    },
    obfuscatePass
);

export const findById = repositoryHandler(
    authRepository,
    async (id = "", ctx) => {
        return await db.User.findByPk(id, {
            include: [{
                model: db.Role,
                attributes: ['id'],
                through: { attributes: [] },
                as: 'roles'
            }]
        })
    },
    obfuscatePass
);