import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const validateCreateProduct = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El nombre"))
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 100))
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre")),
  body("code")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El código"))
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código")),
  body("category")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("La categoría"))
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("La categoría", 3, 30))
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La categoría")),
  body("sku")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El sku"))
    .isLength({ min: 3, max: 50 })
    .withMessage(MSG.LENGTH.es("El sku", 3, 50))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El sku")),
  body("supplier_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El proveedor"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El proveedor")),
];

export const validateSearchProducts = [
  body("warehouse_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El warehouse_id")),

  body("name")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 100))
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre")),
  body("code")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código")),
  body("category")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("La categoría", 3, 30))
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La categoría")),
  body("sku")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage(MSG.LENGTH.es("El sku", 3, 50))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El sku")),
  body("supplier_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El proveedor")),
];

export const validateUpdateProduct = [
  body("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),
  body("name")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 100))
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre")),
  body("code")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código")),

  body("category")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("La categoría", 3, 30))
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La categoría")),
  body("sku")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 50 })
    .withMessage(MSG.LENGTH.es("El sku", 3, 50))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El sku")),
  body("supplier_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El proveedor")),
];

export const validateDeleteProduct = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),
];

export const validateGetProductById = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),
];
