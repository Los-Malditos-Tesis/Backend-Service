import { config } from "../config/config.js";

export const generateTime = () => {
    const time = new Date().toLocaleString("sv-SE", {
        timeZone: "America/El_Salvador",
        hour12: false,
    }).replace(" ", "T")

    return time
}