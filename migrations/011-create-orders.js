"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("orders", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    unit_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    total_quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    total_delivered: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    total_dispatched: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "PENDING",
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
    origin_warehouse_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "warehouses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    destination_warehouse_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "warehouses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    store_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "stores",
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
  await queryInterface.dropTable("orders");
}
