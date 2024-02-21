import { createSlice } from "@reduxjs/toolkit";
import { api } from "store/api";

const recommendation = createSlice({
  name: "recommendation",
  initialState: {
    vacancies: {} as { [key: string]: any[] },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.recommendation.vacancies.fulfilled, (state, action) => {
      const { key, data } = action.payload;
      if (data) {
        state.vacancies[key] = data;
      }
    });
  },
});

export default recommendation.reducer;
