import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enhanceTask } from "@/lib/claude";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
  }

  const result = await enhanceTask(task.title, task.description);

  const updated = await prisma.task.update({
    where: { id },
    data: { description: result.improved, priority: result.priority },
  });

  return NextResponse.json(updated);
}
