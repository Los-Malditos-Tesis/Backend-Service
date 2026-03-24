import { DataTypes } from "sequelize";
import { ENTITY_ACTIONS, ENTITY_NAME, PALLETS_STATUS } from "../../pkg/utils/const/status.js";

export default (sequelize) => {
    const Audit = sequelize.define("Audit", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        actions: {
            type: DataTypes.ENUM(...Object.values(ENTITY_ACTIONS)),
            allowNull: false,
            defaultValue: ENTITY_ACTIONS.CREATE,
            validate: {
                isIn: [Object.values[ENTITY_ACTIONS]]
            }
        },
        table: {
            type: DataTypes.ENUM(...Object.values(ENTITY_NAME)),
            allowNull: false,
            validate: {
                isIn: [Object.values[PALLETS_STATUS]]
            }
        },
        newValue: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        oldValue: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
    }, {
        tableName: "audits",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    Audit.associate = (models) => {
        Audit.belongsTo(models.User, { foreignKey: "user_id" })
    }

    return Audit;
}