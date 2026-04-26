import express from 'express'
import syncDatabase from '../src/libs/database/sync.sequelize.js'
import { contextMiddleware } from './middlewares/context_middleware.js'
import { globalErrorHandler } from './errors/global_error_handler.js'
import router from './route/index.js'

const app = express()
syncDatabase()

app.use(express.json())
app.use(contextMiddleware)
app.use(router)
app.use(globalErrorHandler)


export default app;