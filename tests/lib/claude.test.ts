import { describe, it, expect } from "vitest";
import { enhanceTask } from "@/lib/claude";

describe("enhanceTask", () => {
  it("devuelve una descripción mejorada", async () => {
    const result = await enhanceTask("Comprar leche", "");
    expect(result.improved).toContain("Comprar leche");
    expect(result.priority).toMatch(/^(alta|media|baja)$/);
  });

  it("mantiene la descripción existente si hay una", async () => {
    const result = await enhanceTask("Tarea", "Descripción original");
    expect(result.improved).toContain("Descripción original");
  });
});
