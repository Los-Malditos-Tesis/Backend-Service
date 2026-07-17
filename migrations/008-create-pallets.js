"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("pallets", {
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
    qr_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity_box: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity_units_in_box: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM(
        "CRE",
        "STO",
        "PPD",
        "DEL",
        "CAN"
      ),
      allowNull: false,
      defaultValue: "CRE",
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
    location_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "locations",
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
  await queryInterface.dropTable("pallets");
}
