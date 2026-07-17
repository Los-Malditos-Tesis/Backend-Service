export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "locations",
            [
    {
        "id": "14dc1b86-4ba9-4e43-b3d1-987a170a10fc",
        "zone": "TEC-B01",
        "category": "Periféricos",
        "created_at": "2026-04-30T11:00:00.000Z",
        "updated_at": "2026-04-30T11:00:00.000Z",
        "deleted_at": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301"
    },
    {
        "id": "3d39ba7b-9b2c-43e9-9758-5ed3592eeb25",
        "zone": "ENTRADA_SALIDA",
        "category": "Muelle de Entrada y Salida",
        "created_at": "2026-05-29T03:55:12.895Z",
        "updated_at": "2026-06-02T21:42:05.632Z",
        "deleted_at": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301"
    },
    {
        "id": "584e3df0-b4ca-40ee-a67c-e5e5a381bb03",
        "zone": "AUD-C01",
        "category": "Audio y Video",
        "created_at": "2026-05-17T02:47:14.247Z",
        "updated_at": "2026-05-28T05:28:51.166Z",
        "deleted_at": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301"
    },
    {
        "id": "d9ebc333-c256-496e-906d-059101024f37",
        "zone": "GAM-D01",
        "category": "Gaming",
        "created_at": "2026-05-17T02:46:47.678Z",
        "updated_at": "2026-05-19T03:39:22.035Z",
        "deleted_at": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301"
    },
    {
        "id": "faab4a8b-0110-4d3d-9710-9a9f7684b612",
        "zone": "AUD-C02",
        "category": "Audio y Video",
        "created_at": "2026-04-30T11:00:00.000Z",
        "updated_at": "2026-04-30T11:00:00.000Z",
        "deleted_at": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301"
    },
    {
        "id": "faab4a8b-0110-4d3d-9710-9a9f7684b667",
        "zone": "TEC-A01",
        "category": "Equipo de computo",
        "created_at": "2026-04-30T11:00:00.000Z",
        "updated_at": "2026-04-30T11:00:00.000Z",
        "deleted_at": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301"
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "locations",
            null,
            {}
        );

    }

};
