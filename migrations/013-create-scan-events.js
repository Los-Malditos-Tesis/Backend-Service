"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("scan_events", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    qr_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    detected_type: {
      type: Sequelize.ENUM(
        "BOX",
        "PAL"
      ),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(
        "OK",
        "WAR",
        "ERR"
      ),
      allowNull: false,
    },
    confidense: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: Sequelize.ENUM(
        "SLD",
        "ENT"
      ),
      allowNull: false,
    },
    error_message: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    item_code: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    camera_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "cameras",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    product_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "products",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    warehouse_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "warehouses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    order_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("scan_events");
}
