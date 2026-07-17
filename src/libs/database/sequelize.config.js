import { Sequelize } from "sequelize";
import { config } from "../../config/config.js";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.dbPort,
    dialect: config.dialect,
    dialectOptions: {
      //Habilitar SSL cuando la base de datos requiera conexión segura
      //Desactivar o eliminar esta configuración en entornos locales sin SSL.
      ssl: {
        require: config.dbSslRequire,
        rejectUnauthorized: config.dbSslUnauthorized,
      },
    },
    logging: false, // Disable logging; default: console.log
  },
);

export default sequelize;
