
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { Dialog } from '@/components/ui/dialog';
import { initialTaskState, TASK_STATUS } from '@/constants/task';
import { useTasks } from '@/hooks/useTasks';

import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import SearchBar from '@/components/SearchBar';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(TASK_STATUS.ALL);
  const { toast } = useToast();

  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks
  } = useTasks();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleDateChange = (date) => {
    setCurrentTask({ ...currentTask, dueDate: date });
  };

  const handleStatusChange = (status) => {
    setCurrentTask({ ...currentTask, status });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentTask.title) {
      toast({ 
        title: 'Error', 
        description: 'Task title is required.', 
        variant: 'destructive' 
      });
      return;
    }

    try {
      if (currentTask.id) {
        await updateTask(currentTask.id, currentTask);
        toast({ title: 'Success', description: 'Task updated successfully!' });
      } else {
        await createTask(currentTask);
        toast({ title: 'Success', description: 'Task added successfully!' });
      }
      setCurrentTask(initialTaskState);
      setIsFormOpen(false);
      refreshTasks();
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to save task', 
        variant: 'destructive' 
      });
    }
  };

  const handleEdit = (task) => {
    setCurrentTask({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast({ 
        title: 'Success', 
        description: 'Task deleted successfully!', 
        variant: 'destructive' 
      });
      refreshTasks();
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to delete task', 
        variant: 'destructive' 
      });
    }
  };

  const openNewTaskForm = () => {
    setCurrentTask(initialTaskState);
    setIsFormOpen(true);
  };
  
  const filteredTasks = tasks
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(task => 
      filterStatus === TASK_STATUS.ALL || task.status === filterStatus
    );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-purple-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      <Toaster />
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mb-8 text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
          TaskFlow
        </h1>
        <p className="text-lg text-purple-200 mt-2">Manage your tasks with ease and style.</p>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-4xl p-6 bg-slate-800/50 backdrop-blur-md rounded-xl shadow-2xl"
      >
        <SearchBar
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          onAddNew={openNewTaskForm}
        />

        {loading ? (
          <div className="text-center py-10">
            <p className="text-xl text-purple-300">Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </motion.div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <TaskForm
          currentTask={currentTask}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onDateChange={handleDateChange}
          onStatusChange={handleStatusChange}
        />
      </Dialog>
      
      
    </div>
  );
}

export default App;
