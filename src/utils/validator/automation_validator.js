import { body } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";

export const merchandiseValidator = [
    body("gs1Code")
        .exists()
        .withMessage(MSG.REQUIRED.es("El código GS1"))
        .bail()
        .isString()
        .withMessage(MSG.STRING.es("El código GS1"))
        .bail()
        .trim()
        .isLength({ min: 15, max: 75 })
        .withMessage(MSG.LENGTH.es("El código GS1", 15, 75))
        .bail()
]