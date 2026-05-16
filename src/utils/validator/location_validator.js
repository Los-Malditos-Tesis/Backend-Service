import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const locationCreateValidator = [
  body("zone")
    .exists()
    .isString()
    .trim()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("La zona"))
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("La zona", 3, 30))
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.ZONE.es())
    .customSanitizer((value) => value.toUpperCase())
    .bail(),
];

export const locationSearchValidator = [
  body("zone")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("La zona", 3, 30))
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.ZONE.es())
    .customSanitizer((value) => value.toUpperCase())
    .bail(),

  body("id").optional().isUUID().withMessage(MSG.UUID.es()).bail(),

  body("warehouse_id")
    .optional()
    .isUUID()
    .withMessage(MSG.UUID.es("El id del almacén"))
    .bail(),
];

export const locationUpdateValidator = [
  param("id").isUUID().withMessage(MSG.UUID.es()),

  body("zone")
    .exists()
    .isString()
    .trim()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("La zona"))
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("La zona", 3, 30))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.ZONE.es())
    .customSanitizer((value) => value.toUpperCase())
    .bail(),
];

export const locationDeleteValidator = [
  param("id").isUUID().withMessage(MSG.UUID.es()),
];
