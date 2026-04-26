import express from 'express'
import syncDatabase from '../src/libs/database/sync.sequelize.js'

const app = express()
syncDatabase()

app.use(express.json())

export default app;