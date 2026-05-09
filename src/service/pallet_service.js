import { consoleKeys } from "../libs/logger/console/constant.js";
import { Log } from "../libs/logger/logger.js";
import {
  update,
  findById,
  save,
  findByCode,
} from "../repositories/pallet_repository.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";

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

    const pallet = await findByIdPallet(data.id, ctx);

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
