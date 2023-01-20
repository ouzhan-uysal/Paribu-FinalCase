import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ITodo {
  id: string;
  title?: string;
  completed?: boolean;
};

const initialState: ITodo[] = [];

export const fetchTodos = createAsyncThunk('fetchTodos',
  async () => {
    const response = await axios('https://jsonplaceholder.typicode.com/todos', { method: 'get' });
    return response.data.slice(-3);
  });

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      const newTodo = { id: action.payload.id, title: action.payload.title, completed: false }
      state.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<ITodo>) => {
      return state.filter((todo: any) => todo.id !== action.payload.id);
    },
    completeTodo: (state, action: PayloadAction<ITodo>) => {
      return state.map((todo: any) => todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo);
    },
    editTodo: (state, action: PayloadAction<ITodo>) => {
      return state.map((todo: any) => todo.id == action.payload.id ? { ...todo, title: action.payload.title } : todo);
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending, (state, action) => {
      console.log('fetching data...')
    });
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<any>) => {
      console.log('Fetched data successfully.')
      console.log("n:", action.payload);
      let todoList;
      action.payload.map((todo: any) => {
        state.push({ id: todo.id, title: todo.title, completed: todo.completed })
      })
    });
    // builder.addCase(fetchTodos.rejected, (state, action) => {
    //   state.data = [];
    //   state.error = "Error Message";
    //   state.loading = true;
    // });
  },
});

export default todoSlice.reducer;
export const { addTodo, removeTodo, editTodo, completeTodo } = todoSlice.actions;