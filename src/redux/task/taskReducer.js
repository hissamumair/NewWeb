// taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTaskSuccess: (state, action) => {
      state.tasks.push(action.payload);
    },
    toggleTaskSuccess: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTaskSuccess: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTaskSuccess,
  toggleTaskSuccess,
  deleteTaskSuccess,
  setStatus,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;