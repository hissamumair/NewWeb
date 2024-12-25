// TaskManagement.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, toggleTask, deleteTask } from './taskThunks';

const TaskManagement = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ title: newTask, completed: false }));
      setNewTask('');
    }
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTask(id));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  if (status === 'loading') {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

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
          onClick={handleAddTask}
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
                onChange={() => handleToggleTask(task.id)}
                className="mr-4"
              />
              <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
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