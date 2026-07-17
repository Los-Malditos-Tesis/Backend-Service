
"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("config_params", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
      primaryKey: true,
      allowNull: false,
    },

    key: {
      type: Sequelize.ENUM(
        "SCM"
      ),
      allowNull: false,
    },

    value: {
      type: Sequelize.STRING,
      allowNull: false,
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
  await queryInterface.dropTable("config_params");

  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_config_params_key";'
  );
}
