import { config } from "../../config/config.js";
import bcrypt from "bcryptjs";

export const encryptPassword = (password) => {
    return bcrypt.hash(password, config.encryptSalt)
}

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}