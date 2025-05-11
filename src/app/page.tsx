'use client'
import { useState, useEffect } from 'react';

export default function TaskFlow() {
    const [darkMode, setDarkMode] = useState(false);

    const [statusFilter, setStatusFilter] = useState('Todas');
    const [priorityFilter, setPriorityFilter] = useState('Todas');

    const [showModal, setShowModal] = useState(false);

    const [tasks, setTasks] = useState([
        { id: 1, title: 'Trabalho Tailwind', priority: 'Alta', status: 'Concluído' },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('Alta');
    const [newTaskStatus, setNewTaskStatus] = useState('Pendente');

    useEffect(() => {
        darkMode
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark');
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const addNewTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            priority: newTaskPriority,
            status: newTaskStatus,
        };

        setTasks([...tasks, newTask]);

        setNewTaskTitle('');
        setNewTaskPriority('Alta');
        setNewTaskStatus('Pendente');
        setShowModal(false);
    };

    const filteredTasks = tasks.filter(task =>
        (statusFilter === 'Todas' || task.status === statusFilter) &&
        (priorityFilter === 'Todas' || task.priority === priorityFilter)
    );

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>

            <header className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md flex justify-between">
                <h1 className="text-xl font-bold">TaskFlow</h1>
                <button onClick={toggleDarkMode} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    {darkMode ? 'Modo Claro' : 'Modo Escuro'}
                </button>
            </header>


            <div className="flex flex-col md:flex-row p-4 gap-6">


                <aside className="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-200 dark:bg-gray-700 rounded-lg"
                    >
                        <option>Todas</option>
                        <option>Pendente</option>
                        <option>Em Andamento</option>
                        <option>Concluída</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                    >
                        <option>Todas</option>
                        <option>Alta</option>
                        <option>Média</option>
                        <option>Baixa</option>
                    </select>
                </aside>

                <main className="w-full md:w-3/4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTasks.length ? filteredTasks.map((task) => (
                            <div key={task.id} className={`p-4 rounded-lg shadow-md ${task.priority === 'Alta' ? 'border-l-4 border-red-600' : task.priority === 'Média' ? 'border-l-4 border-orange-600' : 'border-l-4 border-green-600'}`}>
                                <h3 className="font-bold mb-2">{task.title}</h3>
                                <p className={task.status === 'Pendente' ? 'text-gray-600' : task.status === 'Em Andamento' ? 'text-blue-600' : 'text-green-600'}>
                                    {task.status}
                                </p>
                                <p className={task.priority === 'Alta' ? 'text-red-600' : task.priority === 'Média' ? 'text-orange-600' : 'text-green-600'}>
                                    {task.priority}
                                </p>
                            </div>
                        )) : (
                            <p className="text-center col-span-full">Nenhuma tarefa encontrada.</p>
                        )}
                    </div>
                </main>
            </div>

            <button onClick={() => setShowModal(true)} className="fixed bottom-6 right-6 bg-blue-500 p-4 rounded-full text-white hover:bg-blue-600">+</button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">

                        <input
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Título da Tarefa"
                            className="w-full p-2 mb-4 border rounded"
                        />

                        <select
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                        >
                            <option className={'text-black'}>Alta</option>
                            <option className={'text-black'}>Média</option>
                            <option className={'text-black'}>Baixa</option>
                        </select>

                        <select
                            value={newTaskStatus}
                            onChange={(e) => setNewTaskStatus(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                        >
                            <option className={'text-black'}>Pendente</option>
                            <option className={'text-black'}>Em Andamento</option>
                            <option className={'text-black'}>Concluída</option>
                        </select>

                        <button onClick={addNewTask} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
                            Adicionar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
