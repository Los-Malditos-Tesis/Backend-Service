import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";
import { ITEM_TYPES } from "../const/status.js";

export const validateSearchController = [
    body("camera_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.REQUIRED.es("El id de la camara")),
    body("qrCode")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El codigo QR", 3, 100)),
    body("detectedType")
    .optional()
    .trim()
    .escape()
    .isIn(Object.values(ITEM_TYPES))
    .withMessage("El tipo de item no es valido")
    .bail(),
    body("status")
    .optional()
    .trim()
    .escape()
    .isIn(Object.values(DEVICE_STATUS))
    .withMessage("El status no es valido")
    .bail(),
    body("confidense")
    .optional()
    .trim()
    .escape()
]