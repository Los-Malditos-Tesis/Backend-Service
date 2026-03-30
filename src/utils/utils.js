import { config } from "../config/config.js";

export const generateTime = () => {
    const time = new Date().toLocaleString(config.appLocal, {
        timeZone: config.appTimeZone,
        hour12: false,
    }).replace(" ", "T")

    return time
}