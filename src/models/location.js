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
    }, {
        tableName: "locations",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    Location.associate = (models) => {
        Location.hasMany(models.Pallet, { foreignKey: "location_id" });
        Location.hasMany(models.Camera, { foreignKey: "location_id" });
        Location.belongsTo(models.Warehouse, { foreignKey: "warehouse_id" });
    }

    return Location;
}