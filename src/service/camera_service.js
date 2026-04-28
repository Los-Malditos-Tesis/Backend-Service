import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import { findAll, findByLocationId, save, findById, findByCode, updateCamera, deleteById } from "../repositories/camera_repository.js";
import { findLocationById } from "./location_service.js";
import { obfuscateApiKey } from "../utils/obfuscate/obfucates.js";
import { generateCameraToken } from "../libs/jwt/jwt.js";


const cameraService = "camera service: ";

export const registerCamera = serviceHandler(
    cameraService,
    CODES.CAMERA.NOT_FOUND,
    async (data = {}, ctx) => {
        Log.infoCtx(ctx, cameraService + consoleKeys.StartKey, consoleKeys.RequestKey, data)

        const existsCamera = await findByCode(data.code, ctx)

        if (existsCamera)
            throw new AppError('El codigo de camara esta en uso', 400, CODES.CAMERA.ALREADY_EXISTS);

        data.api_key = crypto.randomBytes(32).toString("hex");

        const location = await findByLocationId(data.location_id, ctx);
        Log.infoCtx(ctx, cameraService + consoleKeys.InformationKey, consoleKeys.InformationKey, obfuscateApiKey(data))
        const camera = await save(data, ctx)

        Log.infoCtx(ctx, cameraService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, obfuscateApiKey(data));
        return camera;
    }

)

export const findCameraById = serviceHandler(
    cameraService,
    CODES.CAMERA.NOT_FOUND,
    async (id = "", ctx) => {
        Log.infoCtx(ctx, cameraService + consoleKeys.StartKey, consoleKeys.RequestKey, id)

        const camera = await findById(id, ctx)
        if (!camera)
            throw new AppError('El id de camara es invalido', 400, CODES.CAMERA.NOT_FOUND);

        Log.infoCtx(ctx, cameraService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, camera)
        return camera;
    }
)


export const findAllCameras = serviceHandler(
    cameraService,
    CODES.CAMERA.NOT_FOUND,
    async (query = {}, ctx) => {
        Log.infoCtx(ctx, cameraService + consoleKeys.StartKey)
        const { page = 1, limit = 1, location_id, code } = query;

        if (page < 1 || limit < 1)
            throw new AppError('Numero de paginacion invalido', 400, CODES.RESOURCE.INVALID_OPERATION)

        const cameras = await findAll(query, ctx)

        Log.infoCtx(ctx, cameraService + consoleKeys.SuccessKey, consoleKeys.InformationKey, cameras)
        return cameras;
    }
)


export const updateCameraData = serviceHandler(
    cameraService,
    CODES.CAMERA.NOT_FOUND,
    async (data = {}, ctx) => {
        Log.infoCtx(ctx, cameraService + consoleKeys.StartKey, consoleKeys.RequestKey, data)

        const existsCamera = await findByCode(data.code, ctx)

        if (!existsCamera)
            throw new AppError('El codigo de camara no existe', 400, CODES.CAMERA.NOT_FOUND);

        const location = await findByLocationId(data.location_id, ctx);
        const updated = await updateCamera(data, existsCamera, ctx)

        Log.infoCtx(ctx, cameraService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, updated);
        return updated;
    }
)


export const deleteCamera = serviceHandler(
    cameraService,
    CODES.CAMERA.NOT_FOUND,
    async (id = "", ctx) => {
        const message = "Camera deleted successfully"
        Log.infoCtx(ctx, cameraService + consoleKeys.StartKey, consoleKeys.RequestKey, id)

        const existsCamera = await findById(id, ctx)

        if (!existsCamera)
            throw new AppError('La camara no existe', 400, CODES.CAMERA.NOT_FOUND);

        await deleteById(id, ctx);

        Log.infoCtx(ctx, cameraService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, { id, message });
        return message;
    }
)

export const authCamera = serviceHandler(
    cameraService,
    CODES.CAMERA.NOT_FOUND,
    async (authData = {}, ctx) => {
        Log.infoCtx(ctx, cameraService + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscateApiKey(authData))
        
        const camera = await findByCode(authData.code, ctx);

        if (!camera || camera.api_key != authData.api_key)
            throw new AppError('Credenciales invalidas', 400, CODES.CAMERA.NOT_FOUND);

        const token = generateCameraToken(camera)

        Log.info(ctx, cameraService + consoleKeys.SuccessKey, consoleKeys.ResponseKey, { token })
        return { token }
    }
)