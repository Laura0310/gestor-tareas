import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import { toast } from "sonner";
import { Task } from "../types/task";

const useTasks = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    TO_DO: [],
    IN_PROGRESS: [],
    DONE: [],
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const getDownloadTasks = async (format: "json" | "csv") => {
    try {
      const response = await axiosInstance.get(`/tasks/download/${format}`, {
        responseType: "blob",
        headers: {
          Accept: format === "json" ? "application/json" : "text/csv",
          "Content-Type": format === "json" ? "application/json" : "text/csv",
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tareas.${format}`);

      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error descargando tareas en formato ${format}:`, error);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsNewTask(false);
    setModalOpen(true);
  };

  const handleNewTask = () => {
    setSelectedTask({ id: "", title: "", description: "", status: "TO_DO", createdAt: "" });
    setIsNewTask(true);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      getTasks();
      toast.success("Task deleted!");
    } catch (error) {
      console.error("Error deleting task", error);
      toast.error("Error deleting task!");
    }
  };

  const handleSaveTask = async () => {
    if (!selectedTask) return;
    setLoading(true);
    try {
      if (isNewTask) {
        await axiosInstance.post(`/tasks`, selectedTask);
      } else {
        await axiosInstance.put(`/tasks/${selectedTask.id}`, selectedTask);
      }
      setLoading(false);
      setModalOpen(false);
      getTasks();
    } catch (error) {
      setLoading(false);
      console.error("Error saving task", error);
      toast("Error creating task!");
    }
  };

  return {
    tasks,
    selectedTask,
    modalOpen,
    isNewTask,
    setModalOpen,
    handleEdit,
    handleNewTask,
    handleDelete,
    handleSaveTask,
    setSelectedTask,
    getDownloadTasks,
    loading,
  };
};

export default useTasks;
