import db from "../../models/index.js";

export const startTransaction = async () => {
  const transaction = await db.sequelize.transaction();
  return transaction;
};
