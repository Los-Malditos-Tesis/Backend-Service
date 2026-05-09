import { body, param, query } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const createDeviceValidator = [
  body("code")
    .exists()
    .withMessage(MSG.REQUIRED.es("El código"))
    .bail()
    .isString()
    .withMessage(MSG.STRING.es("El código"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(MSG.LENGTH.es("El código", 3, 50))
    .bail()
    .matches(/^[A-Za-z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código"))
    .bail(),

  body("location_id")
    .exists()
    .withMessage(MSG.REQUIRED.es("La ubicación"))
    .bail()
    .isUUID()
    .withMessage(MSG.UUID.es("La ubicación"))
    .bail(),
];

export const searchCamerasValidator = [
  query("code")
    .optional()
    .isString()
    .withMessage(MSG.STRING.es("El código"))
    .bail()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(MSG.LENGTH.es("El código", 1, 50))
    .bail()
    .matches(/^[A-Za-z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código")),

  query("location_id")
    .optional()
    .isUUID()
    .withMessage(MSG.UUID.es("La ubicación")),
];

export const updateCameraValidator = [
  param("id")
    .exists()
    .withMessage(MSG.REQUIRED.es("El id"))
    .bail()
    .isUUID()
    .withMessage(MSG.UUID.es("El id")),

  body("code")
    .optional()
    .isEmpty()
    .withMessage(MSG.EMPTY.es("El código"))
    .isString()
    .withMessage(MSG.STRING.es("El código"))
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(MSG.LENGTH.es("El código", 3, 50))
    .bail()
    .matches(/^[A-Za-z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código"))
    .bail(),

  body("location_id")
    .optional()
    .isEmpty()
    .withMessage(MSG.EMPTY.es("La ubicación"))
    .isUUID()
    .withMessage(MSG.UUID.es("La ubicación"))
    .bail(),
];

export const deleteCameraValidator = [
  param("id")
    .exists()
    .withMessage(MSG.REQUIRED.es("El id"))
    .bail()
    .isUUID()
    .withMessage(MSG.UUID.es("El id")),
];
