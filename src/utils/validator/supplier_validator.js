import { body, query } from "express-validator";

export const createSupplierValidator = [
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("name must be between 3 and 100 characters")
    .bail()
    .matches(/^[a-zA-Z0-9 ._-]+$/)
    .withMessage("name contains invalid characters"),

  body("code")
    .exists()
    .withMessage("code is required")
    .bail()
    .isString()
    .withMessage("code must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("code must be between 3 and 30 characters")
    .bail()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage("code contains invalid characters")
    .bail(),

  body("contactName")
    .exists()
    .withMessage("contactName is required")
    .bail()
    .isString()
    .withMessage("contactName must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage("contactName must be between 3 and 80 characters")
    .bail()
    .matches(/^[a-zA-Z0-9 ._-]+$/)
    .withMessage("contactName contains invalid characters"),

  body("phone")
    .exists()
    .withMessage("phone is required")
    .bail()
    .isString()
    .withMessage("phone must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("phone must be between 3 and 30 characters")
    .bail()
    .matches(/^[0-9+() \-]+$/)
    .withMessage("phone format is invalid"),

  body("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .isString()
    .withMessage("email must be a string")
    .bail()
    .trim()
    .isEmail()
    .withMessage("email format is invalid"),

  body("location")
    .exists()
    .withMessage("location is required")
    .bail()
    .isString()
    .withMessage("location must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage("location must be between 3 and 80 characters")
    .bail()
    .matches(/^[a-zA-Z0-9 ._-]+$/)
    .withMessage("location contains invalid characters"),
];

export const searchSuppliersValidator = [
  query("id").optional().isUUID().withMessage("Id invalido").bail().trim(),

  query("name")
    .optional()
    .isString()
    .bail()
    .trim()
    .withMessage("Nombre invalido")
    .isLength({ min: 1, max: 100 })
    .withMessage("Nombre debe tener entre 1 y 100 caracteres")
    .bail()
    .matches(/^[a-zA-Z0-9 ._-]+$/),

  query("code")
    .optional()
    .isString()
    .withMessage("code must be a string")
    .bail()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("code max 30 characters")
    .bail()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage("code contains invalid characters"),

  query("phone")
    .optional()
    .isString()
    .withMessage("El telefono debe ser una cadena de caracteres")
    .bail()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("El telefono debe tener entre 1 y 30 caracteres")
    .bail()
    .matches(/^[0-9+() \-]+$/)
    .withMessage("El telefono contiene caracteres invalidos"),

  query("email")
    .optional()
    .isString()
    .withMessage("El email debe ser una cadena de caracteres")
    .bail()
    .trim()
    .isEmail()
    .withMessage("El email contiene caracteres invalidos"),

  query("contactName")
    .optional()
    .isString()
    .withMessage("El nombre de contacto debe ser una cadena de caracteres")
    .bail()
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage("El nombre de contacto debe tener entre 1 y 80 caracteres")
    .bail()
    .matches(/^[a-zA-Z0-9 ._-]+$/)
    .withMessage("El nombre de contacto contiene caracteres invalidos"),

  query("location")
    .optional()
    .isString()
    .withMessage("La ubicacion debe ser una cadena de caracteres")
    .bail()
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage("La ubicacion debe tener entre 1 y 80 caracteres")
    .bail()
    .matches(/^[a-zA-Z0-9 ._-]+$/)
    .withMessage("location contains invalid characters"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("El limite debe estar entre 1 y 100")
    .toInt(),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La pagina debe ser mayor o igual a 1")
    .toInt(),
];
