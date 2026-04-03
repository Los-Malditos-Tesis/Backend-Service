import { env } from "./env.js";

export const config = Object.freeze({
    env: env.NODE_ENV,
    port: env.PORT,
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    dbPort: env.DB_PORT,
    appLocal: env.APP_LOCALE,
    appTimeZone: env.APP_TIMEZONE,
    jwtSecretKey: env.JWT_SECRET_KEY,
    jwtExpiration: env.JWT_EXPIRATION,
    jwtAlgorithm: env.JWT_ALGORITHM,
    jwtAudience: env.JWT_AUDIENCE,
    jwtIssuer: env.JWT_ISSUER,
    encryptSalt: Number(env.ENCRYP_SALT),
    dummyHash: env.DUMMY_HASH,
    defaultRole: env.DEFAULT_ROLE
})