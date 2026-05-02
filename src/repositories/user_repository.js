import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { obfuscatePass, obfuscateRoles } from "../utils/obfuscate/obfucates.js";

const authRepository = "auth repository: ";

export const save = repositoryHandler(
  authRepository,
  async (data = {}, ctx) => {
    return await db.User.create(data);
  },
  obfuscatePass,
);

export const findByEmail = repositoryHandler(
  authRepository,
  async (email = "", ctx) => {
    return await db.User.findOne({
      where: {
        email: email,
      },
    });
  },
);

export const findById = repositoryHandler(
  authRepository,
  async (id = "", ctx) => {
    return await db.User.findByPk(id);
  },
  obfuscatePass,
);

export const findByEmailWithPassword = repositoryHandler(
  authRepository,
  async (email = "", ctx) => {
    return await db.User.scope("withPassword").findOne({
      where: {
        email: email,
      },
    });
  },
  obfuscatePass,
);

export const findByEmailWithRoles = repositoryHandler(
  authRepository,
  async (email = "", ctx) => {
    return await db.User.scope("withRoles", "cleanData").findOne({
      where: {
        email: email,
      },
    });
  },
  obfuscateRoles,
);
