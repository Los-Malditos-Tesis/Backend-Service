import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Camera = sequelize.define("Camera", {
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
        locationId: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }, {
        tableName: "cameras",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    return Camera;
}