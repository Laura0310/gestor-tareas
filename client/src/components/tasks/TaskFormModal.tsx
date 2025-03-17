import React from 'react';
import Modal from '../../shared/Modal';
import Button from '../../shared/Button';
import Loader from '../../shared/Loader';
import CustomSelect from '../../shared/TaskList';
import { Task } from '../../types/task';

interface TaskFormModalProps {
    isOpen: boolean;
    isNewTask: boolean;
    selectedTask: Task | null;
    loading: boolean;
    onClose: () => void;
    onSave: () => void;
    setSelectedTask: (task: Task) => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
    isOpen,
    isNewTask,
    selectedTask,
    loading,
    onClose,
    onSave,
    setSelectedTask
}) => {
    const statusOptions = [
        { value: 'TO_DO', label: 'Pendiente' },
        { value: 'IN_PROGRESS', label: 'En progreso' },
        { value: 'DONE', label: 'Completado' }
    ];

    return (
        <Modal isOpen={isOpen} title={isNewTask ? 'Nueva Tarea' : 'Editar Tarea'} onClose={onClose}>
            <label className='text-sm mb-1 block'>Título</label>
            <input
                type='text'
                className='p-2 border rounded w-full mb-3'
                value={selectedTask?.title || ''}
                onChange={(e) => setSelectedTask({ ...selectedTask!, title: e.target.value })}
            />
            <label className='text-sm mb-1 block'>Descripción</label>
            <textarea
                className='p-2 border rounded w-full mb-3'
                value={selectedTask?.description || ''}
                onChange={(e) => setSelectedTask({ ...selectedTask!, description: e.target.value })}
            />

            <CustomSelect
                label="Estado"
                options={statusOptions}
                value={selectedTask?.status || 'TO_DO'}
                onChange={(value) => setSelectedTask({ ...selectedTask!, status: value as Task['status'] })}
            />

            {loading ? (
                <Loader />
            ) : (
                    <div className='flex gap-2 mt-5'>
                        <Button onClick={onSave} className='bg-violet-800 hover:bg-violet-900 w-1/2 text-white'>
                            Guardar
                    </Button>
                        <Button onClick={onClose} className='w-1/2 text-violet-400 hover:text-violet-500'>
                            Cancelar
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default TaskFormModal;