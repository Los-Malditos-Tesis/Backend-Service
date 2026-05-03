import { body, param, query } from "express-validator";
import { ORDER_TYPES, ORDER_UNIT_TYPES } from "../const/codes.js";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const createOrderValidator = [
  body("type")
    .exists()
    .withMessage(MSG.REQUIRED.es("El tipo de orden"))
    .bail()
    .isIn(Object.values(ORDER_TYPES))
    .withMessage(MSG.ORDER_TYPE.es()),

  body("unit_type")
    .exists()
    .withMessage(MSG.REQUIRED.es("El tipo de unidad"))
    .bail()
    .isIn(Object.values(ORDER_UNIT_TYPES))
    .withMessage(MSG.UNIT_TYPE.es()),

  body("warehouse_id")
    .exists()
    .withMessage(MSG.REQUIRED.es("El almacén"))
    .bail()
    .isUUID()
    .withMessage(MSG.UUID.es("El almacén")),

  body("destination_warehouse_id")
    .optional()
    .isUUID()
    .withMessage(MSG.UUID.es("El almacén de destino")),

  body("store_id")
    .optional()
    .isUUID()
    .withMessage(MSG.UUID.es("El id de la tienda")),
];

export const searchOrdersValidator = [
  query("type")
    .optional()
    .isIn(Object.values(ORDER_TYPES))
    .withMessage(MSG.ORDER_TYPE.es()),

  query("status")
    .optional()
    .isIn(Object.values(ORDER_STATUS))
    .withMessage(MSG.STATUS.es()),

  query("unit_type")
    .optional()
    .isIn(Object.values(ORDER_UNIT_TYPES))
    .withMessage(MSG.UNIT_TYPE.es()),
];

export const updateOrderValidator = [
  param("id").isUUID().withMessage(MSG.ID_UUID.es()),

  body("type")
    .optional()
    .isIn(Object.values(ORDER_TYPES))
    .withMessage(MSG.ORDER_TYPE.es()),

  body("unit_type")
    .optional()
    .isIn(Object.values(ORDER_UNIT_TYPES))
    .withMessage(MSG.UNIT_TYPE.es()),
];

export const changeOrderStatusValidator = [
  param("id").isUUID().withMessage(MSG.ID_UUID.es()),

  body("status")
    .exists()
    .withMessage(MSG.REQUIRED.es("El estado"))
    .bail()
    .isIn(Object.values(ORDER_STATUS))
    .withMessage(MSG.STATUS.es()),
];

export const deleteOrderValidator = [
  param("id").isUUID().withMessage(MSG.ID_UUID.es()),
];
