import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Location = sequelize.define(
    "Location",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      zone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Zone already in locations!",
        },
        validate: {
          notEmpty: true,
          len: [3, 30],
          is: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/,
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 30],
          is: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/,
        },
      },
    },
    {
      tableName: "locations",
      underscored: true,
      timestamp: true,
      paranoid: true,
    },
  );

  Location.associate = (models) => {
    Location.hasMany(models.Pallet, { foreignKey: "location_id" });
    Location.hasMany(models.Camera, { foreignKey: "location_id" });
    Location.belongsTo(models.Warehouse, { foreignKey: "warehouse_id" });
  };

  return Location;
};
