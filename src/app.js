import express from 'express'
import syncDatabase from '../src/libs/database/sync.sequelize.js'

import {
    createProduct,
    searchProducts,
    deleteProduct,
    updateProduct
} from "./service/product_service.js";

const app = express()
syncDatabase()

app.use(express.json())

const runTests = async () => {
    const mockCtx = { context: "test" };

    console.log("--- Iniciando Pruebas de Servicio de Productos ---\n");

}

runTests()


export default app;