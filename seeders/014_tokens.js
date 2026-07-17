export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "tokens",
            [
    {
        "id": "0388b9c8-5447-4772-82da-c9c7dc955f0a",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2FjOWVmNC0yNmMwLTRkOTEtODE4My04NTc5ZjIwZmYxYjkiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoic3VwZXJhZG1pbkBpb3QuY29tIiwiaWF0IjoxNzgzODYyMzE0LCJleHAiOjE3ODM5NDg3MTQsImF1ZCI6InRlc2lzLWZyb250IiwiaXNzIjoidGVzaXMtYXBpIn0.uxjF7k8T8fBM9H06PDl7uCsVPsO-EM9dHbsha9uh8rJXp2A9RRh9O2AKmaoH9zX9dxDaXqEhb5RJ35mYl10P5A",
        "is_valid": true,
        "created_at": "2026-07-12T13:18:34.182Z",
        "updated_at": "2026-07-12T13:18:34.182Z",
        "deleted_at": null,
        "user_id": "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
    },
    {
        "id": "04afc1f5-4d1e-447b-8028-92a31c9793cc",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4Mzk1Nzg5MCwiZXhwIjoxNzg0MDQ0MjkwLCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.a-fy8Kutulc4q15-yKCctj4ovqrEBn8mYnzQlg0C0i96LZC8fxXqrDRPz0-2ux5hHP7Z5qvuL3_t8J2P8BLQxQ",
        "is_valid": true,
        "created_at": "2026-07-13T15:51:30.067Z",
        "updated_at": "2026-07-13T15:51:30.067Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "075df594-1e99-4b30-8fd0-818466782af1",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4MjE3MzMwMiwiZXhwIjoxNzgyMjU5NzAyLCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.PI9cu5lT6nllxrpj16oqx7QumUtS4ltCEId1Gq8fbe7VnDhAN86kZYghnLR74P3xVAbcXgaUY1p2CoJCrJ3ogg",
        "is_valid": true,
        "created_at": "2026-06-23T00:08:22.692Z",
        "updated_at": "2026-06-23T00:08:22.692Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "1d795849-b316-493c-832d-529814cdac78",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2NlODlkZi04N2EwLTRhMWEtYjk2Yy04M2I1ZjYwNjJmNWIiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoidmlld2VyQGlvdC5jb20iLCJpYXQiOjE3ODAyMDk2NzYsImV4cCI6MTc4MDI5NjA3NiwiYXVkIjoidGVzaXMtZnJvbnQiLCJpc3MiOiJ0ZXNpcy1hcGkifQ.Q_mUEcpPfRnmeikCrmypcOvpXqvMr-N8fgQTyMkxnLFihSdNzgIqsauAmKubz2CtWCNz2J5QrhZL5z5HNSxTpQ",
        "is_valid": true,
        "created_at": "2026-05-31T06:41:16.976Z",
        "updated_at": "2026-05-31T06:41:16.976Z",
        "deleted_at": null,
        "user_id": "2cce89df-87a0-4a1a-b96c-83b5f6062f5b"
    },
    {
        "id": "22d61ed4-586d-4603-b503-cb183c8aaae4",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2NlODlkZi04N2EwLTRhMWEtYjk2Yy04M2I1ZjYwNjJmNWIiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoidmlld2VyQGlvdC5jb20iLCJpYXQiOjE3ODAyNDk5MDAsImV4cCI6MTc4MDMzNjMwMCwiYXVkIjoidGVzaXMtZnJvbnQiLCJpc3MiOiJ0ZXNpcy1hcGkifQ.ek1Vk0h-WqDyLB5IJ743exoSd0hAdjPcw2s70E0Ycl8qRkWi47rfwBO_rye8wPeeRDYr8QYELtk7xaJgREseXA",
        "is_valid": true,
        "created_at": "2026-05-31T17:51:40.736Z",
        "updated_at": "2026-05-31T17:51:40.736Z",
        "deleted_at": null,
        "user_id": "2cce89df-87a0-4a1a-b96c-83b5f6062f5b"
    },
    {
        "id": "2835e0f4-24df-4e7f-8cf7-a5af894b0123",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4MDE2NDEzNiwiZXhwIjoxNzgwMjUwNTM2LCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.DfddQI0-vrtXe6Vuyke2sRJOqH4FknHcxpbJRIkZJlR6CZtC3sJcEVevv3YzKgVWubmOHfD5FjOqg2wkMitftg",
        "is_valid": true,
        "created_at": "2026-05-30T18:02:16.896Z",
        "updated_at": "2026-05-30T18:02:16.896Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "357fb90c-4c74-41dc-9cb0-f83dcf87d51a",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2NlODlkZi04N2EwLTRhMWEtYjk2Yy04M2I1ZjYwNjJmNWIiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoidmlld2VyQGlvdC5jb20iLCJpYXQiOjE3ODAxODAxMDEsImV4cCI6MTc4MDI2NjUwMSwiYXVkIjoidGVzaXMtZnJvbnQiLCJpc3MiOiJ0ZXNpcy1hcGkifQ.c0wi6KPc495QQupbx9TAvlAw_gYQaK86VhQMvu982HrZsI17yehxw_GOWeQ5-wUhaqX1E2KzQ5BIoqJC8-80Eg",
        "is_valid": true,
        "created_at": "2026-05-30T22:28:21.202Z",
        "updated_at": "2026-05-30T22:28:21.202Z",
        "deleted_at": null,
        "user_id": "2cce89df-87a0-4a1a-b96c-83b5f6062f5b"
    },
    {
        "id": "41454f9c-e3f1-42c2-be11-30eb6328dc33",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4MTY2MjAyMCwiZXhwIjoxNzgxNzQ4NDIwLCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.JWCt5YEscYvkMtwaWbywXXbzdp3GaoqbkEISoLKzkHQ5oumZDig7prTwZcuNAYJGeDpyU_6UPkDa3GeO3eCpIg",
        "is_valid": true,
        "created_at": "2026-06-17T02:07:00.479Z",
        "updated_at": "2026-06-17T02:07:00.479Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "56f6dbba-3185-46d8-b799-9a2de854cd45",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4Mzk1NzE2OSwiZXhwIjoxNzg0MDQzNTY5LCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.Tyf4l975Q3-5ct_deZ_m_LYHhZCnjRGCfa17EHCc1OYjJfEllczAvqUOkmJKtFmT5-Eq2j4qm_nCjtdfrVnyLg",
        "is_valid": true,
        "created_at": "2026-07-13T15:39:29.974Z",
        "updated_at": "2026-07-13T15:39:29.974Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "57b2d88c-9a18-4bd0-a4eb-cf7516b6b21a",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2NlODlkZi04N2EwLTRhMWEtYjk2Yy04M2I1ZjYwNjJmNWIiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoidmlld2VyQGlvdC5jb20iLCJpYXQiOjE3ODEwNjI2MTAsImV4cCI6MTc4MTE0OTAxMCwiYXVkIjoidGVzaXMtZnJvbnQiLCJpc3MiOiJ0ZXNpcy1hcGkifQ.plwoo5iAYWA_oNMVyos1uyDciW3iLZGshpoqk7jabn-CBMXAkIJOJDpjZFf153wSYSylx6l2EPErhjQZFHrgNA",
        "is_valid": true,
        "created_at": "2026-06-10T03:36:50.247Z",
        "updated_at": "2026-06-10T03:36:50.247Z",
        "deleted_at": null,
        "user_id": "2cce89df-87a0-4a1a-b96c-83b5f6062f5b"
    },
    {
        "id": "5d215314-b133-44af-8710-c3f8dd70516b",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4MzYyMjI2MiwiZXhwIjoxNzgzNzA4NjYyLCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.r0B6_kZin5MRqR5SjjLNgmgjQe23V8SH0GOpTjF7-M_WSHcGh5FNqF2b1AbHdEPrmHfG4bCgoYF41pNYcqYUTw",
        "is_valid": true,
        "created_at": "2026-07-09T18:37:42.216Z",
        "updated_at": "2026-07-09T18:37:42.216Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "68a680c4-335c-40a4-b802-f660e28bda0b",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2FjOWVmNC0yNmMwLTRkOTEtODE4My04NTc5ZjIwZmYxYjkiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoic3VwZXJhZG1pbkBpb3QuY29tIiwiaWF0IjoxNzgyMzQ4MTg4LCJleHAiOjE3ODI0MzQ1ODgsImF1ZCI6InRlc2lzLWZyb250IiwiaXNzIjoidGVzaXMtYXBpIn0.ciNpzO-unotzrKaLHfTrfzpb3R2zB8RAtaXvAQsRSescfZwkDPbqucg6zkqUIaFE9hV-hIiyp5LZgLAoxt4d5A",
        "is_valid": true,
        "created_at": "2026-06-25T00:43:08.228Z",
        "updated_at": "2026-06-25T00:43:08.228Z",
        "deleted_at": null,
        "user_id": "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
    },
    {
        "id": "72859a35-fe0c-4359-b81b-1fc4d3f74bcd",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2FjOWVmNC0yNmMwLTRkOTEtODE4My04NTc5ZjIwZmYxYjkiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoic3VwZXJhZG1pbkBpb3QuY29tIiwiaWF0IjoxNzgwMTgwMTk0LCJleHAiOjE3ODAyNjY1OTQsImF1ZCI6InRlc2lzLWZyb250IiwiaXNzIjoidGVzaXMtYXBpIn0.84PxZkk2u5vrD1jydOSKD0CGceg8tTx6LPJNgX0qIPRFddBYVxZGk5DZ2QklSavQTCbbkGeoBqTrJpKj4R2Cfg",
        "is_valid": true,
        "created_at": "2026-05-30T22:29:54.797Z",
        "updated_at": "2026-05-30T22:29:54.797Z",
        "deleted_at": null,
        "user_id": "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
    },
    {
        "id": "81687b38-8bdf-49ba-85aa-17f5c46a0cdd",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4Mzk3MTA1MiwiZXhwIjoxNzg0MDU3NDUyLCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.a13SptWvmVLZE4NKLxwS9zuTGiUpWFeXjqZbhBPD-McOiSj-m7UhOHrUnNaIizcfwcmFHwgzlHRPqNVcJqb0MQ",
        "is_valid": true,
        "created_at": "2026-07-13T19:30:52.432Z",
        "updated_at": "2026-07-13T19:30:52.432Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "8e253366-581e-426f-bc76-7448f0b34aed",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2FjOWVmNC0yNmMwLTRkOTEtODE4My04NTc5ZjIwZmYxYjkiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoic3VwZXJhZG1pbkBpb3QuY29tIiwiaWF0IjoxNzgxMzg1ODc1LCJleHAiOjE3ODE0NzIyNzUsImF1ZCI6InRlc2lzLWZyb250IiwiaXNzIjoidGVzaXMtYXBpIn0.Ye46GBJU635Ej0AkV9i-_6hWevM2n5alPILhyKrpuA4otZzfZbykU9nm3flYlwF3nYLrFItAk5Xe-4SoZ3358Q",
        "is_valid": true,
        "created_at": "2026-06-13T21:24:35.547Z",
        "updated_at": "2026-06-13T21:24:35.547Z",
        "deleted_at": null,
        "user_id": "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
    },
    {
        "id": "913d26c9-2743-4ad5-9220-fe164c7f243f",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4Mzk4MDk4NCwiZXhwIjoxNzg0MDY3Mzg0LCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.7tBhlgL979ZzyikeOePlDn6x614RODFhuRr6bloZq7scp9JcvUAeU7ffuekYXbt3OuWZ6hrk9qX8xxb1BZgzHg",
        "is_valid": true,
        "created_at": "2026-07-13T22:16:24.889Z",
        "updated_at": "2026-07-13T22:16:24.889Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "91841d52-ec4d-442d-9a6d-1fac6b326b0b",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4Mzk1MTc1MCwiZXhwIjoxNzg0MDM4MTUwLCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.hfqxwJAIXNe0LOrRxDnNihDxi7ZewLi4uPd7ANJWNKa7zpZa2UqBXah7zZ4JsXV1D6ldlAxPMfSqzK_HMd7eTg",
        "is_valid": true,
        "created_at": "2026-07-13T14:09:10.714Z",
        "updated_at": "2026-07-13T14:09:10.714Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "9c3934f3-0e04-4a9a-8627-50cf8bcfa4bc",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4Mzk1NzIxMCwiZXhwIjoxNzg0MDQzNjEwLCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.ctbAKf1DfBZ00siBnrXbeIb0iSdTw7T7lWQKP1aka_NtiklXJGvg8i2FGj3MfCev1SrxLH8qBGWZXxPT8nYWdw",
        "is_valid": true,
        "created_at": "2026-07-13T15:40:10.468Z",
        "updated_at": "2026-07-13T15:40:10.468Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "a0c3e542-7ccc-4452-bd1a-3a1ae936d3f4",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNGNhZDAwMC0xNzk2LTQzMDUtOTNjZi0yZGJlMDVhYzg2ZDgiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoiYWRtaW5AaW90LmNvbSIsImlhdCI6MTc4Mzk1OTU4NywiZXhwIjoxNzg0MDQ1OTg3LCJhdWQiOiJ0ZXNpcy1mcm9udCIsImlzcyI6InRlc2lzLWFwaSJ9.knUEl01tdsr5Ngei8TjPC8UkksJ6X5LTBflp7UZT0Yn2daBNduI9tgph2d7eNTWV9CWzbTfNqcaLzG-VkHuTIA",
        "is_valid": true,
        "created_at": "2026-07-13T16:19:47.864Z",
        "updated_at": "2026-07-13T16:19:47.864Z",
        "deleted_at": null,
        "user_id": "14cad000-1796-4305-93cf-2dbe05ac86d8"
    },
    {
        "id": "a6de51a5-9f9e-4528-91da-64d8449e1ab3",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2NlODlkZi04N2EwLTRhMWEtYjk2Yy04M2I1ZjYwNjJmNWIiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoidmlld2VyQGlvdC5jb20iLCJpYXQiOjE3ODAyNDY3ODEsImV4cCI6MTc4MDMzMzE4MSwiYXVkIjoidGVzaXMtZnJvbnQiLCJpc3MiOiJ0ZXNpcy1hcGkifQ._nJ7JEXCs6HvvYKREhHJ1RY5oqF1K_qD3cAlCJcmsunjmPc2bWi7X417B9jOQnxG1BSHpIgYBvEB10-gDUcRxg",
        "is_valid": true,
        "created_at": "2026-05-31T16:59:41.520Z",
        "updated_at": "2026-05-31T16:59:41.520Z",
        "deleted_at": null,
        "user_id": "2cce89df-87a0-4a1a-b96c-83b5f6062f5b"
    },
    {
        "id": "cb852110-8f3e-495a-93d6-02ee14c842d9",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2NlODlkZi04N2EwLTRhMWEtYjk2Yy04M2I1ZjYwNjJmNWIiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoidmlld2VyQGlvdC5jb20iLCJpYXQiOjE3ODAxOTE5ODUsImV4cCI6MTc4MDI3ODM4NSwiYXVkIjoidGVzaXMtZnJvbnQiLCJpc3MiOiJ0ZXNpcy1hcGkifQ.P6IdyR00B8dXPe5a7Do59J9ofqCv-9uMENvInKnQ-nqVIYGCGsWR5zHxGLRf_ebn3z9oy-BUwWOupt6PBvIuwg",
        "is_valid": true,
        "created_at": "2026-05-31T01:46:25.299Z",
        "updated_at": "2026-05-31T01:46:25.299Z",
        "deleted_at": null,
        "user_id": "2cce89df-87a0-4a1a-b96c-83b5f6062f5b"
    },
    {
        "id": "eda612c8-e2c4-44a3-8489-08a1c2bcf0bb",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2FjOWVmNC0yNmMwLTRkOTEtODE4My04NTc5ZjIwZmYxYjkiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoic3VwZXJhZG1pbkBpb3QuY29tIiwiaWF0IjoxNzgwMzcxMjk1LCJleHAiOjE3ODA0NTc2OTUsImF1ZCI6InRlc2lzLWZyb250IiwiaXNzIjoidGVzaXMtYXBpIn0.-mUIfmOnliMUxLRg_9GdilmrJev533Ont1KZp5j9K2v5bj3ZiIO3rZPOajNo2EC-kWtjhmfKHvipXwn5acb4Tg",
        "is_valid": true,
        "created_at": "2026-06-02T03:34:55.483Z",
        "updated_at": "2026-06-02T03:34:55.483Z",
        "deleted_at": null,
        "user_id": "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
    },
    {
        "id": "f31c4604-b351-4e26-9b5d-0944fb28562b",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2FjOWVmNC0yNmMwLTRkOTEtODE4My04NTc5ZjIwZmYxYjkiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoic3VwZXJhZG1pbkBpb3QuY29tIiwiaWF0IjoxNzgxNjY3MzkxLCJleHAiOjE3ODE3NTM3OTEsImF1ZCI6InRlc2lzLWZyb250IiwiaXNzIjoidGVzaXMtYXBpIn0.5Z8JILeRUN--38DoVmH_JSHp0BwwOvWbaIkH13kHl3Zp9Kqo3Ei3T3QqEHIkb6dfcEG0xpqZ5H4rBkAHVXazaQ",
        "is_valid": true,
        "created_at": "2026-06-17T03:36:31.044Z",
        "updated_at": "2026-06-17T03:36:31.044Z",
        "deleted_at": null,
        "user_id": "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
    },
    {
        "id": "fe842fd5-38c3-4bda-989d-750ba6813cf4",
        "content": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2FjOWVmNC0yNmMwLTRkOTEtODE4My04NTc5ZjIwZmYxYjkiLCJ0eXBlIjoidXNlciIsImVtYWlsIjoic3VwZXJhZG1pbkBpb3QuY29tIiwiaWF0IjoxNzgwMjQ2ODI4LCJleHAiOjE3ODAzMzMyMjgsImF1ZCI6InRlc2lzLWZyb250IiwiaXNzIjoidGVzaXMtYXBpIn0.3mbqLrHSsuBrXMUPp-0XGEDby9J_ofFDiWGVuK7LBGXc1Ha_jgFr9KiyuBYrK09GFF1Vsh70cpKFLOyfVQSZ4Q",
        "is_valid": true,
        "created_at": "2026-05-31T17:00:28.814Z",
        "updated_at": "2026-05-31T17:00:28.814Z",
        "deleted_at": null,
        "user_id": "77ac9ef4-26c0-4d91-8183-8579f20ff1b9"
    }
],
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "tokens",
            null,
            {}
        );

    }

};
