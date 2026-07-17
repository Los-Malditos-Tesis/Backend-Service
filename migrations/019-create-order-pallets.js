export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("order_pallets", {
    order_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    pallet_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "pallets",
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

  await queryInterface.addConstraint("order_pallets", {
    fields: ["order_id", "pallet_id"],
    type: "primary key",
    name: "order_pallets_pk",
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("order_pallets");
}
