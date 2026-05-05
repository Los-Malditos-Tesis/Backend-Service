import { AppError } from "../errors/app_error";
import { consoleKeys } from "../libs/logger/console/constant";
import { Log } from "../libs/logger/logger";
import { CODES } from "../utils/const/codes";
import { serviceHandler } from "../utils/handler/service_handler";
import { findByCode, findById, findByQrCode, update } from "../repositories/box_repository.js"

const boxService = "box service";

export const findByIdBox = serviceHandler(
    boxService,
    CODES.BOX.NOT_FOUND,
    async (id = "", ctx) => {
        Log.infoCtx(
            ctx,
            boxService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            id
        );
        const box = await findById(id, ctx);
        if (!box)
            throw new AppError("No se encontro ningun pallet con el id: " + id, 404, CODES.BOX.NOT_FOUND);

        Log.infoCtx(
            ctx,
            boxService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            box
        );
        return box;
    }
);

export const updateBox = serviceHandler(
    boxService,
    CODES.BOX.NOT_FOUND,
    async (data = {}, ctx) => {
        Log.infoCtx(
            ctx,
            boxService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            data
        );

        const box = await findByIdBox(data.id, ctx);

        const updated = await update(data.id, data, ctx);

        Log.infoCtx(
            ctx,
            boxService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            updated
        );
        return updated;
    }
);

export const createBox = serviceHandler(
    boxService,
    CODES.BOX.NOT_FOUND,
    async (data = {}, ctx) => {
        Log.infoCtx(
            ctx,
            boxService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            data
        );

        const box = await findById(data.id, ctx)
        if (box)
            throw new AppError("Ya existe un pallet con el id: " + data.id, 400, CODES.BOX.ALREADY_EXISTS);

        const response = await save(data, ctx);

        Log.infoCtx(
            ctx,
            boxService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            response
        )
    }
);

export const findBoxByCode = serviceHandler(
    boxService,
    CODES.BOX.NOT_FOUND,
    async (code = "", ctx) => {
        Log.infoCtx(
            ctx,
            boxService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            code
        );
        const box = await findByCode(code, ctx);

        if (!box)
            throw new AppError("No se encontro ningun pallet con el codigo: " + code, 404, CODES.BOX.NOT_FOUND);

        Log.infoCtx(
            ctx,
            boxService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            box
        );
        return box;
    }
);