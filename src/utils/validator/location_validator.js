import { body, param } from "express-validator";

export const locationCreateValidator = [
  body("zone")
    .exists()
    .isString()
    .trim()
    .notEmpty().withMessage("El campo zone es obligatorio")
    .isLength({ min: 3, max: 30 }).withMessage("Zone must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9._-]+$/).withMessage("Zone format is invalid (only letters, numbers, ., _, -)")
    .customSanitizer((value) => value.toUpperCase())
    .bail(),
];

export const locationSearchValidator = [
  body("zone")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage("Zone must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9._-]+$/).withMessage("Zone format is invalid (only letters, numbers, ., _, -)")
    .customSanitizer((value) => value.toUpperCase())
    .bail(),
  body("page")
    .optional()
    .isInt({ min: 1 }).withMessage("Page must be a positive integer")
    .toInt(),
  body("limit")
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage("Limit must be a positive integer between 1 and 100")
    .toInt(),
  body("id")
    .optional()
    .isUUID().withMessage("Invalid ID")
    .bail(),
  body("warehouse_id")
    .optional()
    .isUUID().withMessage("Invalid warehouse ID")
    .bail(),
];

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
