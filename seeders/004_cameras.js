export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "cameras",
            [
    {
        "id": "7bdb67aa-15b4-431d-bf45-cd5a17e08f25",
        "code": "AUDTIO_VIDEO_01",
        "is_active": false,
        "api_key":"231296fcf906e7c10dbc6f56300c455d904b5ca54b9597c0d4ae909dcfe2b74df",
        "created_at": "2026-05-29T03:55:26.006Z",
        "updated_at": "2026-05-29T03:55:26.006Z",
        "deleted_at": null,
        "location_id": "faab4a8b-0110-4d3d-9710-9a9f7684b612"
    },
    {
        "id": "7bdb67aa-15b4-431d-bf45-cd5a17e08f48",
        "code": "RASPBERRY-PI",
      "is_active": true,
        "api_key": "231296fcf906e7c10dbc6f56300c455d904b5ca54b9597c0d4ae909dcfe2b74e",
        "created_at": "2026-05-29T03:55:26.006Z",
        "updated_at": "2026-05-29T03:55:26.006Z",
        "deleted_at": null,
        "location_id": "3d39ba7b-9b2c-43e9-9758-5ed3592eeb25"
    },
    {
        "id": "99af278b-c35e-4d38-ab56-86c0a00e5e75",
        "code": "MONITOR-SAMNS-01",
      "is_active": true,
        "api_key": "fe6b2564e40097a5c2fd92e958ec0dd90a0f60949aa7ec1d409574e3f01ac141",
        "created_at": "2026-05-17T02:48:15.573Z",
        "updated_at": "2026-05-17T02:48:15.573Z",
        "deleted_at": null,
        "location_id": "584e3df0-b4ca-40ee-a67c-e5e5a381bb03"
    },
    {
        "id": "d8ec1fe1-9330-47fd-a776-e8751bc94450",
        "code": "PERIFERICOS-CAM01",
      "is_active": true,
        "api_key": "690236721d77b66744d451004f5ab53cb2b20fe8e2f76bc07649c1931f92e907",
        "created_at": "2026-05-17T02:47:31.224Z",
        "updated_at": "2026-05-17T02:47:31.224Z",
        "deleted_at": null,
        "location_id": "d9ebc333-c256-496e-906d-059101024f37"
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "cameras",
            null,
            {}
        );

    }

};
