import "dotenv/config";

const require = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};

const optional = (name, defaultValue) => {
  return process.env[name] ?? defaultValue;
};

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
  APP_TIMEZONE: require("APP_TIMEZONE"),
  JWT_SECRET_KEY: require("JWT_SECRET_KEY"),
  JWT_EXPIRATION: require("JWT_EXPIRATION"),
  JWT_ALGORITHM: require("JWT_ALGORITHM"),
  JWT_ISSUER: require("JWT_ISSUER"),
  JWT_AUDIENCE: require("JWT_AUDIENCE"),
  ENCRYP_SALT: require("ENCRYP_SALT"),
  DUMMY_HASH: require("DUMMY_HASH"),
  DEFAULT_ROLE: require("DEFAULT_ROLE"),
  BASE_PATH: require("BASE_PATH"),
  JWT_SECRET_KEY_CAM: require("JWT_SECRET_KEY_CAM"),
  JWT_EXPIRATION_CAM: require("JWT_EXPIRATION_CAM"),
  SQ_SYNC_ALTER: require("SQ_SYNC_ALTER"),
  SQ_SYNC_FORCE: require("SQ_SYNC_FORCE"),
  DB_SSL_REQUIRE: require("DB_SSL_REQUIRE"),
  DB_SSL_UNAUTHIRIZED: require("DB_SSL_UNAUTHIRIZED"),
  MQTT_URL: require("MQTT_URL"),
  MQTT_USERNAME: require("MQTT_USERNAME"),
  MQTT_PASSWORD: require("MQTT_PASSWORD"),
  MQTT_CLIENT_ID: require("MQTT_CLIENT_ID"),
  AUTO_CREATE_SCAN_CONFIG: require("AUTO_CREATE_SCAN_CONFIG"),
};
