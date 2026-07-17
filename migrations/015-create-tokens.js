"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("tokens", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    is_valid: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "users",
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
  await queryInterface.dropTable("tokens");
}
