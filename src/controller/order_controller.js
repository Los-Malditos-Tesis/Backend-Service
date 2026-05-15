import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import { CODES } from "../utils/const/codes.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import {
  changeOrderStatus,
  createOrder,
  deleteOrder,
  searchOrdersService,
  updateOrder,
} from "../service/order_service.js";
import { searchOrders } from "../repositories/order_repository.js";

const orderController = "order controller: ";

export const createOrdenController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
    );

    const resp = await createOrder(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Orden creada exitosamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, orderController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, orderController + consoleKeys.FinishKey);
  }
};

export const searchOrdersController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.StartKey,
      consoleKeys.QueryKey,
      req.query,
    );

    const resp = await searchOrdersService(req.query, req.query.limit, req.query.page, req.ctx);

    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Ordenes encontradas",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, orderController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, orderController + consoleKeys.FinishKey);
  }
};

export const updateOrderController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
      consoleKeys.ParamKey,
      req.params,
    );

    const { id } = req.params;
    const { type, unit_type } = req.body;

    const resp = await updateOrder({ id, type, unit_type }, ctx);

    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Ordenes actualizda exitosamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, orderController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, orderController + consoleKeys.FinishKey);
  }
};

export const changeOrderStatusController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      req.body,
      consoleKeys.ParamKey,
      req.params,
    );

    const { id } = req.params;
    const { status } = req.body;

    const resp = await changeOrderStatus(id, status, ctx);

    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Ordenes actualizada exitosamente",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, orderController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, orderController + consoleKeys.FinishKey);
  }
};

export const deleteOrderController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.StartKey,
      consoleKeys.ParamKey,
      req.params,
    );

    const { id } = req.params;

    Log.infoCtx(req.ctx, orderController + consoleKeys.StartKey, consoleKeys.ParamKey, { id });

    const resp = await deleteOrder(id, req.ctx);

    Log.infoCtx(
      req.ctx,
      orderController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.OK,
      "Ordenes eliminada con extio",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, orderController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, orderController + consoleKeys.FinishKey);
  }
};
