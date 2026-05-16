import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const configParamsRepository = "config params repository: ";

export const save = repositoryHandler(
  configParamsRepository,
  async (configParams = {}, transaction = {}, ctx) => {
    return await db.ConfigParams.create(configParams, { transaction });
  },
);

export const findAll = repositoryHandler(
  configParamsRepository,
  async (transaction = {}, ctx) => {
    return await db.ConfigParams.findAll({ transaction });
  },
);

export const findById = repositoryHandler(
  configParamsRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.ConfigParams.findByPk(id, { transaction });
  },
);

export const findByKeyAndWarehouse = repositoryHandler(
  configParamsRepository,
  async (key = "", warehouse_id = "", transaction = {}, ctx) => {
    return await db.ConfigParams.findOne({
      where: {
        key: key,
        warehouse_id: warehouse_id,
      },
      transaction,
    });
  },
);

export const update = repositoryHandler(
  configParamsRepository,
  async (id = "", data = {}, transaction = {}, ctx) => {
    return await db.ConfigParams.update(data, {
      where: {
        id: id,
      },
      transaction,
    });
  },
);

export const deleteById = repositoryHandler(
  configParamsRepository,
  async (id = "", transaction = {}, ctx) => {
    return await db.ConfigParams.destroy({
      where: {
        id: id,
      },
      transaction,
    });
  },
);
