import { als } from "../libs/logger/console/context.js";
import {
  ENTITY_ACTIONS,
  ENTITY_NAME,
  PALLETS_STATUS,
} from "../utils/const/status.js";
import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const auditRepository = "audit repository: ";

export const registerAuditHooks = (sequelize, dbInstance) => {
  const Audit = dbInstance.Audit;

  const createAudit = async (instance, action) => {
    try {
      await Audit.create({
        actions: action,
        table: instance.constructor.tableName || instance.constructor.name,
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

export const save = repositoryHandler(
  auditRepository,
  async (audit = {}, ctx) => {
    return await db.Audit.create(audit);
  },
);

export const findAll = repositoryHandler(auditRepository, async (ctx) => {
  return await db.Audit.findAll({
    include: [{ model: db.User, as: "User" }],
  });
});

export const findById = repositoryHandler(
  auditRepository,
  async (id = "", ctx) => {
    return await db.Audit.findByPk(id, {
      include: [{ model: db.User, as: "User" }],
    });
  },
);

export const deleteById = repositoryHandler(
  auditRepository,
  async (id = "", ctx) => {
    return await db.Audit.destroy({
      where: {
        id: id,
      },
    });
  },
);

export const update = repositoryHandler(
  auditRepository,
  async (id = "", data = {}, ctx) => {
    const updated = await db.Audit.update(data, {
      where: {
        id: id,
      },
    });
    return updated;
  },
);

export const search = repositoryHandler(
  auditRepository,
  async (query = {}, limit = 10, page = 1, ctx) => {
    const offset = (page - 1) * limit;
    const { actions, table, user_id } = query;
    const whereClause = {};

    if (actions) whereClause.actions = actions;
    if (table) whereClause.table = { [db.Sequelize.Op.iLike]: `%${table}%` };
    if (user_id) whereClause.user_id = user_id;

    const { rows, count } = await db.Audit.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [{ model: db.User, as: "User" }],
    });

    return {
      items: rows,
      total: count,
    };
  },
);
