import db from "../models/index.js"
import { repositoryHandler } from "../utils/handler/repository_handler.js"

const tokenRepository = "token repository: "

export const save = repositoryHandler(
    tokenRepository,
    async (token = {}, ctx) => {
        return await db.Token.create(token)
    }
)

export const findAllByUserId = repositoryHandler(
    tokenRepository,
    async (userId = "", ctx) => {
        return await db.Token.findAll({
            where: {
                userId: userId
            }
        })
    }
)

export const findByContent = repositoryHandler(
    tokenRepository,
    async (content = "", ctx) => {
        return await db.Token.findOne({
            where: {
                content: content
            }
        })
    }
)