import {randomUUID} from "crypto"

export const createCtx=(values={})=>{
    return{
        requestId:randomUUID(),
        ...values
    }
}