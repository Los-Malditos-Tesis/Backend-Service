import { DataTypes } from "sequelize";
import { config } from "../config/config.js";
import { Log } from "../libs/logger/logger.js";
import { CONFIG_TYPE, SCANNING_MODE_CONFIG } from "../utils/const/status.js";

export default (sequelize) => {
    const Warehouse = sequelize.define("Warehouse", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 30],
                is: /^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 250],
                is: /^[a-zA-Z0-9._\s,\\\-#áéíóúÁÉÍÓÚñÑ]+$/
            }
        },
    }, {
        tableName: "warehouses",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    Warehouse.associate = (models) => {
        Warehouse.hasMany(models.Location, { foreignKey: "warehouse_id" })
        Warehouse.hasMany(models.User, { foreignKey: "warehouse_id" })
    }

    Warehouse.afterCreate(async (warehouse, options) => {
        if(config.autoCreateScanConfig){
            try {
                Log.info("Start creating auto scan config")
                await sequelize.models.ConfigParams.create({
                    key: CONFIG_TYPE.SCANNING_MODE,
                    value: SCANNING_MODE_CONFIG.ENTRY,
                    warehouse_id: warehouse.id
                }, { transaction: options.transaction})
                Log.info("Success assign auto scan config to new warehouse")
            }
            catch(e) {
                Log.error("Error creating auto scan config", e);
            }
            finally {
                Log.info("Finish creating auto scan config")
            }
        }
    });
    return Warehouse;
}