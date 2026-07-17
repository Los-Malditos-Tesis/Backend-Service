export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "products",
            [
    {
        "id": "02b1d446-4681-4379-b10d-1c1431778307",
        "code": "01354",
        "name": "Mouse Razer GX06",
        "category": "Periféricos",
        "sku": "SKU-GAM-026",
        "created_at": "2026-06-13T21:33:17.110Z",
        "updated_at": "2026-06-13T21:33:17.110Z",
        "deleted_at": null,
        "supplier_id": "f6159652-6b18-493f-a922-4bee3ca81598"
    },
    {
        "id": "1a25291a-b889-4f31-a547-d33310e90620",
        "code": "24568",
        "name": "Airpods buds 8 PRO",
        "category": "Audio y Video",
        "sku": "SKU-AUD-004",
        "created_at": "2026-04-16T22:10:29.505Z",
        "updated_at": "2026-04-26T02:44:47.100Z",
        "deleted_at": null,
        "supplier_id": "644f79ed-798c-4795-a219-989c13b1a05a"
    },
    {
        "id": "1e2d5b44-71c1-4fd0-97d2-fb2f1d3f8001",
        "code": "34567",
        "name": "Mini PC Lenovo ThinkCentre",
        "category": "Equipo de computo",
        "sku": "SKU-PC-003",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "17114941-f526-4ad5-b979-c50e4f449a05"
    },
    {
        "id": "251156d7-1120-443b-b62d-27958d6e861b",
        "code": "56789",
        "name": "Laptop Dell Latitude 5550",
        "category": "Equipo de computo",
        "sku": "SKU-PC-001",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "f6159652-6b18-493f-a922-4bee3ca81598"
    },
    {
        "id": "31e6e5fc-2f5d-4e4e-97dd-fef0a5a10004",
        "code": "12453",
        "name": "Teclado Gamer Mecanico RGB Pro",
        "category": "Gaming",
        "sku": "SKU-GAM-004",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "5a1f87c0-44b2-4df4-88e5-df49d75f1002"
    },
    {
        "id": "34b7741e-81af-4e35-b1b7-2f4f7d583003",
        "code": "48293",
        "name": "Camara de Videoconferencia",
        "category": "Audio y Video",
        "sku": "SKU-AUD-003",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-06-01T04:24:41.617Z",
        "deleted_at": null,
        "supplier_id": "f6159652-6b18-493f-a922-4bee3ca81598"
    },
    {
        "id": "4fd91ef6-c2f2-4f5d-b51c-5d5db6d6e111",
        "code": "34623",
        "name": "Mouse Inalambrico Logitech",
        "category": "Periféricos",
        "sku": "SKU-PER-002",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "17114941-f526-4ad5-b979-c50e4f449a05"
    },
    {
        "id": "53b95e7f-b24a-4c2f-ae35-b43e65f29001",
        "code": "17501",
        "name": "Headset Gamer RGB",
        "category": "Gaming",
        "sku": "SKU-GAM-001",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "17114941-f526-4ad5-b979-c50e4f449a05"
    },
    {
        "id": "61eab8c2-11f1-43c4-9c57-dcae7dc83002",
        "code": "80547",
        "name": "Barra de Sonido",
        "category": "Periféricos",
        "sku": "SKU-AUD-002",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-06-01T04:23:11.544Z",
        "deleted_at": null,
        "supplier_id": "17114941-f526-4ad5-b979-c50e4f449a05"
    },
    {
        "id": "69e17cdd-39c1-49ee-ad2f-6e154c011cfa",
        "code": "87658",
        "name": "Teclado Mecanico RGB",
        "category": "Periféricos",
        "sku": "SKU-PER-001",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "17114941-f526-4ad5-b979-c50e4f449a05"
    },
    {
        "id": "6efcbff2-cfd3-4c92-a3b5-18f456e53001",
        "code": "27965",
        "name": "Audifonos Bluetooth",
        "category": "Audio y Video",
        "sku": "SKU-AUD-001",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-06-01T04:08:45.500Z",
        "deleted_at": null,
        "supplier_id": "f6159652-6b18-493f-a922-4bee3ca81598"
    },
    {
        "id": "7db6df65-59c0-49a8-bbe2-71e53f5d0001",
        "code": "15378",
        "name": "Estacion de Trabajo HP Z2",
        "category": "Equipo de computo",
        "sku": "SKU-PC-005",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "82f2d16f-fc7c-4d4c-8a9b-f2b6c2e8d001"
    },
    {
        "id": "81fa7c62-8d9f-4e6a-95c7-55e32f3d9002",
        "code": "29453",
        "name": "Mouse Gamer Inalambrico",
        "category": "Gaming",
        "sku": "SKU-GAM-002",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "17114941-f526-4ad5-b979-c50e4f449a05"
    },
    {
        "id": "858d9802-4608-4826-9512-d5c4627b28dc",
        "code": "11111",
        "name": "Producto de prueba 11",
        "category": "Accesorios",
        "sku": "1111",
        "created_at": "2026-05-30T23:46:13.032Z",
        "updated_at": "2026-05-30T23:46:13.032Z",
        "deleted_at": null,
        "supplier_id": "82f2d16f-fc7c-4d4c-8a9b-f2b6c2e8d001"
    },
    {
        "id": "92fdd738-4d97-48e6-9132-f8afcf970002",
        "code": "89345",
        "name": "Impresora Multifuncional Epson",
        "category": "Periféricos",
        "sku": "SKU-PER-004",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "5a1f87c0-44b2-4df4-88e5-df49d75f1002"
    },
    {
        "id": "9e6b67a2-16cb-48e6-a1a0-85c7f4d39003",
        "code": "20385",
        "name": "Monitor Gamer 27 Pulgadas",
        "category": "Gaming",
        "sku": "SKU-GAM-003",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "f6159652-6b18-493f-a922-4bee3ca81598"
    },
    {
        "id": "b9a8f7bb-1257-4de9-ace8-6f953e807229",
        "code": "24910",
        "name": "Monitor Samsung 24 Pulgadas",
        "category": "Equipo de computo",
        "sku": "SKU-PC-002",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "f6159652-6b18-493f-a922-4bee3ca81598"
    },
    {
        "id": "bb46efb8-f7cd-42ac-a83a-6dac4dabe125",
        "code": "11112",
        "name": "Producto Importante 2",
        "category": "Accesorios",
        "sku": "11111",
        "created_at": "2026-05-30T23:47:02.419Z",
        "updated_at": "2026-05-30T23:47:02.419Z",
        "deleted_at": null,
        "supplier_id": "f6159652-6b18-493f-a922-4bee3ca81598"
    },
    {
        "id": "bbd5b886-e42d-4bad-9590-91b702eff64a",
        "code": "13945",
        "name": "Monitor samsung 45pg",
        "category": "Equipo de computo",
        "sku": "SKU-PC-004",
        "created_at": "2026-04-17T02:52:16.020Z",
        "updated_at": "2026-04-17T02:52:16.020Z",
        "deleted_at": null,
        "supplier_id": "3b9f4313-5103-4095-814b-17fce01fe95c"
    },
    {
        "id": "bfdcab7e-3620-4c18-9542-d506c8ba3ee0",
        "code": "12345",
        "name": "Mouse Logitic GM100",
        "category": "Periféricos",
        "sku": "SKU-MOS-100",
        "created_at": "2026-05-30T23:41:15.793Z",
        "updated_at": "2026-05-30T23:41:15.793Z",
        "deleted_at": null,
        "supplier_id": "82f2d16f-fc7c-4d4c-8a9b-f2b6c2e8d001"
    },
    {
        "id": "c5f7e2cb-c650-4429-b0f7-6b63af13f101",
        "code": "12945",
        "name": "Webcam Full HD",
        "category": "Periféricos",
        "sku": "SKU-PER-003",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "f6159652-6b18-493f-a922-4bee3ca81598"
    },
    {
        "id": "f53bde36-1a0d-4eb8-96b3-c39ef46f0003",
        "code": "89467",
        "name": "Monitor Profesional 32 Pulgadas",
        "category": "Audio y Video",
        "sku": "SKU-AUD-004",
        "created_at": "2026-04-30T10:45:00.000Z",
        "updated_at": "2026-04-30T10:45:00.000Z",
        "deleted_at": null,
        "supplier_id": "82f2d16f-fc7c-4d4c-8a9b-f2b6c2e8d001"
    },
    {
        "id": "fc9b9c09-7eb3-4741-847a-ec8ba482a137",
        "code": "07501",
        "name": "Lampara",
        "category": "Gaming",
        "sku": "07501",
        "created_at": "2026-06-09T03:45:41.192Z",
        "updated_at": "2026-06-09T03:47:45.078Z",
        "deleted_at": null,
        "supplier_id": "82f2d16f-fc7c-4d4c-8a9b-f2b6c2e8d001"
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "products",
            null,
            {}
        );

    }

};
