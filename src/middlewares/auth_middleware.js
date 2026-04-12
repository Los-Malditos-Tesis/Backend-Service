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
        if (!authHeader) {
            Log.errorCtx(req.ctx, AuthMiddleware + consoleKeys.FailKey, 'Authorization header is missing');
            throw new AppError('Authorization header is missing', 401, authCodes.INAUTHORIZED);
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            Log.errorCtx(req.ctx, AuthMiddleware + consoleKeys.FailKey, 'Token is missing');
            throw new AppError('Token is missing', 401, authCodes.INAUTHORIZED);
        }

        const decoded = await verifyAuthToken(req.ctx, token);
        if (!decoded.valid) {
            Log.errorCtx(req.ctx, AuthMiddleware + consoleKeys.FailKey, 'Invalid token');
            throw new AppError('Invalid token', 401, authCodes.INAUTHORIZED);
        }
        
        const user = await getUserByEmail(req.ctx, decoded.payload.email);
        if (!user) {
            Log.errorCtx(req.ctx, AuthMiddleware + consoleKeys.FailKey, 'User not found');
            throw new AppError('User not found', 401, authCodes.INAUTHORIZED);
        }
        
        req.user = user;
        next();

    }catch(e){
        Log.errorCtx(req.ctx, AuthMiddleware + consoleKeys.FailKey, e);
        next(e);
    }finally{
        Log.infoCtx(req.ctx, AuthMiddleware + consoleKeys.FinishKey)
    }
}