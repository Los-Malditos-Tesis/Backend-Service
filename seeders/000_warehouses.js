export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "warehouses",
            [
    {
        "id": "4310752b-7ff4-4c72-85a2-4afbe921d572",
        "name": "Bodega Orion",
        "address": "Some nice address 158 B79 #102.",
        "created_at": "2026-05-30T18:03:23.370Z",
        "updated_at": "2026-05-30T18:03:23.370Z",
        "deleted_at": null
    },
    {
        "id": "a6f86fb3-85b2-4f06-a127-731788761301",
        "name": "Bodega LogisticsV1 TEST",
        "address": "Cima 4, Pasaje Del Jaraguá Bodega #254",
        "created_at": "2026-04-17T02:45:03.557Z",
        "updated_at": "2026-04-17T02:45:03.557Z",
        "deleted_at": null
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "warehouses",
            null,
            {}
        );

    }

};
