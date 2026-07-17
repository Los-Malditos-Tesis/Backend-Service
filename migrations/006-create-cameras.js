// migrations/XXXXXXXXXXXXXX-create-cameras.js

"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("cameras", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
      primaryKey: true,
      allowNull: false,
    },

    code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    api_key: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
  await queryInterface.dropTable("cameras");
}
