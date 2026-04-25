import express from 'express'
import syncDatabase from '../src/libs/database/sync.sequelize.js'
import { contextMiddleware } from './middlewares/context_middleware.js'
import router from './route/index.js'

const app = express()
syncDatabase()

app.use(express.json())
app.use(contextMiddleware)
app.use(router)


export default app;