import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Task from "../types/Task";
import { addTask, deleteTask, editTask, fetchTasks } from "./services";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const handlePending = (state: TaskState) => {
  state.loading = true;
};

const handleRejected = (state: TaskState, action: PayloadAction<unknown>) => {
  state.loading = false;
  state.error = action.payload as string;
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, handleRejected)
      .addCase(addTask.pending, handlePending)
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(addTask.rejected, handleRejected)
      .addCase(editTask.pending, handlePending)
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        state.tasks[index] = action.payload;
        state.loading = false;
      })
      .addCase(editTask.rejected, handleRejected)
      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTask.rejected, handleRejected);
  },
});

export default taskSlice.reducer;
