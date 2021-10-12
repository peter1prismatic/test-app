import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
    todos: [],
  },
  reducers: {
    setUser: (state, { payload }) => {
      console.log("set user reducer");
      // state = payload;
      state.credentials = payload.credentials;
      state.todos = payload.todos;
    },
    deleteTodoAction: (state, { payload }) => {
      console.log("delete todo reducer");
      const index = state.todos.findIndex(
        (todo) => todo.todoId === payload.todoId
      );
      state.todos.splice(index, 1);
      // return {
      //   ...state,
      // };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, deleteTodoAction } = userSlice.actions;

export default userSlice.reducer;
