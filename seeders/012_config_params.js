export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "config_params",
            [
    {
        "id": "70269fd5-e349-47dc-b136-90a839030a6f",
        "key": "SCM",
        "value": "EXT",
        "created_at": "2026-05-17T02:45:03.627Z",
        "updated_at": "2026-07-13T22:39:13.173Z",
        "deleted_at": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301"
    },
    {
        "id": "75d13693-7420-47bf-a4b0-2a2b3443289c",
        "key": "SCM",
        "value": "ENT",
        "created_at": "2026-05-30T18:03:23.432Z",
        "updated_at": "2026-05-30T18:03:23.432Z",
        "deleted_at": null,
        "warehouse_id": "4310752b-7ff4-4c72-85a2-4afbe921d572"
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "config_params",
            null,
            {}
        );

    }

};
