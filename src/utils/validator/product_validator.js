import { body, param } from "express-validator";

export const validateCreateProduct = [
    body("name")
        .trim()
        .escape()
        .notEmpty().withMessage("El nombre es requerido")
        .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("code")
        .trim()
        .escape()
        .notEmpty().withMessage("El código es requerido")
        .isLength({ min: 3, max: 30 }).withMessage("El código debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El código solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("category")
        .trim()
        .escape()
        .notEmpty().withMessage("La categoría es requerida")
        .isLength({ min: 3, max: 30 }).withMessage("La categoría debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z._-]+$/).withMessage("La categoría solo puede contener letras, puntos, guiones bajos y guiones"),
    body("sku")
        .trim()
        .escape()
        .notEmpty().withMessage("El sku es requerido")
        .isLength({ min: 3, max: 50 }).withMessage("El sku debe tener entre 3 y 50 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El sku solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("supplier_id")
        .trim()
        .escape()
        .notEmpty().withMessage("El proveedor es requerido")
        .isUUID().withMessage("El proveedor no es valido")
]

export const validateSearchProducts = [
    body("warehouse_id")
        .optional()
        .trim()
        .escape()
        .isUUID().withMessage("El warehouse_id no es valido"),
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
    body("name")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("code")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage("El código debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El código solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("category")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage("La categoría debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z._-]+$/).withMessage("La categoría solo puede contener letras, puntos, guiones bajos y guiones"),
    body("sku")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 50 }).withMessage("El sku debe tener entre 3 y 50 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El sku solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("supplier_id")
        .optional()
        .trim()
        .escape()
        .isUUID().withMessage("El proveedor no es valido")
]

export const validateUpdateProduct = [
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
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("code")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage("El código debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El código solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("category")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage("La categoría debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z._-]+$/).withMessage("La categoría solo puede contener letras, puntos, guiones bajos y guiones"),
    body("sku")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 50 }).withMessage("El sku debe tener entre 3 y 50 caracteres")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("El sku solo puede contener letras, números, puntos, guiones bajos y guiones"),
    body("supplier_id")
        .optional()
        .trim()
        .escape()
        .isUUID().withMessage("El proveedor no es valido")
]

export const validateDeleteProduct = [
    param("id")
        .trim()
        .escape()
        .notEmpty().withMessage("El id es requerido")
        .isUUID().withMessage("El id no es valido")
]