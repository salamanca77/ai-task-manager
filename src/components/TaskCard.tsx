"use client";
import { useState } from "react";
import { Task } from "@/types/task";

const priorityColors = {
  alta: "bg-red-100 text-red-700",
  media: "bg-yellow-100 text-yellow-700",
  baja: "bg-green-100 text-green-700",
};

interface Props {
  task: Task;
  onUpdate: () => void;
}

export default function TaskCard({ task, onUpdate }: Props) {
  const [enhancing, setEnhancing] = useState(false);

  async function toggleComplete() {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    onUpdate();
  }

  async function handleDelete() {
    await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    onUpdate();
  }

  async function handleEnhance() {
    setEnhancing(true);
    await fetch(`/api/tasks/${task.id}/enhance`, { method: "POST" });
    setEnhancing(false);
    onUpdate();
  }

  return (
    <div className={`bg-white rounded-xl shadow p-4 space-y-2 ${task.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className="w-4 h-4 accent-blue-500 shrink-0"
          />
          <span className={`text-sm font-medium truncate ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
            {task.title}
          </span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="text-xs text-gray-500 pl-6">{task.description}</p>
      )}
      <div className="flex gap-2 pl-6 pt-1">
        <button
          onClick={handleEnhance}
          disabled={enhancing}
          className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-2 py-1 rounded-lg transition disabled:opacity-50"
        >
          {enhancing ? "Mejorando..." : "Mejorar con IA"}
        </button>
        <button
          onClick={handleDelete}
          className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-lg transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
