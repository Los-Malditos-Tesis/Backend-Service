import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Store = sequelize.define(
    "Store",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        comment: "Identificador único universal de la tienda",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Nombre comercial de la sucursal",
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Zone already in locations!",
        },
        comment: "Código interno único de la tienda",
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Dirección física donde se entregará la mercancía",
      },
    },
    {
      tableName: "stores",
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
  );

  return Store;
};
