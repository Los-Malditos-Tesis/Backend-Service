export default {
    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "order_boxes",
            [
                {
                    created_at: "2026-05-31T22:17:08.701-06:00",
                    updated_at: "2026-05-31T22:17:08.701-06:00",
                    box_id: "8d467404-aae0-491f-93ae-0b6617a309e3",
                    order_id: "894b433c-2b60-4766-a6d3-fb41c62e94a8"
                },
                {
                    created_at: "2026-05-31T22:17:28.687-06:00",
                    updated_at: "2026-05-31T22:17:28.687-06:00",
                    box_id: "c886babb-1627-492b-8ca2-6531b97f1dd5",
                    order_id: "894b433c-2b60-4766-a6d3-fb41c62e94a8"
                },
                {
                    created_at: "2026-05-31T22:21:30.922-06:00",
                    updated_at: "2026-05-31T22:21:30.922-06:00",
                    box_id: "2a2a940b-c861-4f2d-8b62-51515550a0c3",
                    order_id: "894b433c-2b60-4766-a6d3-fb41c62e94a8"
                },

                {
                    created_at: "2026-06-04T23:00:48.626-06:00",
                    updated_at: "2026-06-04T23:00:48.626-06:00",
                    box_id: "4f9cbb75-f3a4-4b44-983d-15510e15d802",
                    order_id: "63d1e362-aba1-4343-a254-cf3cd515352c"
                },

                {
                    created_at: "2026-06-04T23:01:24.999-06:00",
                    updated_at: "2026-06-04T23:01:24.999-06:00",
                    box_id: "118ac92e-d6d0-440a-b476-78f42e16aeb5",
                    order_id: "63d1e362-aba1-4343-a254-cf3cd515352c"
                },

                {
                    created_at: "2026-06-04T23:03:00.419-06:00",
                    updated_at: "2026-06-04T23:03:00.419-06:00",
                    box_id: "7bd7fe70-8084-4cab-adc9-1e2dc8980ad3",
                    order_id: "d9c287dc-dc60-4d4a-a889-27e77bbeb858"
                },

                {
                    created_at: "2026-06-04T23:04:36.220-06:00",
                    updated_at: "2026-06-04T23:04:36.220-06:00",
                    box_id: "009c467e-84f8-42ee-baf8-6ea80adccc70",
                    order_id: "2db5b5bf-c6fc-4fbd-b1ed-dbce0b4bae7c"
                },

                {
                    created_at: "2026-06-04T23:04:37.777-06:00",
                    updated_at: "2026-06-04T23:04:37.777-06:00",
                    box_id: "5edf7bc4-f13a-461b-90ae-0a939977f088",
                    order_id: "2db5b5bf-c6fc-4fbd-b1ed-dbce0b4bae7c"
                },

                {
                    created_at: "2026-06-16T21:58:53.742-06:00",
                    updated_at: "2026-06-16T21:58:53.742-06:00",
                    box_id: "97163522-510c-40b4-a006-bce93cd88afc",
                    order_id: "6485e8be-8719-4069-940e-09f9d115222d"
                },

                {
                    created_at: "2026-06-16T21:59:00.978-06:00",
                    updated_at: "2026-06-16T21:59:00.978-06:00",
                    box_id: "11c0d710-1138-4441-9e49-29e8a07452cc",
                    order_id: "6485e8be-8719-4069-940e-09f9d115222d"
                }
            ],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "order_boxes",
            null,
            {}
        );

    }
};
