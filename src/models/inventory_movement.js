import { DataTypes } from "sequelize";
import { ITEM_TYPES } from "../utils/const/status.js";

export default (sequelize) => {
    const InventoryMovement = sequelize.define("InventoryMovement", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        toLocation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 250],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        type: {
            type: DataTypes.ENUM(...Object.values(ITEM_TYPES)),
            allowNull: false,
            validate: {
                isIn: {
                    args: [Object.values(ITEM_TYPES)],
                    msg: "Invalid item type"
                }
            }
        },
    }, {
        tableName: "inventory_movement",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    InventoryMovement.associate = (models) => {
        InventoryMovement.belongsTo(models.Box, { foreignKey: "box_id" });
        InventoryMovement.belongsTo(models.Pallet, { foreignKey: "pallet_id" });
    }

    return InventoryMovement;
}