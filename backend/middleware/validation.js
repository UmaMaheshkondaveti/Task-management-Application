import { body, validationResult } from 'express-validator';

export const validateTask = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Invalid date format'),

  body('status')
    .optional()
    .isIn(['To Do', 'In Progress', 'Completed']).withMessage('Invalid status'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
