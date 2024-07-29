"use client";

import { createSlice } from "@reduxjs/toolkit";

import initialState from "./state";
import { RootState } from "@/redux/store";


export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addValue: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { addValue } = UserSlice.actions;

export default UserSlice.reducer;

export const USERSelector = (state: RootState) => state.userSlice;
