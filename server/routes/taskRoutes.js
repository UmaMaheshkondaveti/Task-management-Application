
import express from 'express';
import { taskController } from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';

const router = express.Router();

// Get all tasks
router.get('/', taskController.getAllTasks);

// Get single task
router.get('/:id', taskController.getTask);

// Create task
router.post('/', validateTask, taskController.createTask);

// Update task
router.put('/:id', validateTask, taskController.updateTask);

// Delete task
router.delete('/:id', taskController.deleteTask);

// Search tasks
router.get('/search', taskController.searchTasks);

export default router;
