import { body, query, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const createSupplierValidator = [
  body("name")
    .exists()
    .withMessage(MSG.REQUIRED.es("El nombre"))
    .bail()
    .isString()
    .withMessage(MSG.STRING.es("El nombre"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 100))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre")),

  body("code")
    .exists()
    .withMessage(MSG.REQUIRED.es("El código"))
    .bail()
    .isString()
    .withMessage(MSG.STRING.es("El código"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30))
    .bail()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código"))
    .bail(),

  body("contactName")
    .exists()
    .withMessage(MSG.REQUIRED.es("El nombre de contacto"))
    .bail()
    .isString()
    .withMessage(MSG.STRING.es("El nombre de contacto"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage(MSG.LENGTH.es("El nombre de contacto", 3, 80))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre de contacto"))
    .bail(),

  body("phone")
    .exists()
    .withMessage(MSG.REQUIRED.es("El teléfono"))
    .bail()
    .isString()
    .withMessage(MSG.STRING.es("El teléfono"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El teléfono", 3, 30))
    .bail()
    .matches(/^[0-9+() \-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El teléfono"))
    .bail(),

  body("email")
    .exists()
    .withMessage(MSG.REQUIRED.es("El correo electrónico"))
    .bail()
    .isString()
    .withMessage(MSG.STRING.es("El correo electrónico"))
    .bail()
    .trim()
    .isEmail()
    .withMessage(MSG.INVALID_FORMAT.es("El correo electrónico")),

  body("location")
    .exists()
    .withMessage(MSG.REQUIRED.es("La ubicación"))
    .bail()
    .isString()
    .withMessage(MSG.STRING.es("La ubicación"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage(MSG.LENGTH.es("La ubicación", 3, 80))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ .,#_-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La ubicación")),
];

export const searchSuppliersValidator = [
  param("id").optional().isUUID().withMessage(MSG.UUID.es()).bail().trim(),

  query("name")
    .optional()
    .isString()
    .bail()
    .trim()
    .withMessage(MSG.STRING.es("El nombre"))
    .isLength({ min: 1, max: 100 })
    .withMessage(MSG.LENGTH.es("El nombre", 1, 100))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre"))
    .bail(),

  query("code")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El código"))
    .bail()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 1, 30))
    .bail()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código"))
    .bail(),

  query("phone")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El telefono"))
    .bail()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(MSG.LENGTH.es("El telefono", 1, 30))
    .bail()
    .matches(/^[0-9+() \-]+$/)
    .withMessage(MSG.PHONE.es())
    .bail(),

  query("email")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El email"))
    .bail()
    .trim()
    .isEmail()
    .withMessage(MSG.EMAIL.es()),

  query("contactName")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El nombre de contacto"))
    .bail()
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage(MSG.LENGTH.es("El nombre de contacto", 1, 80))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre de contacto")),

  query("location")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("La ubicacion"))
    .bail()
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage(MSG.LENGTH.es("La ubicacion", 1, 80))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ .,#_-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La ubicacion")),
];

export const updateSupplierValidator = [
  param("id").isUUID().withMessage(MSG.UUID.es()),

  body("name")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El nombre"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 100))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre")),

  body("code")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El código"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30))
    .bail()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código"))
    .bail(),

  body("email")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El correo electrónico"))
    .bail()
    .trim()
    .isEmail()
    .withMessage(MSG.INVALID_FORMAT.es("El correo electrónico")),

  body("phone")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El teléfono"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El teléfono", 3, 30))
    .bail()
    .matches(/^[0-9+() \-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El teléfono"))
    .bail(),

  body("contactName")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El nombre de contacto"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage(MSG.LENGTH.es("El nombre de contacto", 3, 80))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El nombre de contacto"))
    .bail(),

  body("location")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("La ubicación"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage(MSG.LENGTH.es("La ubicación", 3, 80))
    .bail()
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ .,#_-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("La ubicación")),
];

export const deleteSupplierValidator = [
  param("id").isUUID().withMessage(MSG.UUID.es()),
];
