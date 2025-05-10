
export const APP_STORAGE_KEY = 'taskManagerTasks';

export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  ALL: 'All',
};

export const initialTaskState = {
  id: null,
  title: '',
  description: '',
  dueDate: null,
  status: TASK_STATUS.TODO,
};

export const STATUS_STYLES = {
  [TASK_STATUS.TODO]: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  [TASK_STATUS.IN_PROGRESS]: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  [TASK_STATUS.COMPLETED]: 'bg-green-500/20 text-green-400 border-green-500/30',
  default: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};
