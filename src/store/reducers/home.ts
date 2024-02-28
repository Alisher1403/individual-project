import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";

const home = createSlice({
  name: "home",
  initialState: {
    categories: null as null | any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default home.reducer;

/********************************************************/
const categories = createAsyncThunk("skills", async () => {
  const { data } = await supabase.rpc("get_specialization_count");
  return data;
});

export const homeApi = {
  categories,
};
