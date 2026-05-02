import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const validateCreateStore = [
    body("name")
        .trim()
        .escape()
        .notEmpty().withMessage(MSG.REQUIRED.es("El nombre"))
        .isLength({ min: 3, max: 100 }).withMessage(MSG.LENGTH.es("El nombre", 3, 100))
        .matches(/^[a-zA-Z0-9._\-\s]+$/).withMessage(MSG.INVALID_FORMAT.es("El nombre")),
    body("code")
        .trim()
        .escape()
        .notEmpty().withMessage(MSG.REQUIRED.es("El código"))
        .isLength({ min: 3, max: 30 }).withMessage(MSG.LENGTH.es("El código", 3, 30))
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage(MSG.INVALID_FORMAT.es("El código")),
    body("address")
        .trim()
        .escape()
        .notEmpty().withMessage(MSG.REQUIRED.es("La dirección"))
        .isLength({ min: 3, max: 100 }).withMessage(MSG.LENGTH.es("La dirección", 3, 100))
        .matches(/^[a-zA-Z0-9.,#_\-\s]+$/).withMessage(MSG.INVALID_FORMAT.es("La dirección")),
];

export const validateUpdateStore = [
    body("id")
        .trim()
        .escape()
        .notEmpty().withMessage(MSG.REQUIRED.es("El id"))
        .isUUID().withMessage(MSG.INVALID_FORMAT.es("El id")),
    body("name")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage(MSG.LENGTH.es("El nombre", 3, 100))
        .matches(/^[a-zA-Z0-9._\-\s]+$/).withMessage(MSG.INVALID_FORMAT.es("El nombre")),
    body("code")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage(MSG.LENGTH.es("El código", 3, 30))
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage(MSG.INVALID_FORMAT.es("El código")),
    body("address")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage(MSG.LENGTH.es("La dirección", 3, 100))
        .matches(/^[a-zA-Z0-9.,#_\-\s]+$/).withMessage(MSG.INVALID_FORMAT.es("La dirección")),
];

export const validateIdParamStore = [
    param("id")
        .trim()
        .escape()
        .notEmpty().withMessage(MSG.REQUIRED.es("El id"))
        .isUUID().withMessage(MSG.INVALID_FORMAT.es("El id")),
];

export const validateGetStoreByCode = [
    param("code")
        .trim()
        .escape()
        .notEmpty().withMessage(MSG.REQUIRED.es("El código"))
        .isLength({ min: 3, max: 30 }).withMessage(MSG.LENGTH.es("El código", 3, 30))
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage(MSG.INVALID_FORMAT.es("El código")),
];

export const validateSearchStores = [
    body("code")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage(MSG.LENGTH.es("El código", 3, 30))
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage(MSG.INVALID_FORMAT.es("El código")),
    body("name")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage(MSG.LENGTH.es("El nombre", 3, 100))
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage(MSG.INVALID_FORMAT.es("El nombre")),
    body("address")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage(MSG.LENGTH.es("La dirección", 3, 100))
        .matches(/^[a-zA-Z0-9.,#_\-\s]+$/).withMessage(MSG.INVALID_FORMAT.es("La dirección")),
    body("limit")
        .optional()
        .trim()
        .escape()
        .isInt({ min: 1 }).withMessage(MSG.MIN.es("El límite", 1)),
    body("page")
        .optional()
        .trim()
        .escape()
        .isInt({ min: 1 }).withMessage(MSG.MIN.es("La página", 1)),
];