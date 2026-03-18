import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Supplier = sequelize.define("Supplier", {
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
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Code already in supplier!'
            },
            validate: {
                notEmpty: true,
                len: [3, 30],
                is: /^[a-zA-Z0-9._-]+$/
            }
        }
    }, {
        tableName: "suppliers",
        underscored: true,
        timestamps: true,
        paranoid: true
    })

    return Supplier;
}