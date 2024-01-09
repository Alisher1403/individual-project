import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const vacancies = createSlice({
  name: "vacancies",
  initialState: {
    list: null as any[] | null,
    error: false as boolean,
    loading: false,
  },
  reducers: {
    getVacancyList(state, action: PayloadAction<any[]>) {
      if (state.list != null) {
        state.list?.push(...action.payload);
      } else {
        state.list = [...action.payload];
      }
    },
    vacancyListError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
    vacancyListLoading(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
});

export const { getVacancyList, vacancyListError, vacancyListLoading } =
  vacancies.actions;
export default vacancies.reducer;
