import { Request, Response } from "express";
import prisma from "../db/client";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TO_DO",
        user: { connect: { id: req.user.id } },
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });

    const groupedTasks = {
      TO_DO: tasks.filter((task) => task.status === "TO_DO"),
      IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
      DONE: tasks.filter((task) => task.status === "DONE"),
    };

    res.status(200).json(groupedTasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    const task = await prisma.task.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (!task) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error al buscar la tarea:", error);
    res.status(500).json({ message: "Tarea no encontrada" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    // Check if task exists and belongs to user
    const taskExists = await prisma.task.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (!taskExists) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    const taskExists = await prisma.task.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (!taskExists) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    await prisma.task.delete({
      where: { id },
    });

    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

export const exportTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    // Obtener formato desde parámetros
    const format = req.params.format?.toLowerCase();
    if (format !== "json" && format !== "csv") {
      res.status(400).json({ message: "Formato no válido. Use 'json' o 'csv'" });
      return;
    }

    // Obtener tareas del usuario
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });

    // Calcular métricas
    const totalTasks = tasks.length;
    const todoTasks = tasks.filter((task) => task.status === "TO_DO").length;
    const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS").length;
    const doneTasks = tasks.filter((task) => task.status === "DONE").length;

    if (format === "json") {
      // Crear estructura de datos con tareas y métricas
      const exportData = {
        metrics: {
          totalTasks,
          todoTasks,
          inProgressTasks,
          doneTasks,
          completionPercentage: totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0,
        },
        tasks,
      };

      // Configurar headers para JSON
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", "attachment; filename=tareas.json");

      // Enviar datos como JSON
      res.status(200).json(exportData);
    } else {
      // Convertir tareas a CSV
      const taskHeaders = ["id", "title", "description", "status", "createdAt", "updatedAt"];
      const metricsData = [
        ["MÉTRICAS", "", "", "", "", ""],
        ["Total de tareas", totalTasks.toString(), "", "", "", ""],
        ["Tareas pendientes", todoTasks.toString(), "", "", "", ""],
        ["Tareas en progreso", inProgressTasks.toString(), "", "", "", ""],
        ["Tareas completadas", doneTasks.toString(), "", "", "", ""],
        ["Porcentaje de completado", totalTasks > 0 ? `${Math.round((doneTasks / totalTasks) * 100)}%` : "0%", "", "", "", ""],
        ["", "", "", "", "", ""], // Línea vacía para separar
        ["TAREAS", "", "", "", "", ""],
      ];

      let csvContent = "";

      // Añadir sección de métricas
      metricsData.forEach((row) => {
        csvContent += row.join(",") + "\n";
      });

      // Añadir encabezados de tareas
      csvContent += taskHeaders.join(",") + "\n";

      // Añadir datos de tareas
      tasks.forEach((task) => {
        const row = [
          task.id,
          `"${(task.title || "").replace(/"/g, '""')}"`, // Escapar comillas
          `"${(task.description || "").replace(/"/g, '""')}"`,
          task.status,
          task.createdAt ? new Date(task.createdAt).toISOString() : "",
          task.updatedAt ? new Date(task.updatedAt).toISOString() : "",
        ];
        csvContent += row.join(",") + "\n";
      });

      // Configurar headers para CSV
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=tareas.csv");

      // Enviar CSV
      res.status(200).send(csvContent);
    }
  } catch (error) {
    console.error("Error al exportar tareas:", error);
    res.status(500).json({ message: "Error al exportar tareas" });
  }
};
