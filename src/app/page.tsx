import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Task Manager</h1>
        <p className="text-sm text-gray-400 mb-6">Gestiona tus tareas con ayuda de IA</p>
        <TaskList />
      </div>
    </main>
  );
}
