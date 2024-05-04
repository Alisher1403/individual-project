import { createSlice } from "@reduxjs/toolkit";

const modals = createSlice({
  name: "modals",
  initialState: { vacancyDelete: null },
  reducers: {
    setVacancyDelete(state, action) {
      state.vacancyDelete = action.payload;
    },
  },
});

export default modals.reducer;

export const { setVacancyDelete } = modals.actions;
