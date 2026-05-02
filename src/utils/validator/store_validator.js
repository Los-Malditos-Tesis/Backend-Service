import { body, param } from "express-validator";

export const validateCreateStore = [
    body("name")
        .trim()
        .escape()
        .notEmpty().withMessage("El nombre es requerido")
        .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres")
        .matches(/^[a-zA-Z0-9._\-\s]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos y espacios"),
    body("code")
        .trim()
        .escape()
        .notEmpty().withMessage("El código es requerido")
        .isLength({ min: 3, max: 30 }).withMessage("El código debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El código solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("address")
        .trim()
        .escape()
        .notEmpty().withMessage("La dirección es requerida")
        .isLength({ min: 3, max: 100 }).withMessage("La dirección debe tener entre 3 y 100 caracteres")
        .matches(/^[a-zA-Z0-9.,#_\-\s]+$/).withMessage("La dirección solo puede contener letras, números, puntos, comas, almohadillas, guiones bajos y espacios"),
];

export const validateUpdateStore = [
    body("id")
        .trim()
        .escape()
        .notEmpty().withMessage("El id es requerido")
        .isUUID().withMessage("El id no es valido"),
    body("name")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres")
        .matches(/^[a-zA-Z0-9._\-\s]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("code")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage("El código debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El código solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("address")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage("La dirección debe tener entre 3 y 100 caracteres")
        .matches(/^[a-zA-Z0-9.,#_\-\s]+$/).withMessage("La dirección solo puede contener letras, números, puntos, comas, almohadillas, guiones bajos y espacios"),
];

export const validateIdParamStore = [
    param("id")
        .trim()
        .escape()
        .notEmpty().withMessage("El id es requerido")
        .isUUID().withMessage("El id no es valido"),
];

export const validateGetStoreByCode = [
    param("code")
        .trim()
        .escape()
        .notEmpty().withMessage("El código es requerido")
        .isLength({ min: 3, max: 30 }).withMessage("El código debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El código solo puede contener letras, números, puntos, guiones bajos y guiones"),
];

export const validateSearchStores = [
    body("code")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage("El código debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El código solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("name")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("address")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage("La dirección debe tener entre 3 y 100 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("La dirección solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("limit")
        .optional()
        .trim()
        .escape()
        .isInt({ min: 1 }).withMessage("El limit debe ser un numero mayor o igual a 1"),
    body("page")
        .optional()
        .trim()
        .escape()
        .isInt({ min: 1 }).withMessage("El page debe ser un numero mayor o igual a 1"),
];