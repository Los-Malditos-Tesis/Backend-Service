import db from "../models/index.js"
import { Op, literal } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js"
import { PALLETS_STATUS } from "../utils/const/status.js";

const productRepository = "product repository: "

export const save = repositoryHandler(
    productRepository,
    async (product = {}, ctx) => {
        const [result] = await db.Product.upsert(product);
        return result;
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
        return await db.Product.findAll({
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

export const search = repositoryHandler(
    productRepository,
    async (query = "", warehouseId, limit = 10, page = 1, ctx) => {

        const offset = (page - 1) * limit;
        const { name, sku, code, category } = query;
        const whereClouse = {
            deleted_at: null
        };

        if (name) whereClouse.name = { [Op.iLike]: `%${name}%` };
        if (sku) whereClouse.sku = { [Op.iLike]: `%${sku}%` };
        if (code) whereClouse.code = { [Op.iLike]: `%${code}%` };
        if (category) whereClouse.category = { [Op.iLike]: `%${category}%` };

        const countProducts = `(
            SELECT COALESCE(SUM(
                (p.quantity_box * p.quantity_units_in_box) - 
                (
                    SELECT COUNT(*) * p.quantity_units_in_box 
                    FROM boxes AS b 
                    WHERE b.pallet_id = p.id 
                    AND b.status != '${PALLETS_STATUS.STORED}'
                    AND b.deleted_at IS NULL
                )
            ), 0)
            FROM pallets AS p
            WHERE p.product_id = "Product".id
            AND p.status = '${PALLETS_STATUS.STORED}'
            ${warehouseId ? `AND p.warehouse_id = '${warehouseId}'` : ''}
            AND p.deleted_at IS NULL
        )`;

        const { rows, count } = await db.Product.findAndCountAll({
            where: whereClouse,
            attributes: {
                include: [
                    [literal(countProducts), 'total_available_units']
                ]
            },
            limit,
            offset,
            order: [['name', 'ASC']],
        });

        return {
            items: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        };
    }
)