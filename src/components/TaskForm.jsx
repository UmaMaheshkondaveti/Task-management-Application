
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TASK_STATUS } from '@/constants/task';

function TaskForm({ currentTask, onSubmit, onInputChange, onDateChange, onStatusChange }) {
  return (
    <DialogContent className="sm:max-w-[425px] bg-slate-800 border-purple-600 text-white shadow-2xl shadow-purple-500/30">
      <DialogHeader>
        <DialogTitle className="text-2xl text-purple-300">
          {currentTask.id ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <DialogDescription className="text-purple-400/80">
          {currentTask.id ? 'Update the details of your task.' : 'Fill in the details for your new task.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="grid gap-6 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-purple-300">Title</Label>
          <Input
            id="title"
            name="title"
            value={currentTask.title}
            onChange={onInputChange}
            className="bg-slate-700/50 border-purple-500/50 text-white placeholder-purple-300/70 focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-purple-300">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={currentTask.description}
            onChange={onInputChange}
            className="bg-slate-700/50 border-purple-500/50 text-white placeholder-purple-300/70 focus:ring-pink-500 focus:border-pink-500 min-h-[100px]"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dueDate" className="text-purple-300">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-slate-700/50 border-purple-500/50 text-white hover:bg-slate-700 hover:text-white",
                  !currentTask.dueDate && "text-purple-300/70"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-purple-300/70" />
                {currentTask.dueDate ? format(currentTask.dueDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-800 border-purple-600 text-white shadow-lg">
              <Calendar
                mode="single"
                selected={currentTask.dueDate}
                onSelect={onDateChange}
                initialFocus
                className="[&_button]:text-white [&_button:hover]:bg-purple-700/50 [&_.rdp-day_selected]:bg-purple-600 [&_.rdp-day_selected:hover]:bg-purple-500 [&_.rdp-day_today]:bg-pink-600/80"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status" className="text-purple-300">Status</Label>
          <Select value={currentTask.status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full bg-slate-700/50 border-purple-500/50 text-white data-[placeholder]:text-purple-300/70 focus:ring-pink-500 focus:border-pink-500">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-purple-600">
              <SelectItem value={TASK_STATUS.TODO} className="hover:bg-purple-700/50 focus:bg-purple-700/50">To Do</SelectItem>
              <SelectItem value={TASK_STATUS.IN_PROGRESS} className="hover:bg-purple-700/50 focus:bg-purple-700/50">In Progress</SelectItem>
              <SelectItem value={TASK_STATUS.COMPLETED} className="hover:bg-purple-700/50 focus:bg-purple-700/50">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="text-purple-300 border-purple-400/50 hover:bg-purple-500/20 hover:text-purple-200">Cancel</Button>
          </DialogClose>
          <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            {currentTask.id ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default TaskForm;
