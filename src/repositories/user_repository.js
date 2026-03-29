import db from "../models/index.js"
import { obfuscatePass } from "../../pkg/utils/obfuscate/obfucates.js"
import { repositoryHandler } from "../../pkg/utils/handler/repository_handler.js"

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
                email: email
            }
        })
    },
    obfuscatePass
);