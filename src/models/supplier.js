import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 100],
          is: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/,
        },
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Code already in supplier!",
        },
        validate: {
          notEmpty: true,
          len: [3, 30],
          is: /^[a-zA-Z0-9._-]+$/,
        },
      },
      contactName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 80],
          is: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          is: /^[0-9+() \-]+$/,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 80],
          is: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ._-]+$/,
        },
      },
    },
    {
      tableName: "suppliers",
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
  );

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Product, { foreignKey: "supplier_id" });
  };

  return Supplier;
};
