import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3000/tasks";

export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const response = await fetch(API);
  return response.json();
});

export const addTask = createAsyncThunk("addTask", async (task) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      completed: false,
    }),
  });
});

export const updateTask = createAsyncThunk("updateTask", async (id, task) => {
  const response = await fetch(API + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
});

export const updateStatus = createAsyncThunk(
  "updateStatus",
  async ({ id, completed }) => {
    const response = await fetch(API + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    const updatedTask = await response.json(); 
    return updatedTask;
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (id) => {
  const response = await fetch(API + `/${id}`, {
    method: "DELETE",
  });
    return id;
});

const initialState = {
  isLoading: false,
  data: [],
  error: false,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.error = true;
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      const updatedTask = action.payload;
      const index = state.data.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.data[index] = updatedTask;
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.filter(task => task.id !== id);
    });

  },
});

export default taskSlice.reducer;
