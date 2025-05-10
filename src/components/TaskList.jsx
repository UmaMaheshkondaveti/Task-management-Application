import React from 'react';
import { motion } from 'framer-motion';
import TaskCard from '@/components/TaskCard';

function TaskList({ tasks, onEdit, onDelete }) {
  // Filter out tasks that have invalid createdAt values
  const validTasks = tasks.filter((task) => !isNaN(new Date(task.createdAt)));

  if (validTasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <p className="text-xl text-purple-300">No tasks found. Add one to get started!</p>
        <img 
          className="mx-auto mt-4 w-1/2 max-w-xs opacity-70" 
          alt="Empty state illustration" 
          src="https://images.unsplash.com/photo-1674027392842-29f8354e236c" 
        />
      </motion.div>
    );
  }

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {validTasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort tasks by creation date
        .map((task) => (
          <TaskCard
            key={task.id || task._id} // Use task.id or task._id for unique key
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
      ))}
    </motion.div>
  );
}

export default TaskList;
