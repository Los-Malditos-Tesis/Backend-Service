import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import sequelize from "../src/libs/database/sequelize.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIGRATIONS_PATH = path.join(__dirname, "../migrations");

async function runMigrations() {
  try {
    console.log("Ejecutando migraciones...");

    await sequelize.authenticate();

    const files = fs
      .readdirSync(MIGRATIONS_PATH)
      .filter((file) => file.endsWith(".js"))
      .sort();

    for (const file of files) {
      const filePath = pathToFileURL(
        path.join(MIGRATIONS_PATH, file)
      ).href;

      const migration = await import(filePath);

      const migrationObject = migration.default || migration;

      console.log(`Ejecutando: ${file}`);

      await migrationObject.up(
        sequelize.getQueryInterface(),
        sequelize.constructor
      );
    }

    console.log("Migraciones ejecutadas correctamente");

    await sequelize.close();

  } catch (error) {
    console.error("Error ejecutando migraciones:", error);
    process.exit(1);
  }
}

runMigrations();
