import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types/task";

const mockTask: Task = {
  id: "1",
  title: "Tarea de prueba",
  description: "Descripción de prueba",
  priority: "alta",
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({ json: async () => ({}) });
});

describe("TaskCard", () => {
  it("muestra el título de la tarea", () => {
    render(<TaskCard task={mockTask} onUpdate={vi.fn()} />);
    expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();
  });

  it("muestra la prioridad con el color correcto", () => {
    render(<TaskCard task={mockTask} onUpdate={vi.fn()} />);
    expect(screen.getByText("alta")).toBeInTheDocument();
  });

  it("llama onUpdate al hacer click en eliminar", async () => {
    const onUpdate = vi.fn();
    render(<TaskCard task={mockTask} onUpdate={onUpdate} />);
    fireEvent.click(screen.getByText("Eliminar"));
    await vi.waitFor(() => expect(onUpdate).toHaveBeenCalled());
  });
});
