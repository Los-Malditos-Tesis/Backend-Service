export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("user_role", {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    role_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
  });

  await queryInterface.addConstraint("user_role", {
    fields: ["user_id", "role_id"],
    type: "primary key",
    name: "user_role_pk",
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("user_role");
}
