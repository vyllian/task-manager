import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

const API = "http://localhost:3000/tasks";

export const fetchTasks = createAsyncThunk("fetchTasks", async()=>{
    const response = await fetch(API)
    return response.json()
});

export const addTask = createAsyncThunk("addTask", async(task)=>{
    const response = await fetch(API, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title:task.title, description:task.description, completed:false}),
    })
});

export const updateTask = createAsyncThunk("updateTask", async(id, changes)=>{
    const response = await fetch(API+`/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes)
    })
});

export const deleteTask = createAsyncThunk("deleteTask", async(id)=>{
    const response = await fetch(API+`/${id}`, {
        method: "DELETE"
    })
})

const initialState = {
    isLoading:false,
    data: [],
    error: false
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchTasks.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.data= action.payload;
        });
        builder.addCase(fetchTasks.rejected,(state, action)=>{
            state.error = true;
        });
    }
})

export default taskSlice.reducer;