import "dotenv/config"

const require=(name)=>{
    const value = process.env[name]
    if (!value){
        throw new Error(`Missing environment variable: ${name}`)
    }

    return value
}

const optional=(name, defaultValue)=>{
    return process.env[name] ?? defaultValue
}

export const env = {
    NODE_ENV: optional("NODE_ENV", "development"),
    PORT: require("PORT"),
    DB_DATABASE: require("DB_DATABASE"),
    DB_USERNAME: require("DB_USERNAME"),
    DB_PASSWORD: require("DB_PASSWORD"),
    DB_HOST: require("DB_HOST"),
    DB_DIALECT: require("DB_DIALECT"),
    DB_PORT: require("DB_PORT"),
    APP_LOCALE: require("APP_LOCALE"),
    APP_TIMEZONE: require("APP_TIMEZONE")
}