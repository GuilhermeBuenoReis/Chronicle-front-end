import { create } from 'zustand';

type TaskStore = {
  taskId: string;
  setTaskId: (id: string) => void;
};

export const useTaskStore = create<TaskStore>(set => ({
  taskId: '',
  setTaskId: id => set({ taskId: id }),
}));
