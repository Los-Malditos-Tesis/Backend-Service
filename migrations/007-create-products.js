"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("products", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sku: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    supplier_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "suppliers",
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
  await queryInterface.dropTable("products");
}
