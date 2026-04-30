import { body } from "express-validator";

export const createSupplierValidator = [
  body("name")
    .exists()
    .bail()
    .isString()
    .bail()
    .trim()
    .matches(/^[a-zA-Z0-9 ._-]+$/)
    .withMessage("Nombre invalido")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nombre debe tener entre 3 y 100 caracteres")
    .bail(),

  body("code")
    .exists()
    .bail()
    .isString()
    .bail()
    .trim()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage("Codigo invalido")
    .isLength({ min: 3, max: 30 })
    .withMessage("Codigo debe tener entre 3 y 30 caracteres")
    .bail(),

  body("contactName")
    .exists()
    .bail()
    .isString()
    .bail()
    .trim()
    .matches(/^[a-zA-Z0-9 ._-]+$/)
    .withMessage("Nombre de contacto invalido")
    .isLength({ min: 3, max: 80 })
    .withMessage("Nombre de contacto debe tener entre 3 y 80 caracteres")
    .bail(),

  body("phone")
    .exists()
    .bail()
    .isString()
    .bail()
    .trim()
    .matches(/^[0-9+() \-]+$/)
    .withMessage("Telefono invalido")
    .isLength({ min: 3, max: 30 })
    .withMessage("Telefono debe tener entre 3 y 30 caracteres")
    .bail(),

  body("email")
    .exists()
    .bail()
    .isString()
    .bail()
    .trim()
    .isEmail()
    .withMessage("Correo invalido"),

  body("location")
    .exists()
    .bail()
    .isString()
    .bail()
    .trim()
    .matches(/^[a-zA-Z0-9 ._-]+$/)
    .withMessage("Ubicacion invalida")
    .isLength({ min: 3, max: 80 })
    .withMessage("Ubicacion debe tener entre 3 y 80 caracteres")
    .bail(),
];
