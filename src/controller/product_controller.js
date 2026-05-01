import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { createProduct, deleteProduct, getProductById, searchProducts, updateProduct } from "../service/product_service.js"
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";

const productController = "product controller: "

export const createProductController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, productController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body)
        const response = await createProduct(req.body, req.ctx);

        Log.infoCtx(req.ctx, productController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 201, CODES.SUCCESS.CREATED, 'Product created successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, productController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, productController + consoleKeys.FinishKey)
    }
}

export const searchProductsController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, productController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body)
        const response = await searchProducts(req.body, req.body.warehouse_id, req.body.limit, req.body.page, req.ctx);

        Log.infoCtx(req.ctx, productController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Product search successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, productController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, productController + consoleKeys.FinishKey)
    }
}

export const updateProductController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, productController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body)
        const response = await updateProduct(req.body, req.ctx);

        Log.infoCtx(req.ctx, productController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Product updated successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, productController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, productController + consoleKeys.FinishKey)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, productController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body)
        const response = await deleteProduct(req.params.id, req.ctx);

        Log.infoCtx(req.ctx, productController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Product deleted successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, productController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, productController + consoleKeys.FinishKey)
    }
}

export const getProductByIdController = async (req, res, next) => {
    try {
        Log.infoCtx(req.ctx, productController + consoleKeys.StartKey, consoleKeys.RequestKey, req.body)
        const response = await getProductById(req.params.id, req.ctx);

        Log.infoCtx(req.ctx, productController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, response)

        return generalResponse(res, 200, CODES.SUCCESS.OK, 'Product get successfully', response)
    } catch (e) {
        Log.errorCtx(req.ctx, productController + consoleKeys.FailKey, e);
        next(e);
    } finally {
        Log.infoCtx(req.ctx, productController + consoleKeys.FinishKey)
    }
}
