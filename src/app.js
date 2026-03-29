import express from 'express'
import syncDatabase from '../src/libs/database/sync.sequelize.js'
import { registerUser } from './service/auth_service.js'

const app = express()
syncDatabase()

app.use(express.json())

try{
    await registerUser({
        name: "fabio",
        email: "fabioal@gmail.com",
        password: "12345"
    })
}catch(e){

}

export default app;