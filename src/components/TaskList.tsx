"use client";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

type Filter = "todas" | "pendientes" | "completadas";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("todas");
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => { fetchTasks(); }, []);

  const filtered = tasks.filter((t) => {
    if (filter === "pendientes") return !t.completed;
    if (filter === "completadas") return t.completed;
    return true;
  });

  const filterBtns: Filter[] = ["todas", "pendientes", "completadas"];

  return (
    <div>
      <TaskForm onCreated={fetchTasks} />
      <div className="flex gap-2 mb-4">
        {filterBtns.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm px-3 py-1 rounded-full capitalize transition ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="text-sm text-gray-400 text-center py-8">Cargando tareas...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No hay tareas en esta vista.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
          ))}
        </div>
      )}
    </div>
  );
}
