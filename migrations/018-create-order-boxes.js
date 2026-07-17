export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("order_boxes", {
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

    box_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "boxes",
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

  await queryInterface.addConstraint("order_boxes", {
    fields: ["order_id", "box_id"],
    type: "primary key",
    name: "order_boxes_pk",
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("order_boxes");
}
