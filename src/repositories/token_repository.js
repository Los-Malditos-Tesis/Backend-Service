import db from "../models/index.js";
import { repositoryHandler } from "../utils/handler/repository_handler.js";
import { obfuscateToken } from "../utils/obfuscate/obfucates.js";

const tokenRepository = "token repository: ";

export const save = repositoryHandler(
  tokenRepository + "save ",
  async (token = {}, transaction = {}, ctx) => {
    return await db.Token.create(token, { transaction });
  },
  obfuscateToken,
);

export const updateToken = repositoryHandler(
  tokenRepository + "updateToken ",
  async (token = {}, transaction = {}, ctx) => {
    return await db.Token.update(token, {
      where: {
        id: token.id,
      },
      transaction,
    });
  },
  obfuscateToken,
);

export const findAllByUserId = repositoryHandler(
  tokenRepository + "findAllByUserId ",
  async (userId = "", transaction = {}, ctx) => {
    return await db.Token.findAll({
      where: {
        userId: userId,
      },
      transaction,
    });
  },
);

export const findByContent = repositoryHandler(
  tokenRepository + "findByContent ",
  async (content = {}, transaction = {}, ctx) => {
    return await db.Token.findOne({
      where: {
        content: content.content,
      },
      transaction,
    });
  },
  obfuscateToken,
);

export const deleteToken = repositoryHandler(
  tokenRepository + "deleteToken ",
  async (token = {}, transaction = {}, ctx) => {
    return await db.Token.destroy({
      where: {
        id: token.id,
      },
      transaction,
    });
  },
);
