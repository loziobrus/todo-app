import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../types";

const API_URL = "http://localhost:5210/api";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await fetch(`${API_URL}/task/getTaskList`);
    return response.json();
  }
);

export const addTask = createAsyncThunk<Task, string>(
  "tasks/addTask",
  async (taskName, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskName),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editTask = createAsyncThunk<Task, Task>(
  "tasks/editTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/${task.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk<string, string>(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/${taskId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.text();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
