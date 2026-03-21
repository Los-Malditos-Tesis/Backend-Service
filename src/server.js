import app from "./app.js";
import {config} from "../pkg/config/config.js"
import { Log } from "../pkg/logger/logger.js";

const PORT = config.port
app.listen(PORT, () => {
    Log.info("Server is running", "port", PORT)
})