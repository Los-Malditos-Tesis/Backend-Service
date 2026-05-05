import { consoleKeys } from "../libs/logger/console/constant";
import { Log } from "../libs/logger/logger";
import { update } from "../repositories/pallet_repository";
import { CODES } from "../utils/const/codes";
import { serviceHandler } from "../utils/handler/service_handler";

const palletService = "pallet service";

export const findByIdPallet = serviceHandler(
    palletService,
    CODES.PALLET.NOT_FOUND,
    async (id = "", ctx) => {
        Log.infoCtx(
            ctx,
            palletService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            id
        );

        const pallet = await findById(id, ctx);
        if (!pallet)
            throw new AppError("No se encontro ningun pallet con el id: " + id, 404, CODES.PALLET.NOT_FOUND);

        Log.infoCtx(
            ctx,
            palletService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            pallet
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
            data
        );

        const pallet = await findByIdPallet(data.id, ctx);

        const updated = await update(data.id, data, ctx);

        Log.infoCtx(
            ctx,
            palletService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            updated
        );
        return updated;
    },
);