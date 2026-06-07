import { param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const patchCameraStatusValidator = [
  param("id")
    .exists()
    .withMessage(MSG.REQUIRED.es("El id"))
    .bail()
    .isUUID()
    .withMessage(MSG.UUID.es("El id"))
    .bail(),
];
