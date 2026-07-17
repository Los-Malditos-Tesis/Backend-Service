export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "roles",
            [
    {
        "id": "ADMIN",
        "name": "Administrador",
        "description": "",
        "created_at": "2026-05-30T16:55:17.338Z",
        "updated_at": "2026-05-30T16:55:17.338Z",
        "deleted_at": null
    },
    {
        "id": "SUPERADMIN",
        "name": "Super Administrador",
        "description": "",
        "created_at": "2026-05-30T16:55:17.338Z",
        "updated_at": "2026-05-30T16:55:17.338Z",
        "deleted_at": null
    },
    {
        "id": "VIEWER",
        "name": "Visualizador",
        "description": "",
        "created_at": "2026-05-30T16:55:17.338Z",
        "updated_at": "2026-05-30T16:55:17.338Z",
        "deleted_at": null
    },
    {
        "id": "VIEWER-ORDER",
        "name": "Visualizador de ordenes",
        "description": "",
        "created_at": "2026-05-30T16:55:17.338Z",
        "updated_at": "2026-05-30T16:55:17.338Z",
        "deleted_at": null
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "roles",
            null,
            {}
        );

    }

};
