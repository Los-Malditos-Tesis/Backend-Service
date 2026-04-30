import {
    save,
    findBySupplierId,
    findById,
    findAll,
    findBySku,
    findByCode,
    findByCategory,
    deleteById,
    search
} from "../repositories/product_repository.js";
import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";

import {
    findById as findSupplierById
} from "../repositories/supplier_repository.js"

const productService = "product service: "

export const createProduct = serviceHandler(
    productService,
    CODES.PRODUCT.NOT_FOUND,
    async (productData = {}, ctx) => {
        Log.infoCtx(ctx, productService + consoleKeys.StartKey, consoleKeys.RequestKey, productData)

        const existSku = await findBySku(productData.sku, ctx);
        const existCode = await findByCode(productData.code, ctx);
        if (existSku || existCode)
            throw new AppError('El producto ya existe', 400, CODES.PRODUCT.ALREADY_EXISTS);

        const existSupplier = await findSupplierById(productData.supplier_id, ctx)
        if (!existSupplier)
            throw new AppError('El proveedor no existe', 404, CODES.SUPPLIER.NOT_FOUND);

        const product = await save(productData, ctx);
        Log.infoCtx(ctx, productService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, product)
        return product;
    }
)

export const searchProducts = serviceHandler(
    productService,
    CODES.PRODUCT.NOT_FOUND,
    async (query = "", warehouseId, limit = 10, page = 1, ctx) => {
        Log.infoCtx(ctx, productService + consoleKeys.StartKey, consoleKeys.RequestKey, query)

        const products = await search(query, warehouseId, limit, page, ctx);
        Log.infoCtx(ctx, productService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, products)
        return products
    }
)

export const deleteProduct = serviceHandler(
    productService,
    CODES.PRODUCT.NOT_FOUND,
    async (id, ctx) => {
        Log.infoCtx(ctx, productService + consoleKeys.StartKey, consoleKeys.RequestKey, id)
        const product = await findById(id, ctx);
        if (!product) throw new AppError('El producto no existe', 404, CODES.PRODUCT.NOT_FOUND);

        const stockInfo = await search({ code: product.code }, null, 1, 1, ctx);

        if (stockInfo.items[0]?.dataValues.total_available_units > 0) {
            throw new AppError('El producto no puede ser eliminado porque tiene stock', 400, CODES.PRODUCT.HAS_STOCK);
        }

        Log.infoCtx(ctx, productService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, product)
        return await deleteById(id, ctx);
    }
)

export const updateProduct = serviceHandler(
    productService,
    CODES.PRODUCT.NOT_FOUND,
    async (productData = {}, ctx) => {
        Log.infoCtx(ctx, productService + consoleKeys.StartKey, consoleKeys.RequestKey, productData)

        const product = await findById(productData.id, ctx);
        if (!product) throw new AppError('El producto no existe', 404, CODES.PRODUCT.NOT_FOUND);

        const existSku = await findBySku(productData.sku, ctx);
        if (existSku && existSku.length > 1)
            throw new AppError('El producto ya con sku existe', 400, CODES.PRODUCT.ALREADY_EXISTS);

        const existCode = await findByCode(productData.code, ctx);
        if (existCode && existCode.length > 1)
            throw new AppError('El producto ya con codigo existe', 400, CODES.PRODUCT.ALREADY_EXISTS);

        const existSupplier = await findSupplierById(productData.supplier_id, ctx)
        if (!existSupplier)
            throw new AppError('El proveedor no existe', 404, supplierCodes.NOT_FOUND);
        console.log(productData.supplier_id + "KIAJ")

        await save(productData, ctx);
        Log.infoCtx(ctx, productService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, productData)

    }
)