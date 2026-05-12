import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const updateProfileValidator = [
  param("id").isUUID().withMessage("Invalid user id"),

  body("name")
    .optional()
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 30))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("el nombre")),

  body("email")
    .optional()
    .isEmail()
    .withMessage(MSG.INVALID_FORMAT.es("El email"))
    .normalizeEmail(),
];

export const updateStatusValidator = [
  param("id").isUUID().withMessage(MSG.INVALID_FORMAT.es("el id")),

  body("status")
    .notEmpty()
    .withMessage(MSG.EMPTY.es("el status"))
    .isBoolean()
    .withMessage(MSG.INVALID_FORMAT.es("el status")),
];
