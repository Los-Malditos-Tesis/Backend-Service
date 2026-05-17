import { DataTypes } from "sequelize";
import { ENTITY_ACTIONS } from "../utils/const/status.js";

export default (sequelize) => {
  const Audit = sequelize.define(
    "Audit",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      actions: {
        type: DataTypes.ENUM(...Object.values(ENTITY_ACTIONS)),
        allowNull: false,
        defaultValue: ENTITY_ACTIONS.CREATE,
        validate: {
          isIn: [Object.values(ENTITY_ACTIONS)],
        },
      },
      table: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      newValue: {
        type: DataTypes.JSONB,
        validate: {
          notEmpty: true,
        },
      },
      oldValue: {
        type: DataTypes.JSONB,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: "audits",
      underscored: true,
      timestamp: true,
      paranoid: true,
    },
  );

  Audit.associate = (models) => {
    Audit.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Audit;
};
