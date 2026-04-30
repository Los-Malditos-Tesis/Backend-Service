import { body, param } from "express-validator";

export const locationUpdateValidator = [
  param("id").isUUID().withMessage("Invalid location"),

  body("zone")
    .exists()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El campo zone es obligatorio")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Zone must be between 3 and 30 characters")
    .bail()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage("Zone format is invalid (only letters, numbers, ., _, -)")
    .customSanitizer((value) => value.toUpperCase())
    .bail(),
];

export const locationDeleteValidator = [
  param("id").isUUID().withMessage("Invalid location"),
];
