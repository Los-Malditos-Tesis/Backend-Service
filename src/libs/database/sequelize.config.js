import { Sequelize } from "sequelize";
import  {config}  from "../../config/config.js";

const sequelize = new Sequelize(config.database, config.username, config.password,{
    host: config.host,
    port: config.dbPort,
    dialect: config.dialect,
    logging: false, // Disable logging; default: console.log
})

export default sequelize;