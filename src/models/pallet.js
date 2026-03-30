import { DataTypes } from "sequelize";
import { PALLETS_STATUS } from "../utils/const/status.js";

export default (sequelize) => {
    const Pallet = sequelize.define("Pallet", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Code already in pallets!'
            },
            validate: {
                notEmpty: true,
                len: [3, 30],
                is: /^[a-zA-Z0-9._-]+$/
            }
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
        quantityBox: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: 'El valor no puede ser menor a la unidad'
                },
            }
        },
        status: {
            type: DataTypes.ENUM(...Object.values(PALLETS_STATUS)),
            allowNull: false,
            defaultValue: PALLETS_STATUS.CREATED,
            validate: {
                isIn: {
                    args: [Object.values(PALLETS_STATUS)],
                    msg: "El estado proporcionado no es válido"
                }
            }
        },
    }, {
        tableName: "pallets",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    Pallet.associate = (models) => {
        Pallet.hasMany(models.InventoryMovement, { foreignKey: "pallet_id" });
        Pallet.hasMany(models.Box, { foreignKey: "pallet_id" });
        Pallet.belongsTo(models.Location, { foreignKey: "location_id" });
    }

    return Pallet;
}