import db from '../../models/index.js';
import { Log } from '../logger/logger.js'
import { consoleKeys } from '../logger/console/constant.js';
import { config } from '../../config/config.js';

const syncSequelizeKey = "syncSequelize";

const syncDatabase = async () => {
    try {
        await db.sequelize.authenticate();
        Log.info("Database connection has been established successfully");

        const { sqSyncAlter, sqSyncForce } = config;

        await db.sequelize.sync({
            alter: sqSyncAlter,
            force: sqSyncForce,
        });

        if (sqSyncAlter) {
            Log.info("Database schema synchronized (ALTER applied)");
        }

    } catch (error) {
        Log.error("Error syncing database", error);
        throw error;
    }
}

export default syncDatabase;