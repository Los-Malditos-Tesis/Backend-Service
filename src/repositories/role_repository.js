import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const roleRepository = "role repository: ";

export const findByName = repositoryHandler(
  roleRepository,
  async (name = "", transaction = {}, ctx) => {
    return await db.Role.findOne({
      where: {
        name: name,
      },
      transaction,
    });
  },
);

export const findById = repositoryHandler(
  roleRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.Role.findByPk(id, { transaction });
  },
);

export const findAllByIds = repositoryHandler(
  roleRepository,
  async (ids = [], transaction = {}, ctx) => {
    return await db.Role.findAll({
      where: {
        id: ids,
      },
      transaction,
    });
  },
);
