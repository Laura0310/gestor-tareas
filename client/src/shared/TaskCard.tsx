import React from 'react';
import { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    return (
        <div className="flex flex-col gap-2 p-4 mb-2 bg-white border border-gray-600/50 rounded-xl shadow">
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-sm font-semibold">{task.title}</h3>
                <div className="flex flex-row gap-2">
                    <button
                        aria-label="Editar tarea"
                        className="bg-transparent border-0 p-0"
                        onClick={() => onEdit(task)}
                    >
                        <i className="fa fa-regular fa-edit text-gray-600/50 cursor-pointer text-sm hover:text-violet-500" />
                    </button>
                    <button
                        aria-label="Eliminar tarea"
                        className="bg-transparent border-0 p-0"
                        onClick={() => onDelete(task.id)}
                    >
                        <i className="fa fa-solid fa-trash text-gray-600/50 cursor-pointer text-sm hover:text-red-500" />
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-700">
                Creada: {new Date(task.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
};

export default TaskCard;