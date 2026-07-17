export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "stores",
            [
    {
        "id": "d44038d5-9c4f-4ff8-96af-11f1cf6b951d",
        "name": "Tienda Central",
        "code": "ST-CENTRAL",
        "address": "Some nice address 158 B79 #102.",
        "created_at": "2026-05-29T05:37:10.336Z",
        "updated_at": "2026-05-29T05:37:10.336Z",
        "deleted_at": null
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "stores",
            null,
            {}
        );

    }

};
