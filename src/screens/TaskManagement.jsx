import { useState } from 'react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false },
    { id: 3, title: 'Task 3', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h1>

      <div className="mb-6 flex">
        <input
          type="text"
          value={newTask}
          onChange={handleTaskChange}
          className="p-2 border border-gray-300 rounded-md flex-1"
          placeholder="Enter a new task"
        />
        <button
          onClick={addTask}
          className="ml-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          Add Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 border rounded-md ${
              task.completed ? 'bg-green-100 text-gray-500' : 'bg-white text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="mr-4"
              />
              <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
              className="text-red-500 hover:text-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
