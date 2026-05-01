import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const validateRegister = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El nombre"))
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El nombre", 3, 30))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(),

  body("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage(MSG.EMAIL.es())
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .isLength({ min: 8, max: 30 })
    .withMessage(MSG.LENGTH.es("La contraseña", 8, 30))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]$/)
    .withMessage(MSG.PASSWORD.es("La contraseña")),
];
``;
export const validateLogin = [
  body("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage(MSG.EMAIL.es())
    .normalizeEmail(),

  body("password").notEmpty().withMessage(MSG.REQUIRED.es("La contraseña")),
];
