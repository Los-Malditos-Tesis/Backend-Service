import { body, param } from "express-validator";

export const validateRegister = [
    body("name")
        .trim()
        .escape()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 and 30 characters")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("Name can only contain letters, numbers, dots, underscores, and hyphens"),

    body("email")
        .trim()
        .escape()
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),
    
    body("password")
        .notEmpty()
        .isLength({ min: 8 }).withMessage("Min 8 characters")
        .matches(/[A-Z]/).withMessage("Must contain uppercase")
        .matches(/[a-z]/).withMessage("Must contain lowercase")
        .matches(/[0-9]/).withMessage("Must contain number")
];

export const validateLogin = [
    body("email")
        .trim()
        .escape()
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),
    
    body("password")
        .notEmpty()
];