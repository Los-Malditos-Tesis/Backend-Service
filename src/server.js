import app from "./app.js";
import {config} from "../src/config/config.js"
import { Log } from "../src/libs/logger/logger.js";

const PORT = config.port
app.listen(PORT, () => {
    Log.info("Server is running", "port", PORT)
})