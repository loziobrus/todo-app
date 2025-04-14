import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTask, deleteTask, editTask, fetchTasks } from "./services";
import { Task } from "../types";

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

const handleRejected = (state: TaskState, action: PayloadAction<unknown>) => {
  state.error = (action.payload as Error).message;
};

const handleFulfilled =
  (onSuccess: Function) =>
  (state: TaskState, action: PayloadAction<unknown>) => {
    onSuccess(state, action);
    state.error = "";
  };

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTasks.fulfilled,
        handleFulfilled((state: TaskState, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
          state.loading = false;
        })
      )
      .addCase(
        addTask.fulfilled,
        handleFulfilled((state: TaskState, action: PayloadAction<Task>) => {
          state.tasks.unshift(action.payload);
        })
      )
      .addCase(addTask.rejected, handleRejected)
      .addCase(
        editTask.fulfilled,
        handleFulfilled((state: TaskState, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          const priorityChanged =
            state.tasks[index].priority !== action.payload.priority;
          state.tasks[index] = action.payload;

          if (priorityChanged) {
            state.tasks = state.tasks.sort((a, b) => {
              if (a.priority === b.priority) {
                return a.name.localeCompare(b.name);
              }
              return a.priority - b.priority;
            });
          }
        })
      )
      .addCase(editTask.rejected, handleRejected)
      .addCase(
        deleteTask.fulfilled,
        handleFulfilled((state: TaskState, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload
          );
        })
      )
      .addCase(deleteTask.rejected, handleRejected);
  },
});

export const { setError } = taskSlice.actions;

export default taskSlice.reducer;
