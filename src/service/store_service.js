import { AppError } from "../errors/app_error";
import { consoleKeys } from "../libs/logger/console/constant";
import { Log } from "../libs/logger/logger";
import { findAll, findByCode, remove, update } from "../repositories/store_repository";
import { CODES } from "../utils/const/codes";
import { serviceHandler } from "../utils/handler/service_handler";

const storeService = "store service: ";

export const findStoreByCode = serviceHandler(
    storeService,
    CODES.STORE.NOT_FOUND,
    async (code = "", ctx) => {
        Log.infoCtx(
            ctx,
            storeService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            code,
        );

        const store = await findByCode(code, ctx);
        if (!store)
            throw new AppError("La tienda no existe", 404, CODES.STORE.NOT_FOUND);

        Log.infoCtx(
            ctx,
            storeService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            store,
        );
        return store;
    },
);

export const createStore = serviceHandler(
    storeService,
    CODES.STORE.ALREADY_EXISTS,
    async (storeData = {}, ctx) => {
        Log.infoCtx(
            ctx,
            storeService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            storeData,
        );

        const existStore = await findByCode(storeData.code, ctx);
        if (existStore)
            throw new AppError("La tienda ya existe", 400, CODES.STORE.ALREADY_EXISTS);

        const resp = await create(storeData, ctx);
        Log.infoCtx(
            ctx,
            storeService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            resp,
        );
        return resp;
    },
);

export const updateStore = serviceHandler(
    storeService,
    CODES.STORE.NOT_FOUND,
    async (storeData = {}, ctx) => {
        Log.infoCtx(
            ctx,
            storeService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            storeData,
        );

        const existStore = await findStoreByCode(storeData.code, ctx);

        const resp = await update(ctx, existStore.id, storeData);
        Log.infoCtx(
            ctx,
            storeService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            resp,
        );
        return resp;
    },
);

export const searchStores = serviceHandler(
    storeService,
    CODES.STORE.NOT_FOUND,
    async (query = {}, ctx) => {
        Log.infoCtx(
            ctx,
            storeService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            query,
        );

        const stores = await findAll(ctx, query);
        Log.infoCtx(
            ctx,
            storeService + consoleKeys.SuccessKey,
            consoleKeys.ResponseKey,
            stores,
        );
        return stores;
    },
);

export const removeStore = serviceHandler(
    storeService,
    CODES.STORE.NOT_FOUND,
    async (id, ctx) => {
        Log.infoCtx(
            ctx,
            storeService + consoleKeys.StartKey,
            consoleKeys.RequestKey,
            { id },
        );

        const deleted = await remove(ctx, id);

        Log.infoCtx(
            ctx,
            storeService + consoleKeys.SuccessKey + "deleted",
            consoleKeys.ResponseKey,
            deleted,
        );
        return deleted;
    },
);