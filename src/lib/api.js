import axios from 'axios';

// Replace this with your backend API URL
const VITE_API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 80000, // Set timeout to 80 seconds
  withCredentials: true
});


// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Received response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    const customError = new Error(
      error.response?.data?.message ||
        'Network error occurred. Please check your connection and try again.'
    );
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    return Promise.reject(customError);
  }
);

export const TaskAPI = {
  // Fetch all tasks from the backend
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data; // Return the list of tasks
    } catch (error) {
      console.error('getAllTasks Error:', error);
      throw new Error(error.message || 'Failed to fetch tasks');
    }
  },

  // Fetch a specific task by ID from the backend
  getTask: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data; // Return the specific task
    } catch (error) {
      console.error('getTask Error:', error);
      throw new Error(error.message || 'Failed to fetch task');
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data; // Return the newly created task
    } catch (error) {
      console.error('createTask Error:', error);
      throw new Error(error.message || 'Failed to create task');
    }
  },

  // Update an existing task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data; // Return the updated task
    } catch (error) {
      console.error('updateTask Error:', error);
      throw new Error(error.message || 'Failed to update task');
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data; // Return the deleted task info
    } catch (error) {
      console.error('deleteTask Error:', error);
      throw new Error(error.message || 'Failed to delete task');
    }
  },

  // Search tasks by a query string
  searchTasks: async (query) => {
    try {
      const response = await api.get(`/tasks/search?q=${encodeURIComponent(query)}`);
      return response.data; // Return the search results
    } catch (error) {
      console.error('searchTasks Error:', error);
      throw new Error(error.message || 'Failed to search tasks');
    }
  },
};
