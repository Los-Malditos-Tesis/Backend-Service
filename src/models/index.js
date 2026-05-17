import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "../libs/database/sequelize.config.js";
import { registerAuditHooks } from "../repositories/audit_repository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

const files = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"));

for (const file of files) {
  const modelModule = await import(`./${file}`);
  const model = modelModule.default(sequelize);
  db[model.name] = model;
}

// Ejecutar asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
registerAuditHooks(sequelize, db);

export default db;
