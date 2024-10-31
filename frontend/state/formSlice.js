// frontend/state/slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    update(state, action) {
      const { name, value } = action.payload;
      state[name] = value
    },
    reset(state) {
      console.log('this got called');
      return initialState
    }
  },
});

export const { update, reset } = formSlice.actions;
