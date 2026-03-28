export const obfuscatePass = (data = {})=>{
    if (!data || typeof data !== "object") return data;
    const clone = { ...data };

    if ("password" in clone) {
        clone.password = "[REDACTED]";
    }

    return clone;
}