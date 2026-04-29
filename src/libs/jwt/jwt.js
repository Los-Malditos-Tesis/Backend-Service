import jwt from 'jsonwebtoken'
import { config } from "../../config/config.js";
import { Log } from '../logger/logger.js';
import { consoleKeys } from '../logger/console/constant.js';

export const generateUserToken = (user) => {
    return signToken(
        {
            sub: user.id,
            type: "user",
            role: user.role,
            email: user.email
        },
        {
            secret: config.jwtSecretKey,
            expiresIn: config.jwtExpiration
        }
    );
};

export const generateCameraToken = (camera) => {
    return signToken(
        {
            sub: camera.id,
            type: "camera",
            location_id: camera.location_id
        },
        {
            secret: config.jwtSecretKeyCam,
            expiresIn: config.jwtExpirationCam
        }
    );
};

export const verifyUserToken = (token) => {
    return verify(token, config.jwtSecretKey);
};

export const verifyCameraToken = (token) => {
    return verify(token, config.jwtSecretKeyCam);
};

const signToken = (payload, options) => {
    return jwt.sign(payload, options.secret, {
        algorithm: config.jwtAlgorithm,
        expiresIn: options.expiresIn,
        issuer: config.jwtIssuer,
        audience: config.jwtAudience
    });
};

const verify = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret, {
            algorithms: [config.jwtAlgorithm],
            issuer: config.jwtIssuer,
            audience: config.jwtAudience
        });

        return {
            valid: true,
            expired: false,
            payload: decoded
        };
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            return {
                valid: false,
                expired: true,
                message: "Token expirado"
            };
        }

        return {
            valid: false,
            expired: false,
            message: "Token inválido"
        };
    }
};