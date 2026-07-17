import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import db from "../src/models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "../seeders");


if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}


function toSnakeCase(value) {
    return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}


function getJsonFields(model) {

    return Object.entries(model.rawAttributes)
        .filter(([_, attribute]) => {

            const type =
                attribute.type.key ||
                attribute.type.constructor.key;

            return (
                type === "JSON" ||
                type === "JSONB"
            );
        })
        .map(([name]) => name);
}


function transformRows(rows, model) {

    const jsonFields = getJsonFields(model);

    console.log(
        `JSON fields ${model.tableName}:`,
        jsonFields
    );


    return rows.map(row => {

        const result = {};


        Object.entries(row).forEach(([key, value]) => {

            const newKey = toSnakeCase(key);


            if (jsonFields.includes(key)) {

                result[newKey] = value;

            } else {

                result[newKey] = value;

            }

        });


        return result;

    });
}


function serialize(data) {

    return JSON.stringify(
        data,
        (key, value) => {

            if (value instanceof Date) {
                return value.toISOString();
            }

            return value;

        },
        4
    );

}



const models = Object.values(db)
    .filter(
        model =>
            model &&
            typeof model.findAll === "function" &&
            model.tableName
    )
    .sort((a, b) => {


        // Audits siempre al final
        if (a.tableName === "audits") {
            return 1;
        }


        if (b.tableName === "audits") {
            return -1;
        }


        return a.tableName.localeCompare(
            b.tableName
        );

    });



console.log(
    `\nEncontrados ${models.length} modelos\n`
);



let index = 1;


for (const model of models) {


    console.log(
        `Exportando ${model.tableName}...`
    );


    let order = [];


    if (model.rawAttributes.id) {

        order = [
            ["id", "ASC"]
        ];

    }



    const rows = await model.findAll({
        raw: true,
        order
    });



    const data = transformRows(
        rows,
        model
    );



    const filename =
        `${String(index).padStart(3,"0")}_${model.tableName}.js`;



    const content =
`export default {

    async up(queryInterface) {

        await queryInterface.bulkInsert(
            "${model.tableName}",
            ${serialize(data)},
            {}
        );

    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            "${model.tableName}",
            null,
            {}
        );

    }

};
`;



    fs.writeFileSync(
        path.join(
            OUTPUT_DIR,
            filename
        ),
        content
    );



    console.log(
        `✓ ${filename} generado (${rows.length} registros)`
    );


    index++;

}



console.log(
    "\nTodos los seeders fueron generados correctamente."
);



await db.sequelize.close();
