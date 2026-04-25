import { loginUser, registerUser } from "../service/auth_service.js";
import { Log } from "../libs/logger/logger.js";
import { obfuscatePass, obfuscateToken } from "../utils/obfuscate/obfucates.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { registerUserDto } from "../dto/register_user_dto.js";

const authController = "auth controller: "

export const registerController = async (req, res, next)=>{
    try{
        Log.infoCtx(req.ctx, authController + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(req.body))
        const serviceResp = await registerUser(req.ctx, req.body);

        const resp = registerUserDto(serviceResp.toJSON())
        Log.infoCtx(req.ctx, authController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, resp)
        
        res.status(201).json(resp);
    }catch(e){
        Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
        next(e);
    }finally{
        Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey)
    }
}

export const loginController = async (req, res, next)=>{
    try{
        Log.infoCtx(req.ctx, authController + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(req.body))
        const serviceResp = await loginUser(req.ctx, req.body);

        Log.infoCtx(req.ctx, authController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, obfuscateToken(serviceResp))
        
        res.status(200).json(serviceResp);
    }catch(e){
        Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
        next(e);
    }finally{
        Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey)
    }
}