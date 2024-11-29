"use client";
import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskInput.trim(), completed: false },
      ]);
      setTaskInput("");
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Chores ToDo List
        </h1>
        <ul className="space-y-3 mb-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-5 w-5 text-blue-500 rounded "
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-500" : "text-white"
                  } text-base`}
                >
                  {task.text}
                </span>
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-transparent border border-white text-red-500 p-1 rounded hover:bg-red-500 hover:border-transparent hover:text-white transition-colors"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
        <div className="text-sm text-white text-center font-bold mb-8 mt-4">
          Done: {tasks.filter((task) => task.completed).length}
        </div>
        <div>
          <p className="text-sm text-white text-start  text-[12px] mb-1">
            Add task
          </p>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            ADD TASK
          </button>
        </div>
      </div>
    </div>
  );
}
