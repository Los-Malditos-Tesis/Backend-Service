export const obfuscatePass = (data = {})=>{
    if (!data || typeof data !== "object") return data;
    const clone = { ...data };

    if ("password" in clone) {
        clone.password = "[REDACTED]";
    }

    return clone;
}

export const obfuscateToken = (data = {})=>{
    if (!data || typeof data !== "object") return data;
    const clone = { ...data };

    if ("content" in clone) {
        clone.content = "[REDACTED]";
    }

    if("token" in clone){
        clone.token = "[REDACTED]";
    }

    return clone;
}