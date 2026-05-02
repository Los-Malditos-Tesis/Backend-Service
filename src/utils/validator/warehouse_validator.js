import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const validateCreateWarehouse = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El nombre"))
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 30))
    .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre")),

  body("address")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("La dirección"))
    .isLength({ min: 3, max: 250 })
    .withMessage(MSG.LENGTH.es("La dirección", 3, 250))
    .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La dirección")),
];

export const validateUpdateWarehouse = [
  body("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.UUID.es("El id")),

  body("name")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 30))
    .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre")),

  body("address")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 250 })
    .withMessage(MSG.LENGTH.es("La dirección", 3, 250))
    .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La dirección")),
];

export const validateDeleteWarehouse = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.UUID.es("El id")),
];

export const validateGetWarehouseById = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.UUID.es("El id")),
];

export const validateSearchWarehouses = [
  body("id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.UUID.es("El id")),
  body("name")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 30))
    .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre")),
  body("address")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 250 })
    .withMessage(MSG.LENGTH.es("La dirección", 3, 250))
    .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La dirección")),
];

export const validateGetWarehouseInventory = [
  param("locationId")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El locationId"))
    .isUUID()
    .withMessage(MSG.UUID.es("El locationId")),
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.UUID.es("El id")),
];
