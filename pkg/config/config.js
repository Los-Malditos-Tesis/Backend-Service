import { env } from "./env.js";

export const config = Object.freeze({
    env: env.NODE_ENV,
    port: env.PORT,
})