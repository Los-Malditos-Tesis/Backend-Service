import jwt from 'jsonwebtoken'
import { config } from "../../config/config.js";

export const generateToken = (payload = {}) => {
    const token = jwt.sign(payload, config.jwtSecretKey, {
        algorithm: config.jwtAlgorithm,
        expiresIn: config.jwtExpiration,
        issuer: config.jwtIssuer,
        audience: config.jwtAudience
    });

    return token;
}


export const verifyToken = (token = '') => {
    try {
        const decoded = jwt.verify(token, config.jwtSecretKey, {
            algorithms: [config.jwtAlgorithm],
            issuer: config.jwtIssuer,
            audience: config.jwtAudience
        })

        return {
            valid: true,
            expired: false,
            payload: decoded
        }
    } catch (e) {
        if (error.name === 'TokenExpiredError') {
            return {
                valid: false,
                expired: true,
                message: 'Token expirado'
            };
        }

        return {
            valid: false,
            expired: false,
            message: 'Token inválido'
        };
    }
}