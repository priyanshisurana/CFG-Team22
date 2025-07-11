"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export default function TasksPage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const t = useTranslations("TasksPage");

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(
        "Error fetching tasks:",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  };

  const addTask = async () => {
    try {
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle }),
      });
      setTaskTitle("");
      fetchTasks();
    } catch (err) {
      console.error(
        "Error adding task:",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (err) {
      console.error(
        "Error deleting task:",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  };

  const toggleTask = async (id: number, done: boolean) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
      });
      fetchTasks();
    } catch (err) {
      console.error(
        "Error updating task:",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="p-6 space-y-4">
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>

      <div className="flex gap-2">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder={t("newTask")}
          className="border px-3 py-2 rounded flex-1 max-w-xs"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t("addTask")}
        </button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500">{t("noTasks")}</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="border p-3 rounded flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={(e) => toggleTask(task.id, e.target.checked)}
                  className="w-4 h-4"
                />
                <span className={task.done ? "line-through text-gray-500" : ""}>
                  {task.title}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.done
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.done ? t("completed") : t("pending")}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                {t("delete")}
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
