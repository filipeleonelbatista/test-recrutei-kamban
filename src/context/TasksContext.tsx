import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useLoader } from "@/hooks/useLoader";

export type TaskStatus = "doing" | "developed" | "development" | "backlog";

export interface Task {
  id: string;
  date: string;
  title: string;
  status: TaskStatus;
  description: string;
  responsible: string[];
}

export interface TaskContextType {
  tasks: Task[];
  createTask: (task: Task) => void;
  readTask: (id: string) => Task | undefined;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    const loadTasks = () => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const executeAsync = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.npoint.io/21c80c25ed65b6f3484f');
        const fetchedTasks: Task[] = response.data;

        const storedTasksString = localStorage.getItem("tasks");
        const storedTasks = storedTasksString ? JSON.parse(storedTasksString) : [];

        const updatedTasks = [...storedTasks];
        fetchedTasks.forEach((fetchedTask) => {
          const existingTaskIndex = updatedTasks.findIndex(task => task.id === fetchedTask.id);
          if (existingTaskIndex !== -1) {
            updatedTasks[existingTaskIndex] = fetchedTask;
          } else {
            updatedTasks.push(fetchedTask);
          }
        });

        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    executeAsync();
  }, []);

  const createTask = (task: Task) => {
    setLoading(true);
    setTasks((prevTasks) => [...prevTasks, task]);
    setLoading(false);
  };

  const readTask = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const updateTask = (updatedTask: Task) => {
    setLoading(true);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setLoading(false);
  };

  const deleteTask = (id: string) => {
    setLoading(true);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setLoading(false);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, readTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
