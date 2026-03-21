import db from '../models/index.js';
import { Log } from '../../pkg/logger/logger.js';
import { consoleKeys } from '../../pkg/logger/console/constant.js';

const syncSequelizeKey = "syncSequelize";

const syncDatabase = async () => {
    try{
        await db.sequelize.authenticate();
        Log.info( "Database connection has been established successfully");
        await db.sequelize.sync({
            alter: true, // Esto actualizará las tablas para que coincidan con los modelos
            force: false, // No eliminará las tablas existentes
        });
        Log.info("Database synchronized successfully");
    }catch(error){
        Log.error("Error syncing database", consoleKeys.ErrorKey, error);
        throw error;
    }
}

export default syncDatabase;