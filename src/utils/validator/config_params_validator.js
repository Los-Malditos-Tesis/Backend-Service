import { body } from "express-validator"
import { CONFIG_TYPE, SCANNING_MODE_CONFIG } from "../const/status.js"
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js"

export const validateCreateConfigParams = [
    body("key")
        .exists()
        .withMessage(MSG.REQUIRED.es("La clave"))
        .bail()
        .isIn(Object.values(CONFIG_TYPE))
        .withMessage(MSG.STRING.es("La clave"))
        .bail(),
    body("value")
        .exists()
        .withMessage(MSG.REQUIRED.es("El valor"))
        .bail()
        .isString()
        .withMessage(MSG.STRING.es("El valor"))
        .bail()
        .trim()
        .custom((value, { req }) => {
            if (req.body.key === CONFIG_TYPE.SCANNING_MODE) {
                const validModes = Object.values(SCANNING_MODE_CONFIG);
                if (!validModes.includes(value)) {
                    throw new Error(`El valor debe ser un modo de escaneo válido: ${validModes.join(", ")}`);
                }
            }
            return true;
        })
]

export const validateUpdateConfigParams = [
    params("id")
        .exists()
        .withMessage(MSG.REQUIRED.es("El id"))
        .bail()
        .isUUID()
        .withMessage(MSG.UUID.es("El id")),
    body("key")
        .optional()
        .isIn(Object.values(CONFIG_TYPE))
        .withMessage(MSG.STRING.es("La clave"))
        .bail(),
    body("value")
        .optional()
        .isString()
        .withMessage(MSG.STRING.es("El valor"))
        .bail()
        .trim()
        .custom((value, { req }) => {
            if (req.body.key === CONFIG_TYPE.SCANNING_MODE) {
                const validModes = Object.values(SCANNING_MODE_CONFIG);
                if (!validModes.includes(value)) {
                    throw new Error(`El valor debe ser un modo de escaneo válido: ${validModes.join(", ")}`);
                }
            }
            return true;
        })
]

export const validateIdConfigParams = [
    params("id")
        .exists()
        .withMessage(MSG.REQUIRED.es("El id"))
        .isUUID()
        .withMessage(MSG.UUID.es("El id"))
]