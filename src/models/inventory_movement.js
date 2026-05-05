import { DataTypes } from "sequelize";
import { ITEM_TYPES, PALLETS_STATUS } from "../utils/const/status.js";

export default (sequelize) => {
  const InventoryMovement = sequelize.define(
    "InventoryMovement",
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
          isIn: {
            args: [Object.values(ITEM_TYPES)],
            msg: "Invalid item type",
          },
        },
        comment: "Type of item being moved (BOX or PALLET)",
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [Object.values(PALLETS_STATUS)],
            msg: "Invalid item type",
          },
        },
        comment: "Type of item state",
      },
    },
    {
      tableName: "inventory_movement",
      underscored: true,
      timestamp: true,
      paranoid: true,
    },
  );

  InventoryMovement.associate = (models) => {
    InventoryMovement.belongsTo(models.Box, { foreignKey: "box_id" });
    InventoryMovement.belongsTo(models.Pallet, { foreignKey: "pallet_id" });
  };

  return InventoryMovement;
};
