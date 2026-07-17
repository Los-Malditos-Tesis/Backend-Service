
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("boxes", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
      primaryKey: true,
      allowNull: false,
    },

    qr_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    code: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    status: {
      type: Sequelize.ENUM(
        "CRE",
        "STO",
        "PPD",
        "CAN",
        "DEL"
      ),
      allowNull: false,
      defaultValue: "CRE",
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

    pallet_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "pallets",
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
  await queryInterface.dropTable("boxes");

  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_boxes_status";'
  );
}
