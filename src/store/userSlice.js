import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
  },
  reducers: {
    setUser: (state, { payload }) => {
      console.log("set user reducer");
      // state = payload;
      state.credentials = payload.credentials;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
