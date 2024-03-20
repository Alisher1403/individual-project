import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";

const user = createSlice({
  name: "user",
  initialState: null as { [key: string]: any } | null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default user.reducer;

const authUser = createAsyncThunk("authUser", async () => {
  try {
    const { data: jwt } = await supabase.auth.getSession();

    if (jwt.session) {
      const session = jwt.session;

      const {
        data: { user: userData },
      } = await supabase.auth.getUser(session.access_token);

      const { error: refreshError } = await supabase.auth.refreshSession(session);

      if (refreshError) {
        throw new Error("Failed to refresh session");
      }

      return userData;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching user data or refreshing session:", error);
    return { error: error.message };
  }
});

export const userApi = {
  auth: authUser,
};
