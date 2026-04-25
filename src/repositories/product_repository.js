import db from "../models/index.js"
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js"

const productRepository = "product repository: "

export const save = repositoryHandler(
    productRepository,
    async (product = {}, ctx) => {
        return await db.Product.create(product)
    }
)

export const findAll = repositoryHandler(
    productRepository,
    async (ctx) => {
        return await db.Product.findAll()
    }
)

export const findById = repositoryHandler(
    productRepository,
    async (id = "", ctx) => {
        return await db.Product.findByPk(id)
    }
)

export const findByCode = repositoryHandler(
    productRepository,
    async (code = "", ctx) => {
        return await db.Product.findOne({
            where: {
                code: code
            }
        })
    }
)

export const findByCategory = repositoryHandler(
    productRepository,
    async (category = "", ctx) => {
        return await db.Product.findAll({
            where: {
                category: {
                    [Op.like]: `%${category}%`
                }
            }
        })
    }
)

export const findBySku = repositoryHandler(
    productRepository,
    async (sku = "", ctx) => {
        return await db.Product.findOne({
            where: {
                sku: sku
            }
        })
    }
)

export const findBySupplierId = repositoryHandler(
    productRepository,
    async (supplierId = "", ctx) => {
        return await db.Product.findAll({
            where: {
                supplier_id: supplierId
            }
        })
    }
)

export const deleteById = repositoryHandler(
    productRepository,
    async (id = "", ctx) => {
        return await db.Product.destroy({
            where: {
                id: id
            }
        })
    }
)
