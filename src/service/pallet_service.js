import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import {
  update,
  findById,
  save,
  findByCode,
  deleteById,
  search,
} from "../repositories/pallet_repository.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { AppError } from "../errors/app_error.js";

const palletService = "pallet service";

export const findByIdPallet = serviceHandler(
  palletService,
  CODES.PALLET.NOT_FOUND,
  async (id = "", ctx) => {
    Log.infoCtx(
      ctx,
      palletService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      id,
    );

    const pallet = await findById(id, ctx);
    if (!pallet)
      throw new AppError(
        "No se encontro ningun pallet con el id: " + id,
        404,
        CODES.PALLET.NOT_FOUND,
      );

    Log.infoCtx(
      ctx,
      palletService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      pallet,
    );
    return pallet;
  },
);

export const findPalletByCode = serviceHandler(
  palletService,
  CODES.PALLET.NOT_FOUND,
  async (code = "", ctx) => {
    Log.infoCtx(
      ctx,
      palletService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      code,
    );
    const pallet = await findByCode(code, ctx);

    if (!pallet)
      throw new AppError(
        "No se encontro ningun pallet con el codigo: " + code,
        404,
        CODES.PALLET.NOT_FOUND,
      );

    Log.infoCtx(
      ctx,
      palletService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      pallet,
    );
    return pallet;
  },
);

export const updatePallet = serviceHandler(
  palletService,
  CODES.PALLET.NOT_FOUND,
  async (data = {}, ctx) => {
    Log.infoCtx(
      ctx,
      palletService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      data,
    );

    await findByIdPallet(data.id, ctx);

    const updated = await update(data.id, data, ctx);

    Log.infoCtx(
      ctx,
      palletService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      updated,
    );
    return updated;
  },
);

export const createPallet = serviceHandler(
  palletService,
  CODES.PALLET.NOT_FOUND,
  async (data = {}, ctx) => {
    Log.infoCtx(
      ctx,
      palletService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      data,
    );

    const pallet = await findByCode(data.code, ctx);
    if (pallet)
      throw new AppError("Ya existe un pallet con el codigo: " + data.code, 400, CODES.PALLET.ALREADY_EXISTS);

    const response = await save(data, ctx);

    Log.infoCtx(
      ctx,
      palletService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      response,
    );
    return response;
  },
);

export const searchPallets = serviceHandler(
  palletService,
  CODES.PALLET.NOT_FOUND,
  async (query = {}, limit = 10, page = 1, ctx) => {
    Log.infoCtx(
      ctx,
      palletService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      query,
    );
    const pallets = await search(query, limit, page, ctx);
    Log.infoCtx(
      ctx,
      palletService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      pallets,
    );
    return pallets;
  },
);

export const deletePallet = serviceHandler(
  palletService,
  CODES.PALLET.NOT_FOUND,
  async (id = "", ctx) => {
    Log.infoCtx(
      ctx,
      palletService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      id,
    );
    const pallet = await findById(id, ctx);
    if (!pallet)
      throw new AppError("No se encontro ningun pallet con el id: " + id, 404, CODES.PALLET.NOT_FOUND);

    const deleted = await deleteById(id, ctx);
    Log.infoCtx(
      ctx,
      palletService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      deleted,
    );
    return deleted;
  },
);

