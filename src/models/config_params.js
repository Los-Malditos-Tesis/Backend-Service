import { DataTypes } from "sequelize";
import { CONFIG_TYPE } from "../utils/const/status.js";

export default (sequelize) => {
    const ConfigParams = sequelize.define("ConfigParams", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        key: {
            type: DataTypes.ENUM(...Object.values(CONFIG_TYPE)),
            allowNull: false,
            validate: {
                isIn: [Object.values(CONFIG_TYPE)]
            }
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
                is: /^[a-zA-Z0-9._-]+$/
            }
        }
    }, {
        tableName: "config_params",
        underscored: true,
        timestamp: true,
        paranoid: true
    });

    ConfigParams.associate = (models) => {
        ConfigParams.belongsTo(models.Warehouse, { foreignKey: "warehouse_id" });
    }
    
    return ConfigParams;
}