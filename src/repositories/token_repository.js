import db from "../models/index.js"
import { repositoryHandler } from "../../pkg/utils/handler/repository_handler.js"

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

export const findByUserIdAndContent = repositoryHandler(
    tokenRepository,
    async (userId = "", content = "", isActive = true, ctx) => {
        return await db.Token.findOne({
            where: {
                userId: userId,
                content: content,
                isActive: isActive
            }
        })
    }
)