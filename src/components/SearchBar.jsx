
import React from 'react';
import { Search, Filter, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TASK_STATUS } from '@/constants/task';

function SearchBar({ searchTerm, filterStatus, onSearchChange, onFilterChange, onAddNew }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <div className="relative flex-grow w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-slate-700/50 border-purple-500/50 text-white placeholder-purple-300/70 focus:ring-pink-500 focus:border-pink-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300/70" />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-slate-700/50 border-purple-500/50 text-white data-[placeholder]:text-purple-300/70 focus:ring-pink-500 focus:border-pink-500">
            <Filter className="h-4 w-4 mr-2 text-purple-300/70" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 text-white border-purple-600">
            <SelectItem value={TASK_STATUS.ALL} className="hover:bg-purple-700/50 focus:bg-purple-700/50">All Statuses</SelectItem>
            <SelectItem value={TASK_STATUS.TODO} className="hover:bg-purple-700/50 focus:bg-purple-700/50">To Do</SelectItem>
            <SelectItem value={TASK_STATUS.IN_PROGRESS} className="hover:bg-purple-700/50 focus:bg-purple-700/50">In Progress</SelectItem>
            <SelectItem value={TASK_STATUS.COMPLETED} className="hover:bg-purple-700/50 focus:bg-purple-700/50">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={onAddNew} 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add Task
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
