import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Location = sequelize.define("Location", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        zone: {
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
        warehouse: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        tableName: "locations",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    return Location;
}