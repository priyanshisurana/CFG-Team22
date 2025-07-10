"use client";

import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export default function TasksPage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <p>Create and view your to-do items using the Flask API.</p>

      <input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter new task"
        className="border px-3 py-2 rounded w-full max-w-xs"
      />
      <button
        onClick={addTask}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add Task
      </button>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-3 border rounded-md ${
              task.done 
                ? "bg-green-50 border-green-200" 
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <span className="flex-1 text-gray-800">
              {task.title} - {task.done ? "Complete" : "Pending"}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-4 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
