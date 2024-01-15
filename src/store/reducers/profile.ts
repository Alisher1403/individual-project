import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "user",
  initialState: {
    data: {} as any,
  },
  reducers: {
    setUser(state, action: PayloadAction<{ key: string; data: object }>) {
      state.data[action.payload.key] = action.payload.data;
    },
  },
});

export const { setUser } = profile.actions;
export default profile.reducer;
