import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";

const user = createSlice({
  name: "user",
  initialState: {
    data: null as { [key: string]: any } | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default user.reducer;

const authUser = createAsyncThunk("authUser", async () => {
  try {
    // return null;
    const {
      data: { user: userData },
    } = await supabase.auth.refreshSession();

    return userData;
  } catch (error: any) {
    console.error("Error fetching user data or refreshing session:", error);
    return { error: error.message };
  }
});

export const userApi = {
  auth: authUser,
};
