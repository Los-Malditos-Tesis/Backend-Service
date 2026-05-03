import { body } from "express-validator";
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
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/)
    .withMessage(MSG.PASSWORD.es("La contraseña"))
    .bail(),
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
