import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const configParamsRepository = "config params repository: ";

export const save = repositoryHandler(
    configParamsRepository,
    async(configParams = {}, ctx) =>{
        return await db.ConfigParams.create(configParams);
    }
);

export const findAll = repositoryHandler(
    configParamsRepository,
    async(ctx) =>{
        return await db.ConfigParams.findAll();
    }
);

export const findById = repositoryHandler(
    configParamsRepository,
    async(id = "", ctx) =>{
        return await db.ConfigParams.findByPk(id);
    }
);

export const findByKey = repositoryHandler(
    configParamsRepository,
    async(key = "", ctx) =>{
        return await db.ConfigParams.findOne({
            where: {
                key: key
            }
        });
    }
);

export const update = repositoryHandler(
    configParamsRepository,
    async(id = "", data = {}, ctx) =>{
        return await db.ConfigParams.update(data, {
            where: {
                id: id
            }
        });
    }
);

export const deleteById = repositoryHandler(
    configParamsRepository,
    async(id = "", ctx) =>{
        return await db.ConfigParams.destroy({
            where: {
                id: id
            }
        });
    }
);