import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Warehouse = sequelize.define("Warehouse", {
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
    }, {
        tableName: "warehouses",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    return Warehouse;
}