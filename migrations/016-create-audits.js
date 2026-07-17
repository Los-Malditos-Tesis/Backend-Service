
'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("audits", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
      primaryKey: true,
      allowNull: false,
    },

    actions: {
      type: Sequelize.ENUM(
        "DEL",
        "CRE",
        "UPD"
      ),
      allowNull: false,
      defaultValue: "CRE",
    },

    table: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    new_value: {
      type: Sequelize.JSONB,
      allowNull: true,
    },

    old_value: {
      type: Sequelize.JSONB,
      allowNull: true,
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
      allowNull:false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    deleted_at: {
      type: Sequelize.DATE,
      allowNull:true,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("audits");

  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_audits_actions";'
  );
}
