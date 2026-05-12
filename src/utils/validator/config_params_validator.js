import { body, params } from "express-validator"
import { CONFIG_TYPE } from "../const/status.js"
import {  VALIDATION_MESSAGES as MSG } from "../const/messages.js"

export const validateCreateConfigParams = [
    body("key")
        .exists()
        .withMessage(MSG.REQUIRED.es("La clave"))
        .bail()
        .isIn(Object.values(CONFIG_TYPE))
        .withMessage(MSG.STRING.es("La clave"))
        .bail(),
    body("value")
        .exists()
        .withMessage(MSG.REQUIRED.es("El valor"))
        .bail()
        .isString()
        .withMessage(MSG.STRING.es("El valor"))
        .bail()
        .trim()    
]

export const validateUpdateConfigParams = [
    params("id")
        .exists()
        .withMessage(MSG.REQUIRED.es("El id"))
        .bail()
        .isUUID()
        .withMessage(MSG.UUID.es("El id")),
    body("key")
        .optional()
        .isIn(Object.values(CONFIG_TYPE))
        .withMessage(MSG.STRING.es("La clave"))
        .bail(),
    body("value")
        .optional()
        .isString()
        .withMessage(MSG.STRING.es("El valor"))
        .bail()
        .trim()
]

export const validateIdConfigParams = [
    params("id")
    .exists()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.UUID.es("El id"))
]