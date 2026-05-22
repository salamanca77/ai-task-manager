import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "El título es requerido" }, { status: 400 });
  }
  const task = await prisma.task.create({
    data: {
      title: body.title.trim(),
      description: body.description ?? "",
      priority: body.priority ?? "media",
    },
  });
  return NextResponse.json(task, { status: 201 });
}
