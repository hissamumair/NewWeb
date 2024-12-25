// taskThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setTasks,
  addTaskSuccess,
  toggleTaskSuccess,
  deleteTaskSuccess,
  setStatus,
  setError,
} from './taskSlice';

const API_URL = 'YOUR_API_URL';

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { dispatch }) => {
    try {
      dispatch(setStatus('loading'));
      const response = await axios.get(`${API_URL}/tasks`);
      dispatch(setTasks(response.data));
      dispatch(setStatus('succeeded'));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  }
);

// Add a new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { dispatch }) => {
    try {
      dispatch(setStatus('loading'));
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      dispatch(addTaskSuccess(response.data));
      dispatch(setStatus('succeeded'));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  }
);

// Toggle task completion
export const toggleTask = createAsyncThunk(
  'tasks/toggleTask',
  async (taskId, { dispatch, getState }) => {
    try {
      dispatch(setStatus('loading'));
      const task = getState().tasks.tasks.find(t => t.id === taskId);
      const response = await axios.patch(`${API_URL}/tasks/${taskId}`, {
        completed: !task.completed,
      });
      dispatch(toggleTaskSuccess(response.data));
      dispatch(setStatus('succeeded'));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { dispatch }) => {
    try {
      dispatch(setStatus('loading'));
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      dispatch(deleteTaskSuccess(taskId));
      dispatch(setStatus('succeeded'));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  }
);