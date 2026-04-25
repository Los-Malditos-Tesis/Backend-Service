import { validationResult } from "express-validator";
import {Log} from "../libs/logger/logger.js";

export const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  Log.info("Validation errors: ");

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  }

  next();
};