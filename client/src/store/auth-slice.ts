import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: {} },
  reducers: {
    signin(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    signout(state) {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
