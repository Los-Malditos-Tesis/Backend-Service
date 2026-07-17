export default {
    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "user_role",
            [
                {
                    created_at: "2026-05-30T11:05:09.366-06:00",
                    updated_at: "2026-05-30T11:05:09.366-06:00",
                    role_id: "VIEWER",
                    user_id: "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
                },
                {
                    created_at: "2026-05-30T11:05:37.161-06:00",
                    updated_at: "2026-05-30T11:05:37.161-06:00",
                    role_id: "SUPERADMIN",
                    user_id: "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
                },
                {
                    created_at: "2026-05-30T11:07:04.407-06:00",
                    updated_at: "2026-05-30T11:07:04.407-06:00",
                    role_id: "VIEWER",
                    user_id: "14cad000-1796-4305-93cf-2dbe05ac86d8"
                },
                {
                    created_at: "2026-05-30T11:07:32.009-06:00",
                    updated_at: "2026-05-30T11:07:32.009-06:00",
                    role_id: "ADMIN",
                    user_id: "14cad000-1796-4305-93cf-2dbe05ac86d8"
                },
                {
                    created_at: "2026-05-30T11:08:25.105-06:00",
                    updated_at: "2026-05-30T11:08:25.105-06:00",
                    role_id: "VIEWER",
                    user_id: "24829169-ef7c-462e-bc19-4f2f47559ca9"
                },
                {
                    created_at: "2026-05-30T11:08:48.059-06:00",
                    updated_at: "2026-05-30T11:08:48.059-06:00",
                    role_id: "VIEWER-ORDER",
                    user_id: "24829169-ef7c-462e-bc19-4f2f47559ca9"
                },
                {
                    created_at: "2026-05-30T11:09:25.348-06:00",
                    updated_at: "2026-05-30T11:09:25.348-06:00",
                    role_id: "VIEWER",
                    user_id: "2cce89df-87a0-4a1a-b96c-83b5f6062f5b"
                }
            ],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "user_roles",
            null,
            {}
        );

    }
};
