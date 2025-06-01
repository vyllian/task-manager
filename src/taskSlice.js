import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:8000/tasks";



export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(API, {
    method:'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status === 401 || response.status === 403) {
    throw new Error('не авторизовано');
  }
  return response.json();
});

export const fetchTask = createAsyncThunk("fetchTask", async (id) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(API+`/${id}`,{
    method:'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }, 
  });
  if (response.status === 401 || response.status === 403) {
    throw new Error('не авторизовано');
  }
  return response.json();
});

export const addTask = createAsyncThunk("addTask", async (task) => {
  const token = localStorage.getItem('accessToken');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      userId: user.id,
      completed: false,
    }),
  });
  if (response.status === 401 || response.status === 403) {
    throw new Error('не авторизовано');
  }
});

export const updateTask = createAsyncThunk("updateTask", async ({id, task}) => {
  const token = localStorage.getItem('accessToken');
    const response = await fetch(API + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (response.status === 401 || response.status === 403) {
    throw new Error('не авторизовано');
  }
  const updatedTask = await response.json(); 
  return updatedTask;
});

export const updateStatus = createAsyncThunk(
  "updateStatus",
  async ({ id, completed }) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(API + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ completed }),
    });
    if (response.status === 401 || response.status === 403) {
      throw new Error('не авторизовано');
    }
    const updatedTask = await response.json(); 
    return updatedTask;
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (id) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(API + `/${id}`, {
    method: "DELETE",
    'Authorization': `Bearer ${token}`,
  });
  if (response.status === 401 || response.status === 403) {
    throw new Error('не авторизовано');
  }
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
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
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
    builder.addCase(updateTask.fulfilled, (state, action) => {
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
