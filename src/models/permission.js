import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Permission = sequelize.define(
    "Permission",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "permissions",
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
  );

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: "role_permissions",
      foreignKey: "permission_id",
      otherKey: "role_id",
    });
  };

  return Permission;
};
