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
        validate: {
          isIn: [Object.values(ORDER_TYPES)],
        },
        comment: "SALE para Tienda, TRANSFER para otra Bodega",
      },
      unit_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [Object.values(ORDER_UNIT_TYPES)],
        },
        comment: "Define si la orden procesa unidades Pallet o cajas sueltas",
      },
      total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_delivered: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [Object.values(ORDER_STATUS)],
        },
        defaultValue: ORDER_STATUS.PENDING,
      },
    },
    {
      tableName: "orders",
      underscored: true,
      timestamps: true,
      paranoid: true,
      defaultScope: {
        include: [
          {
            model: sequelize.models.Warehouse,
            as: "Origin",
            attributes: ["id", "name"],
          },
          {
            model: sequelize.models.Warehouse,
            as: "DestinationWarehouse",
            attributes: ["id", "name"],
          },
          {
            model: sequelize.models.Store,
            as: "DestinationStore",
            attributes: ["id", "name"],
          },
        ],
      },
      scopes: {
        withBoxes: {
          include: [
            {
              model: sequelize.models.Box,
              as: "boxes",
              through: {
                attributes: []
              }
            },
          ],
        },
        withPallets: {
          include: [
            {
              model: sequelize.models.Pallet,
              as: "pallets",
              through: {
                attributes: []
              }
            },
          ],
        },
      },
    },
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Product, {
      foreignKey: "product_id"
    });

    Order.belongsTo(models.Warehouse, {
      as: "Origin",
      foreignKey: "origin_warehouse_id",
    });

    Order.belongsTo(models.Warehouse, {
      as: "DestinationWarehouse",
      foreignKey: "destination_warehouse_id",
    });
    Order.belongsTo(models.Store, {
      as: "DestinationStore",
      foreignKey: "store_id",
    });

    Order.belongsToMany(models.Box, {
      through: "order_items",
      foreignKey: "order_id",
      otherKey: "box_id",
      as: "boxes",
    });

    Order.belongsToMany(models.Pallet, {
      through: "order_items",
      foreignKey: "order_id",
      otherKey: "pallet_id",
      as: "pallets",
    });

    Order.hasMany(models.InventoryMovement, {
      foreignKey: "order_id",
      as: "movements",
    });
  };

  return Order;
};
