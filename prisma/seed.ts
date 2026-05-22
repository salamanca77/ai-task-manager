import { PrismaClient } from "../src/generated/prisma/client.ts";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.task.count();
  if (count > 0) {
    console.log("Base de datos ya tiene datos, seed omitido");
    return;
  }
  await prisma.task.createMany({
    data: [
      { title: "Configurar entorno de desarrollo", description: "Instalar Node.js, Git y VS Code", priority: "alta", completed: true },
      { title: "Aprender Next.js App Router", description: "Revisar documentación oficial y ejemplos", priority: "alta" },
      { title: "Practicar Claude Code", description: "Explorar skills, hooks y MCP", priority: "media" },
      { title: "Escribir tests con Vitest", priority: "media" },
      { title: "Subir proyecto a GitHub", priority: "baja" },
    ],
  });
  console.log("Seed completado: 5 tareas insertadas");
}

main().finally(() => prisma.$disconnect());
