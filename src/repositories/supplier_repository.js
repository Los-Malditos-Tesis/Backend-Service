import db from "../models/index.js"
import { repositoryHandler } from "../utils/handler/repository_handler.js"

const supplierRepository = "supplier repository: "

export const save = repositoryHandler(
    supplierRepository,
    async (supplier = {}, ctx) => {
        return await db.Supplier.create(supplier)
    }
)

export const findAll = repositoryHandler(
    supplierRepository,
    async (ctx) => {
        return await db.Supplier.findAll({
            order: [['name', 'ASC']]
        })
    }
)

export const findById = repositoryHandler(
    supplierRepository,
    async (id = "", ctx) => {
        return await db.Supplier.findByPk(id)
    }
)

export const update = repositoryHandler(
    supplierRepository,
    async (id = "", data = {}, ctx) => {
        const [updated] = await db.Supplier.update(data, {
            where: { id: id }
        })
        if (updated) return await db.Supplier.findByPk(id)
        return null
    }
)

export const deleteById = repositoryHandler(
    supplierRepository,
    async (id = "", ctx) => {
        return await db.Supplier.destroy({
            where: { id: id }
        })
    }
)

export const findByCode = repositoryHandler(
    supplierRepository,
    async (code = "", ctx) => {
        return await db.Supplier.findOne({
            where: { code: code }
        })
    }
)

export const findWithProducts = repositoryHandler(
    supplierRepository,
    async (id = "", ctx) => {
        return await db.Supplier.findByPk(id, {
            include: [
                {
                    model: db.Product,
                    as: 'Products'
                }
            ]
        })
    }
)

export const searchByName = repositoryHandler(
    supplierRepository,
    async (query = "", ctx) => {
        const { Op } = db.sequelize;
        return await db.Supplier.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            },
            limit: 10
        })
    }
)