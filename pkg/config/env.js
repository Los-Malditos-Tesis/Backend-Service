import "dotenv/config"

const require=(name)=>{
    const value = process.env[name]
    if (!value){
        throw new Error(`Missing environment variable: ${name}`)
    }

    return value
}

const optional=(name, defaultValue)=>{
    return process.env[name] ?? defaultValue
}

export const env = {
    NODE_ENV: optional("NODE_ENV", "development"),
    PORT: require("PORT"),
     // Add more environment variables as needed
}