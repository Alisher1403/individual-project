import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "user",
  initialState: {
    data: {} as any,
    id: "56d26b6c-085c-4003-8381-6109937a7d18",
  },
  reducers: {
    setUser(state, action: PayloadAction<{ key: string; data: object }>) {
      state.data[action.payload.key] = action.payload.data;
    },
  },
});

export const { setUser } = profile.actions;
export default profile.reducer;
