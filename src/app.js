import express from 'express'
import syncDatabase from '../src/libs/database/sync.sequelize.js'
import { contextMiddleware } from './middlewares/context_middleware.js'
import { globalErrorHandler } from './errors/global_error_handler.js'
import { config } from './config/config.js'
import router from './route/index.js'
import cors from "cors";


const app = express()
syncDatabase()

app.use(cors());
app.use(express.json())
app.use(contextMiddleware)
app.use(config.basePath, router)
app.use(globalErrorHandler)

const runTests = async () => {
    const mockCtx = { context: "test" };
}

runTests()

export default app;
