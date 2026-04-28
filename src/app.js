import express from 'express'
import syncDatabase from '../src/libs/database/sync.sequelize.js'
import { createWarehouse, searchWarehouse, updateWarehouse, deleteWarehouse } from '../src/service/warehouse_service.js'

const app = express()
syncDatabase()

app.use(express.json())
app.use(contextMiddleware)
app.use(config.basePath, router)
app.use(globalErrorHandler)

const runTests = async () => {
    const mockCtx = { context: "test" };

    try {
        console.log("Probando restricción de rol (USER no puede crear)...");
        await createWarehouse({
            name: "Almacen Central",
            address: "Calle Falsa 123",
            user_id: commonUserId
        }, mockCtx);
    } catch (error) {
        console.log(`✅ Capturado error esperado: [${error.code}] ${error.message}\n`);
    }

    // 2. Prueba de CREACIÓN (Éxito con Admin)
    // try {
    //     console.log("Creando almacén con usuario administrador...");
    //     const warehouseData = {
    //         name: "Bodega Norte 1",
    //         address: "Av. Industrial #45, San Salvador",
    //         user_id: adminUserId
    //     };
    //     await createWarehouse(warehouseData, mockCtx);
    //     console.log("✅ Almacén creado exitosamente.\n");
    // } catch (error) {
    //     console.error(`❌ Error al crear almacén: ${error.message}\n`);
    // }

    // // 3. Prueba de BÚSQUEDA
    // try {
    //     console.log("Buscando almacén recién creado...");
    //     const results = await searchWarehouse({ name: "Bodega Norte" }, 10, 1, mockCtx);

    //     if (results && results.items.length > 0) {
    //         testWarehouseId = results.items[0].id;
    //         console.log(`✅ Almacén encontrado: ${results.items[0].name} (ID: ${testWarehouseId})\n`);
    //     } else {
    //         console.log("⚠️ No se obtuvieron resultados (Revisa la recursión en el servicio).\n");
    //     }
    // } catch (error) {
    //     console.error(`❌ Error en búsqueda: ${error.message}\n`);
    // }

    // // 4. Prueba de ACTUALIZACIÓN
    // if (testWarehouseId) {
    //     try {
    //         console.log("Actualizando dirección del almacén...");
    //         await updateWarehouse({
    //             id: testWarehouseId,
    //             name: "Bodega Norte 1 (Editada)",
    //             address: "Nueva Dirección 789",
    //             user_id: adminUserId
    //         }, mockCtx);
    //         console.log("✅ Almacén actualizado.\n");
    //     } catch (error) {
    //         console.error(`❌ Error al actualizar: ${error.message}\n`);
    //     }
    // }

    // // 5. Prueba de ELIMINACIÓN
    // if (testWarehouseId) {
    //     try {
    //         console.log(`Intentando eliminar almacén ID: ${testWarehouseId}...`);
    //         await deleteWarehouse(testWarehouseId, mockCtx);
    //         console.log("✅ Almacén eliminado exitosamente.\n");
    //     } catch (error) {
    //         // Fallará si tiene ubicaciones (Locations.length > 0)
    //         console.error(`❌ Error al eliminar: [${error.code}] ${error.message}\n`);
    //     }
    // }
}

runTests()

export default app;