export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "users",
            [
    {
        "id": "14cad000-1796-4305-93cf-2dbe05ac86d8",
        "name": "Melvin Aguilar",
        "email": "admin@iot.com",
        "password": "$2b$10$GOHfhOwjnvYqQ.MYH6HcQ.cR/1RDTflC7NIWYEs2Fx9OqXTJg4mUG",
        "active": true,
        "created_at": "2026-05-30T17:07:04.113Z",
        "updated_at": "2026-05-30T17:07:04.113Z",
        "deleted_at": null,
        "warehouse_id": null
    },
    {
        "id": "24829169-ef7c-462e-bc19-4f2f47559ca9",
        "name": "Mario Nieto",
        "email": "viewero@iot.com",
        "password": "$2b$10$V.UktopGSMjKoRDep.qxG.z3AO9o0yQfOv1Sxki.kziNMrNMnnkW2",
        "active": true,
        "created_at": "2026-05-30T17:08:24.807Z",
        "updated_at": "2026-05-30T17:08:24.807Z",
        "deleted_at": null,
        "warehouse_id": null
    },
    {
        "id": "2cce89df-87a0-4a1a-b96c-83b5f6062f5b",
        "name": "Fabio Hernandez",
        "email": "viewer@iot.com",
        "password": "$2b$10$6JYN3kgwbROT4UdBmnvOiObxxHFpL.kKSzV40vz44Sell9ctFvYd.",
        "active": true,
        "created_at": "2026-05-30T17:09:25.057Z",
        "updated_at": "2026-05-30T17:09:25.057Z",
        "deleted_at": null,
        "warehouse_id": null
    },
    {
        "id": "77ac9ef4-26c0-4d91-8183-8579f20ff1b9",
        "name": "Henry Lima",
        "email": "superadmin@iot.com",
        "password": "$2b$10$Jr0qhHNYZjaHuj0cfEgklu0NB9RQf9.1xhxH/pVAlhoP4aSLv4NmS",
        "active": true,
        "created_at": "2026-05-30T17:05:09.061Z",
        "updated_at": "2026-05-30T17:05:09.061Z",
        "deleted_at": null,
        "warehouse_id": null
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "users",
            null,
            {}
        );

    }

};
