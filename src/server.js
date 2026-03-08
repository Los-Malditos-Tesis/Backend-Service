import app from "./app.js";
import {config} from "../pkg/config/config.js"
import { log } from "../pkg/logger/logger.js";

const PORT = config.port
app.listen(PORT, () => {
    log.info("Server is running", "port", PORT)
})