import { Priority } from "@/types/task";

export interface EnhanceResult {
  improved: string;
  priority: Priority;
}

// Mock de Claude API — sin consumir tokens reales
export async function enhanceTask(
  title: string,
  description: string
): Promise<EnhanceResult> {
  await new Promise((r) => setTimeout(r, 800));

  const priorities: Priority[] = ["alta", "media", "baja"];
  const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];

  const improved = description
    ? `${description} — revisado y optimizado con criterios claros de aceptación.`
    : `Completar "${title}" definiendo objetivos concretos, criterios de éxito y fecha límite estimada.`;

  return { improved, priority: randomPriority };
}
