import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { createProduct } from "../service/product_service.js"
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
