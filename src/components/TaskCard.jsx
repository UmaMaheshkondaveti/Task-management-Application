import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { STATUS_STYLES } from '@/constants/task';

function TaskCard({ task, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    return STATUS_STYLES[status] || STATUS_STYLES.default;
  };

  // Helper function to safely format dates
  const safeFormatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? 'Invalid date' : format(parsedDate, 'PPP');
  };

  // Helper function to safely format time
  const safeFormatTime = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? 'Invalid time' : format(parsedDate, 'Pp');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-slate-700/60 border-purple-500/30 shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 flex flex-col h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold text-purple-300 break-all">{task.title}</CardTitle>
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
          {task.dueDate && (
            <p className="text-xs text-purple-400/80 flex items-center pt-1">
              <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
              Due: {safeFormatDate(task.dueDate)}
            </p>
          )}
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-purple-200/90 break-all leading-relaxed">{task.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-auto pt-4 border-t border-purple-500/20">
          <div className="text-xs text-purple-400/70">
            <p>Created: {safeFormatTime(task.createdAt)}</p>
            <p>Updated: {safeFormatTime(task.updatedAt)}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(task)}
              className="text-purple-400 border-purple-400/50 hover:bg-purple-500/20 hover:text-purple-300"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="text-rose-400 border-rose-400/50 hover:bg-rose-500/20 hover:text-rose-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default TaskCard;
