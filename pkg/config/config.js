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
    appTimeZone: env.APP_TIMEZONE
})