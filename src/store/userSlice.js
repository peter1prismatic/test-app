import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authenticated: false,
    loading: false,
    credentials: { documents: [] },
    likes: [],
    notifications: [],
    todos: [],
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.credentials = payload;
      state.todos = payload.todos;
    },
    deleteTodoAction: (state, { payload }) => {
      const index = state.credentials.documents.findIndex(
        (doc) => doc === payload
      );
      state.credentials.documents.splice(index, 1);
    },
    addDocument: (state, { payload }) => {
      state.credentials.documents.push(payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, deleteTodoAction, addDocument } = userSlice.actions;

export default userSlice.reducer;
