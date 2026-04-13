import {
    save,
    findBySupplierId,
    findById,
    findAll,
    findBySku,
    findByCode,
    findByCategory,
    deleteById
} from "../repositories/product_repository.js";
import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { productCodes } from "../errors/error_codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";

import {
    findById as findSupplierById
} from "../repositories/supplier_repository.js"

const productService = "product service: "

export const createProduct = serviceHandler(
    productService,
    productCodes.NOT_FOUND,
    async (productData = {}, ctx) => {
        Log.infoCtx(ctx, productService + consoleKeys.StartKey, consoleKeys.RequestKey, productData)

        const existSku = await findBySku(productData.sku, ctx);
        const existCode = await findByCode(productData.code, ctx);
        if (existSku || existCode)
            throw new AppError('El producto ya existe', 400, productCodes.ALREADY_EXISTS);

        const existSupplier = await findSupplierById(productData.supplierId)
        if (!existSupplier)
            throw new AppError('El proveedor no existe', 404, supplierCodes.NOT_FOUND);

        await save(productData, ctx);
        Log.infoCtx(ctx, productService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, productData)

    }
)

