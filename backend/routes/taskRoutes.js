
import express from 'express';
import { taskController } from '../controllers/taskController.js';
import { validateTask } from '../middleware/validation.js';

const router = express.Router();

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/search', taskController.searchTasks);
router.get('/tasks/:id', taskController.getTask);
router.post('/tasks', validateTask, taskController.createTask);
router.put('/tasks/:id', validateTask, taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

export default router;
