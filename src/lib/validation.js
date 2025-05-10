
import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  dueDate: z.date().optional().nullable(),
  status: z.enum(['To Do', 'In Progress', 'Completed']),
});

export const validateTask = (taskData) => {
  try {
    return TaskSchema.parse(taskData);
  } catch (error) {
    throw new Error(error.errors[0].message);
  }
};
