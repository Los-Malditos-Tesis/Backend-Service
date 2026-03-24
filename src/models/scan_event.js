import { DataTypes } from "sequelize";
import { ITEM_TYPES } from "../../pkg/utils/const/status.js";

export default (sequelize) => {
    const ScanEvent = sequelize.define("ScanEvent", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        qrCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        detectedType: {
            type: DataTypes.ENUM(...Object.values(ITEM_TYPES)),
            allowNull: false,
            validate: {
                isIn: [Object.values[ITEM_TYPES]]
            }
        },
        confidense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }, {
        tableName: "scan_events",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    ScanEvent.associate = (models) => {
        ScanEvent.belongsTo(models.Camera, { foreignKey: "camera_id" })
    }

    return ScanEvent;
}