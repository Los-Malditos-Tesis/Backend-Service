export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "pallets",
            [
    {
        "id": "33707722-62da-4f97-8639-13f9a4143457",
        "code": "12345",
        "qr_code": "(00)12345(01)07501(37)20(30)200",
        "quantity_box": 20,
        "quantity_units_in_box": 200,
        "status": "CRE",
        "created_at": "2026-07-08T01:51:46.617Z",
        "updated_at": "2026-07-08T01:51:46.617Z",
        "deleted_at": null,
        "location_id": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301",
        "product_id": "fc9b9c09-7eb3-4741-847a-ec8ba482a137"
    },
    {
        "id": "3fc87de2-8780-40f2-8b4c-65c8ab4bd700",
        "code": "98765",
        "qr_code": "(00)98765(01)27965(37)24(30)250",
        "quantity_box": 24,
        "quantity_units_in_box": 250,
        "status": "CRE",
        "created_at": "2026-07-08T02:05:21.199Z",
        "updated_at": "2026-07-08T02:05:21.199Z",
        "deleted_at": null,
        "location_id": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301",
        "product_id": "6efcbff2-cfd3-4c92-a3b5-18f456e53001"
    },
    {
        "id": "cd1615d6-a34b-4dec-b5ae-766fc4a09fa4",
        "code": "45678",
        "qr_code": "(00)45678(01)12945(37)48(30)500",
        "quantity_box": 48,
        "quantity_units_in_box": 500,
        "status": "CRE",
        "created_at": "2026-05-29T04:31:55.514Z",
        "updated_at": "2026-05-29T04:31:55.514Z",
        "deleted_at": null,
        "location_id": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301",
        "product_id": "c5f7e2cb-c650-4429-b0f7-6b63af13f101"
    },
    {
        "id": "f1507500-9891-4908-b61d-a9bff35a6ece",
        "code": "65432",
        "qr_code": "(00)65432(01)07501(37)10(30)80",
        "quantity_box": 10,
        "quantity_units_in_box": 80,
        "status": "CRE",
        "created_at": "2026-07-09T05:05:14.016Z",
        "updated_at": "2026-07-09T05:05:14.016Z",
        "deleted_at": null,
        "location_id": null,
        "warehouse_id": "a6f86fb3-85b2-4f06-a127-731788761301",
        "product_id": "fc9b9c09-7eb3-4741-847a-ec8ba482a137"
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "pallets",
            null,
            {}
        );

    }

};
