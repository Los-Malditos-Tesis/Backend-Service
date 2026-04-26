import { loginUser, registerUser } from "../service/auth_service";
import { Log } from "../libs/logger/logger";
import { obfuscatePass } from "../utils/obfuscate/obfucates.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { registerUserDto } from "../dto/register_user_dto.js";

const authController = "auth controller: "

export const register = async (req, res, next)=>{
    try{
        Log.infoCtx(req.ctx, authController + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(data))
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

export const login = async (req, res, next)=>{
    try{
        Log.infoCtx(req.ctx, authController + consoleKeys.StartKey, consoleKeys.RequestKey, obfuscatePass(req.body))
        const serviceResp = await loginUser(req.ctx, req.body);

        Log.infoCtx(req.ctx, authController + consoleKeys.SuccessKey, consoleKeys.ResponseKey, { token: serviceResp })
        
        res.status(200).json({ token: serviceResp });
    }catch(e){
        Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
        next(e);
    }finally{
        Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey)
    }
}