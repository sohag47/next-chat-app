"use client";

import { createSlice } from "@reduxjs/toolkit";

import initialState from "./state";
import { RootState } from "../store";

export const shareableSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn ? true : false;
      state.isLoading = action.payload.isLoggedIn ? false : true;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setAuth, setLoading, setIsLoggedIn } = shareableSlice.actions;

export default shareableSlice.reducer;

export const shareableSelector = (state: RootState) => state.shareableSlice;
