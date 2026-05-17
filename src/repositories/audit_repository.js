import { als } from "../libs/logger/console/context.js";
import {
  ENTITY_ACTIONS,
  ENTITY_NAME,
  PALLETS_STATUS,
} from "../utils/const/status.js";

export const registerAuditHooks = (sequelize, db) => {
  const Audit = db.Audit;

  const createAudit = async (instance, action) => {
    try {
      console.log("Aca va la data: ", instance.toJSON());
      await Audit.create({
        actions: action,
        table: instance.constructor.tableName,
        oldValue: sanitizeValue(instance._previousDataValues ?? {}),
        newValue: sanitizeValue(instance.toJSON()),
        user_id: als.getStore()?.get("userId") ?? null,
      });
    } catch (e) {
      console.error("Audit error:", e);
    }
  };

  sequelize.addHook("afterCreate", async (instance) => {
    if (instance.constructor.name === "Audit") return;
    await createAudit(instance, ENTITY_ACTIONS.CREATE);
  });

  sequelize.addHook("afterUpdate", async (instance) => {
    if (instance.constructor.name === "Audit") return;
    await createAudit(instance, ENTITY_ACTIONS.UPDATE);
  });

  sequelize.addHook("afterDestroy", async (instance) => {
    if (instance.constructor.name === "Audit") return;
    await createAudit(instance, ENTITY_ACTIONS.DELETE);
  });
};

const sanitizeValue = (value) => {
  const copy = { ...value };
  delete copy.password;
  delete copy.api_key;
  return copy;
};
