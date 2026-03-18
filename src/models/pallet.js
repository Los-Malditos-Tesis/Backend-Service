import { DataTypes } from "sequelize";
import { PALLETS_STATUS } from "../utils/status.js";

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
                min: 1,
                msg: 'El valor no puede ser menor a la unidad'
            }
        },
        status: {
            type: DataTypes.ENUM(...Object.values(PALLETS_STATUS)),
            allowNull: false,
            defaultValue: PALLETS_STATUS.CREATED,
            validate: {
                isIn: [Object.values[PALLETS_STATUS]]
            }
        },
        locationId: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }, {
        tableName: "pallets",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    return Pallet;
}