// Seed usando SQLite directamente (compatible con Prisma v7 sin compilar)
import { createRequire } from "module";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const Database = require("better-sqlite3");
const db = new Database(join(__dirname, "dev.db"));

const tasks = [
  { title: "Configurar entorno de desarrollo", description: "Instalar Node.js, Git y VS Code", priority: "alta", completed: 1 },
  { title: "Aprender Next.js App Router", description: "Revisar documentación oficial y ejemplos", priority: "alta", completed: 0 },
  { title: "Practicar Claude Code", description: "Explorar skills, hooks y MCP", priority: "media", completed: 0 },
  { title: "Escribir tests con Vitest", description: "", priority: "media", completed: 0 },
  { title: "Subir proyecto a GitHub", description: "", priority: "baja", completed: 0 },
];

const insert = db.prepare(`
  INSERT INTO Task (id, title, description, priority, completed, createdAt, updatedAt)
  VALUES (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-' || lower(hex(randomblob(2))) || '-' || lower(hex(randomblob(2))) || '-' || lower(hex(randomblob(6))),
    @title, @description, @priority, @completed, datetime('now'), datetime('now'))
`);

const count = db.prepare("SELECT COUNT(*) as n FROM Task").get();
if (count.n === 0) {
  for (const t of tasks) insert.run(t);
  console.log("Seed completado:", tasks.length, "tareas insertadas");
} else {
  console.log("Base de datos ya tiene datos, seed omitido");
}

db.close();
