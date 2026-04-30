import { body, param } from "express-validator";

export const validateCreateWarehouse = [
    body("name")
        .trim()
        .escape()
        .notEmpty().withMessage("El nombre es requerido")
        .isLength({ min: 3, max: 30 }).withMessage("El nombre debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos, guiones, comas, barras invertidas y guiones"),
    body("address")
        .trim()
        .escape()
        .notEmpty().withMessage("La dirección es requerida")
        .isLength({ min: 3, max: 250 }).withMessage("La dirección debe tener entre 3 y 250 caracteres")
        .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/).withMessage("La dirección solo puede contener letras, números, puntos, guiones bajos, guiones, comas, barras invertidas y guiones")
]

export const validateUpdateWarehouse = [
    body("id")
        .trim()
        .escape()
        .notEmpty().withMessage("El id es requerido")
        .isUUID().withMessage("El id no es valido"),
    body("name")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage("El nombre debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos, guiones, comas, barras invertidas y guiones"),
    body("address")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 250 }).withMessage("La dirección debe tener entre 3 y 250 caracteres")
        .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/).withMessage("La dirección solo puede contener letras, números, puntos, guiones bajos, guiones, comas, barras invertidas y guiones")
]

export const validateDeleteWarehouse = [
    param("id")
        .trim()
        .escape()
        .notEmpty().withMessage("El id es requerido")
        .isUUID().withMessage("El id no es valido")
]

export const validateGetWarehouseById = [
    param("id")
        .trim()
        .escape()
        .notEmpty().withMessage("El id es requerido")
        .isUUID().withMessage("El id no es valido")
]

export const validateSearchWarehouses = [
    body("id")
        .optional()
        .trim()
        .escape()
        .isUUID().withMessage("El id no es valido"),
    body("name")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 30 }).withMessage("El nombre debe tener entre 3 y 30 caracteres")
        .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/).withMessage("El nombre solo puede contener letras, números, puntos, guiones bajos, guiones, comas, barras invertidas y guiones"),
    body("address")
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 250 }).withMessage("La dirección debe tener entre 3 y 250 caracteres")
        .matches(/^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/).withMessage("La dirección solo puede contener letras, números, puntos, guiones bajos, guiones, comas, barras invertidas y guiones")
]


export const validateGetWarehouseInventory = [
    param("locationId")
        .trim()
        .escape()
        .notEmpty().withMessage("El locationId es requerido")
        .isUUID().withMessage("El locationId no es valido"),
    param("id")
        .trim()
        .escape()
        .notEmpty().withMessage("El id es requerido")
        .isUUID().withMessage("El id no es valido")
]
