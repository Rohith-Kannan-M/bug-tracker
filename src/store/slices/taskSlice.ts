import { MOCK_TASKS } from '@bugtracker/mock/mockdata';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Pending Approval" | "Closed";
  assignee: string;
  createdAt: string;
  timeSpent: number;
};

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks:
    // Mock data for tasks slice
    MOCK_TASKS as Task[],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: number; status: Task["status"] }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    logTime: (state, action: PayloadAction<{ id: number; timeSpent: number }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.timeSpent += action.payload.timeSpent;
      }
    },
  },
});

export const { addTask, deleteTask, updateTaskStatus, logTime } = tasksSlice.actions;
export default tasksSlice.reducer;
