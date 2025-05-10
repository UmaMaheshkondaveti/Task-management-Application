import { useState, useEffect, useCallback } from 'react';
import { TaskAPI } from '@/lib/api';
import { validateTask } from '@/lib/validation';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks from backend
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TaskAPI.getAllTasks();  // Make the API call to fetch tasks from MongoDB
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new task
  const createTask = async (taskData) => {
    try {
      const validatedTask = validateTask(taskData);  // Validate task data before sending to API
      const newTask = await TaskAPI.createTask(validatedTask);  // Send to API to create task in MongoDB
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      throw new Error('Failed to create task');
    }
  };

  // Update an existing task
  const updateTask = async (id, taskData) => {
    try {
      const validatedTask = validateTask(taskData);  // Validate task data before updating
      const updatedTask = await TaskAPI.updateTask(id, validatedTask);  // Update task in MongoDB
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      throw new Error('Failed to update task');
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await TaskAPI.deleteTask(id);  // Call API to delete task from MongoDB
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      throw new Error('Failed to delete task');
    }
  };

  // Search tasks
  const searchTasks = async (query) => {
    try {
      const results = await TaskAPI.searchTasks(query);  // Call API to search tasks in MongoDB
      return results;
    } catch (err) {
      console.error('Search error:', err);
      return tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  // Initial load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
    refreshTasks: fetchTasks,
  };
}
