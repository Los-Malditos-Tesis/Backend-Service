import { DataTypes } from "sequelize";
import {
  ORDER_TYPES,
  ORDER_UNIT_TYPES,
  ORDER_STATUS,
} from "../utils/const/status.js";

export default (sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isIn: [Object.values(ORDER_TYPES)] },
      },
      unit_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isIn: [Object.values(ORDER_UNIT_TYPES)] },
      },
      total_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
      total_delivered: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: {
        type: DataTypes.STRING,
        defaultValue: ORDER_STATUS.PENDING,
        validate: { isIn: [Object.values(ORDER_STATUS)] },
      },
    },
    {
      tableName: "orders",
      underscored: true,
      timestamps: true,
      paranoid: true,
      // IMPORTANTE: Quitamos el include del defaultScope de aquí 
      // porque sequelize.models aún está vacío.
    }
  );

  Order.associate = (models) => {
    // Definimos las asociaciones primero
    Order.belongsTo(models.Product, { foreignKey: "product_id" });
    Order.belongsTo(models.Warehouse, { as: "Origin", foreignKey: "origin_warehouse_id" });
    Order.belongsTo(models.Warehouse, { as: "DestinationWarehouse", foreignKey: "destination_warehouse_id" });
    Order.belongsTo(models.Store, { as: "DestinationStore", foreignKey: "store_id" });

    Order.belongsToMany(models.Box, {
      through: "order_boxes",
      foreignKey: "order_id",
      otherKey: "box_id",
      as: "boxes",
    });

    Order.belongsToMany(models.Pallet, {
      through: "order_pallets", // Tabla específica para pallets
      foreignKey: "order_id",
      otherKey: "pallet_id",
      as: "pallets",
    });

    Order.hasMany(models.InventoryMovement, { foreignKey: "order_id", as: "movements" });

    // --- AQUÍ DEFINIMOS LOS SCOPES QUE USAN OTROS MODELOS ---
    // Esto se ejecuta DESPUÉS de que todos los modelos existen
    Order.addScope("defaultScope", {
      include: [
        { model: models.Warehouse, as: "Origin", attributes: ["id", "name"] },
        { model: models.Warehouse, as: "DestinationWarehouse", attributes: ["id", "name"] },
        { model: models.Store, as: "DestinationStore", attributes: ["id", "name"] },
      ],
    });

    Order.addScope("withBoxes", {
      include: [{ model: models.Box, as: "boxes", through: { attributes: [] } }],
    });

    Order.addScope("withPallets", {
      include: [{ model: models.Pallet, as: "pallets", through: { attributes: [] } }],
    });
  };

  return Order;
};