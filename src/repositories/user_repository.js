import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { obfuscatePass } from "../utils/obfuscate/obfucates.js";
import { Op } from "sequelize";

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
  obfuscatePass,
);

export const search = repositoryHandler(
  authRepository,
  async ({ id, name, email } = {}, ctx) => {
    const where = {
      active: true,
    };

    if (id) {
      where.id = {
        [Op.eq]: id,
      };
    }

    if (name) {
      where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (email) {
      where.email = {
        [Op.iLike]: `%${email}%`,
      };
    }

    return await db.User.findAll({
      where,
    });
  },
);

export const updateProfile = repositoryHandler(
  authRepository,
  async (user, name, email, ctx) => {
    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email;
    }

    await user.save();

    return user;
  },
);

export const updateStatus = repositoryHandler(
  authRepository,
  async (user, status, ctx) => {
    user.active = status;

    await user.save();

    return user;
  },
);
