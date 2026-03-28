import { DataTypes } from "sequelize";
import { PALLETS_STATUS } from "../../pkg/utils/const/status.js";

export default (sequelize) => {
    const Box = sequelize.define("Box", {
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: 'El valor no puede ser menor a la unidad'
                }
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
        }
    }, {
        tableName: "boxes",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    Box.associate = (models) => {
        Box.hasMany(models.InventoryMovement, { foreignKey: "box_id" });
        Box.belongsTo(models.Product, { foreingKey: "product_id" });
        Box.belongsTo(models.Pallet, { foreignKey: "pallet_id" });
    }

    return Box;
}