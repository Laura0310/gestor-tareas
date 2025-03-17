
import useTasks from '../../hooks/useTasks';
import useTaskCounts from '../../hooks/useTaskCounts';
import NavBar from '../../layouts/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../../shared/Button';
import TaskFormModal from './TaskFormModal';
import ProgressBar from '../../shared/ProgressBar';
import TaskCard from '../../shared/TaskCard';
import DownloadButton from '../../shared/DownloadButton';

const Tasks = (): JSX.Element => {
    const { user } = useSelector((state: RootState) => state.auth);
    const {
        tasks,
        selectedTask,
        modalOpen,
        isNewTask,
        setModalOpen,
        handleEdit,
        handleNewTask,
        getDownloadTasks,
        handleDelete,
        handleSaveTask,
        setSelectedTask,
        loading,
    } = useTasks();
    const taskCounts = useTaskCounts(tasks);

    const statusStyles: { [key: string]: { bgColor: string; borderColor: string; icon: string } } = {
        'TO_DO': { bgColor: 'bg-red-600/20', borderColor: 'border-red-600', icon: 'fa-solid fa-list' },
        'IN_PROGRESS': { bgColor: 'bg-yellow-600/20', borderColor: 'border-yellow-600', icon: 'fa-solid fa-spinner' },
        DONE: { bgColor: 'bg-green-600/20', borderColor: 'border-green-600', icon: 'fa-solid fa-check-circle' },
    };

    const statusLabels: { [key: string]: string } = {
        'TO_DO': 'PENDIENTE',
        'IN_PROGRESS': 'EN PROGRESO',
        'DONE': 'COMPLETADO',
    };

    const hasTasks = Object.values(tasks).some((taskList) => taskList.length > 0);

    return (
        <div className='flex flex-col items-center justify-center p-4 gap-4 pt-20 min-h-screen h-auto'>
            <NavBar />
            <div className='flex flex-col gap-3 rounded-xl p-4 bg-white h-full min-h-[400px] w-full shadow'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col item-center justify-start'>
                        <h1 className='text-xl text-black/90'>{`Hola, ${user ? user.name : 'Usuario'}`}</h1>
                        <p className='text-sm text-black/80'>aquí están tus tareas</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <DownloadButton
                            onDownload={getDownloadTasks}
                            className=""
                        />
                        <Button
                            onClick={handleNewTask}
                            className='flex flex-row items-center gap-2 mb-4 text-white bg-violet-500 hover:bg-violet-600'
                        >
                            Añadir tarea
                            <i className='fa fa-solid fa-plus' />
                        </Button>
                    </div>
                </div>

                {hasTasks && (
                    <ProgressBar
                        completed={taskCounts['DONE'] || 0}
                        total={Object.values(taskCounts).reduce((sum, count) => sum + count, 0)}
                    />
                )}
                {hasTasks ? (
                    <div className='grid sm:grid-cols-3 gap-4 w-full mx-auto grid-cols-1'>
                        {Object.keys(tasks).map((status) => (
                            <div
                                key={status}
                                className={`p-4 border ${statusStyles[status].bgColor} ${statusStyles[status].borderColor} rounded-xl min-h-[300px]`}
                            >
                                <div className='flex flex-row gap-2 items-center mb-2 justify-between'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <i className={`fa ${statusStyles[status].icon} text-center`} />
                                        <h2 className='text-base text-center'>{statusLabels[status]}</h2>
                                    </div>
                                    <span className='bg-white text-xs font-medium px-2 py-1 rounded-full shadow-sm'>{taskCounts[status]}</span>
                                </div>
                                {tasks[status].map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                        <div className='flex flex-col items-center justify-center w-full flex-1'>
                        <i className='fa fa-regular fa-folder-open text-gray-600 text-3xl' />
                            <p className='text-sm text-gray-500'>Aún no tienes tareas.</p>
                    </div>
                )}
            </div>
            <TaskFormModal
                isOpen={modalOpen}
                isNewTask={isNewTask}
                selectedTask={selectedTask}
                loading={loading}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveTask}
                setSelectedTask={setSelectedTask}
            />
        </div>
    );
};

export default Tasks;