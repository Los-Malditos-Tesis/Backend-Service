export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "suppliers",
            [
    {
        "id": "17114941-f526-4ad5-b979-c50e4f449a05",
        "name": "Digital Warehouse Group",
        "code": "DWG-002",
        "contact_name": "Eduardo Lima",
        "phone": "7000-2222",
        "email": "contacto@digitalwarehouse.com",
        "location": "Santa Ana",
        "created_at": "2026-04-30T10:35:00.000Z",
        "updated_at": "2026-04-30T10:35:00.000Z",
        "deleted_at": null
    },
    {
        "id": "3b9f4313-5103-4095-814b-17fce01fe95c",
        "name": "SAMSANG",
        "code": "SMG-001",
        "contact_name": "Melvin Aguilar",
        "phone": "7092-5546",
        "email": "melvin.aguilar@samsang.com",
        "location": "Calle el patron bloc 46",
        "created_at": "2026-04-17T02:49:47.289Z",
        "updated_at": "2026-04-17T02:49:47.289Z",
        "deleted_at": null
    },
    {
        "id": "5a1f87c0-44b2-4df4-88e5-df49d75f1002",
        "name": "NextGen Electronics",
        "code": "SUP-004",
        "contact_name": "Ricardo Hernández",
        "phone": "7000-4444",
        "email": "contacto@nextgenelectronics.com",
        "location": "San Miguel",
        "created_at": "2026-04-30T10:35:00.000Z",
        "updated_at": "2026-04-30T10:35:00.000Z",
        "deleted_at": null
    },
    {
        "id": "644f79ed-798c-4795-a219-989c13b1a05a",
        "name": "PERIFERICOS EL CHINO",
        "code": "PEC-002",
        "contact_name": "Fabio Hernquex",
        "phone": "8765-3201",
        "email": "fabio.hernqi@chino.com",
        "location": "calle el chino 45",
        "created_at": "2026-04-17T02:50:51.407Z",
        "updated_at": "2026-04-17T02:50:51.407Z",
        "deleted_at": null
    },
    {
        "id": "82f2d16f-fc7c-4d4c-8a9b-f2b6c2e8d001",
        "name": "Lima Tech Imports",
        "code": "SUP-003",
        "contact_name": "Henry Lima",
        "phone": "7000-3333",
        "email": "ventas@globaltechimports.com",
        "location": "La Libertad",
        "created_at": "2026-04-30T10:35:00.000Z",
        "updated_at": "2026-04-30T10:35:00.000Z",
        "deleted_at": null
    },
    {
        "id": "f6159652-6b18-493f-a922-4bee3ca81598",
        "name": "Nietof Distribution SV",
        "code": "NDSV-01",
        "contact_name": "Mario Nietof",
        "phone": "7000-1111",
        "email": "ventas@nietofdistribution.com",
        "location": "San Salvador",
        "created_at": "2026-04-30T10:35:00.000Z",
        "updated_at": "2026-04-30T10:35:00.000Z",
        "deleted_at": null
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "suppliers",
            null,
            {}
        );

    }

};
