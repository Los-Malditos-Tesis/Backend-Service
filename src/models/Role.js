import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[A-Z]+$/,
          len: [3, 5],
        },
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 30],
          is: /^[a-zA-Z]+$/,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/,
        },
      },
    },
    {
      tableName: "roles",
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
  );

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: "user_role",
      foreignKey: "role_id",
      otherKey: "user_id",
    });
  };

  return Role;
};
