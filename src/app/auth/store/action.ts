"use client";

import { createSlice } from "@reduxjs/toolkit";

import initialState from "./state";
import { RootState } from "@/redux/store";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.is_loggedIn = action.payload?.is_loggedIn ?? false;
      state.access_token = action.payload?.access_token ?? "";
      state.user = action.payload?.user ?? {};
      state.permission = action.payload?.permission ?? [];
    },
    logout: (state) => {
      state.is_loggedIn = false;
      state.access_token = "";
      state.user = {};
      state.permission = [];
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: RootState) => state.authSlice;
