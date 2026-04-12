import { getUserByEmail } from "../service/user_service.js";
import { verifyAuthToken } from "../service/auth_service.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { AppError } from "../errors/app_error.js";
import { authCodes } from "../errors/error_codes.js";

const AuthMiddleware = "auth middleware: "

const authMiddleware = async(req, res, next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader) 
            throw new AppError('Authorization header is missing', 401, authCodes.INAUTHORIZED);

        const token = authHeader.split(' ')[1];
        if (!token) 
            throw new AppError('Token is missing', 401, authCodes.INAUTHORIZED);

        const decoded = await verifyAuthToken(req.ctx, token);
        if (!decoded.valid) 
            throw new AppError('Invalid token', 401, authCodes.INVALID_TOKEN);

        const user = await getUserByEmail(req.ctx, decoded.email);
        if (!user) 
            throw new AppError('User not found', 404, authCodes.NOT_FOUND);
        
        req.user = user;
        next();
    }catch(e){
        Log.errorCtx(req.ctx, AuthMiddleware + consoleKeys.FailKey, e);
        next(e);
    }finally{
        Log.infoCtx(req.ctx, AuthMiddleware + consoleKeys.FinishKey)
    }
}