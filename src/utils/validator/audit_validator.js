import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";
import { ENTITY_ACTIONS } from "../const/status.js";

const entityActions = Object.values(ENTITY_ACTIONS);

export const validateCreateAudit = [
  body("actions")
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("La acción"))
    .isIn(entityActions)
    .withMessage(MSG.STATUS.es("La acción")),

  body("table")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("La tabla"))
    .isLength({ min: 1, max: 100 })
    .withMessage(MSG.LENGTH.es("La tabla", 1, 100)),

  body("newValue")
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El nuevo valor (newValue)"))
    .isObject()
    .withMessage(MSG.INVALID_FORMAT.es("El nuevo valor (newValue)")),

  body("oldValue")
    .optional({ nullable: true })
    .isObject()
    .withMessage(MSG.INVALID_FORMAT.es("El valor anterior (oldValue)")),

  body("user_id")
    .optional({ nullable: true })
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El user_id")),
];

export const validateUpdateAudit = [
  body("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),

  body("actions")
    .optional()
    .isIn(entityActions)
    .withMessage(MSG.STATUS.es("La acción")),

  body("table")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage(MSG.LENGTH.es("La tabla", 1, 100)),

  body("newValue")
    .optional()
    .isObject()
    .withMessage(MSG.INVALID_FORMAT.es("El nuevo valor (newValue)")),

  body("oldValue")
    .optional({ nullable: true })
    .isObject()
    .withMessage(MSG.INVALID_FORMAT.es("El valor anterior (oldValue)")),

  body("user_id")
    .optional({ nullable: true })
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El user_id")),
];

export const validateDeleteAudit = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),
];

export const validateGetAuditById = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),
];

export const validateSearchAudits = [
  body("actions")
    .optional()
    .isIn(entityActions)
    .withMessage(MSG.STATUS.es("La acción")),
  body("table")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage(MSG.LENGTH.es("La tabla", 1, 100)),
  body("user_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El user_id")),
];
