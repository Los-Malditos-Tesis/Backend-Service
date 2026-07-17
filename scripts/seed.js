import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

import db from "../src/models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queryInterface = db.sequelize.getQueryInterface();

const seedersPath = path.resolve(__dirname, "../seeders");

const seeders = fs
  .readdirSync(seedersPath)
  .filter((file) => file.endsWith(".js"))
  .sort();

const runSeeders = async () => {
  try {
    console.log("Ejecutando seeders...");

    for (const file of seeders) {
      const seederPath = pathToFileURL(
        path.join(seedersPath, file)
      );

      const { default: seeder } = await import(seederPath);

      await seeder.up(queryInterface);

      console.log(`✓ ${file} ejecutado`);
    }

    console.log("Seeders completados correctamente");
  } catch (error) {
    console.error("Error ejecutando seeders:", error);
    process.exitCode = 1;
  } finally {
    await db.sequelize.close();
  }
};

runSeeders();
