import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const navigation = createSlice({
  name: "navigation",
  initialState: {
    title: "",
  },
  reducers: {
    setNavTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export const { setNavTitle } = navigation.actions;

export default navigation.reducer;
