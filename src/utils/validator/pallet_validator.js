import { body, param } from "express-validator";
import { VALIDATION_MESSAGES as MSG } from "../const/messages.js";
import { PALLETS_STATUS } from "../const/status.js";

const palletStatuses = Object.values(PALLETS_STATUS);

export const validateCreatePallet = [
  body("code")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El código"))
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código")),

  body("qrCode")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El qrCode"))
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El qrCode", 3, 100))
    .matches(/^[a-zA-Z0-9\-+*()#&.,:]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El qrCode")),

  body("quantityBox")
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("La cantidad de cajas"))
    .isInt({ min: 1 })
    .withMessage(MSG.MIN.es("La cantidad de cajas", 1)),

  body("quantityUnitsInBox")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage(MSG.MIN.es("La cantidad de unidades en caja", 1)),

  body("status")
    .optional()
    .trim()
    .escape()
    .isIn(palletStatuses)
    .withMessage(MSG.STATUS.es("El estado")),

  body("warehouse_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El warehouse_id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El warehouse_id")),

  body("product_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El product_id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El product_id")),
];

export const validateUpdatePallet = [
  body("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),

  body("code")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código")),

  body("qrCode")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El qrCode", 3, 100))
    .matches(/^[a-zA-Z0-9\-+*()#&.,:]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El qrCode")),

  body("quantityBox")
    .optional()
    .isInt({ min: 1 })
    .withMessage(MSG.MIN.es("La cantidad de cajas", 1)),

  body("quantityUnitsInBox")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage(MSG.MIN.es("La cantidad de unidades en caja", 1)),

  body("status")
    .optional()
    .trim()
    .escape()
    .isIn(palletStatuses)
    .withMessage(MSG.STATUS.es("El estado")),

  body("warehouse_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El warehouse_id")),

  body("product_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El product_id")),
];

export const validateDeletePallet = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),
];

export const validateGetPalletById = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El id"))
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El id")),
];

export const validateGetPalletByCode = [
  param("code")
    .trim()
    .escape()
    .notEmpty()
    .withMessage(MSG.REQUIRED.es("El código"))
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30))
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(MSG.INVALID_FORMAT.es("El código")),
];

export const validateSearchPallets = [
  body("code")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 30 })
    .withMessage(MSG.LENGTH.es("El código", 3, 30)),
  body("qrCode")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage(MSG.LENGTH.es("El qrCode", 3, 100)),
  body("status")
    .optional()
    .trim()
    .escape()
    .isIn(palletStatuses)
    .withMessage(MSG.STATUS.es("El estado")),
  body("warehouse_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El warehouse_id")),
  body("product_id")
    .optional()
    .trim()
    .escape()
    .isUUID()
    .withMessage(MSG.INVALID_FORMAT.es("El product_id")),
];
