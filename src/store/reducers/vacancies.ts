import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const vacancies = createSlice({
  name: "vacancies",
  initialState: {
    list: null as any[] | null,
    listError: false as boolean,
    listLoading: false,
    loadedList: [],
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
      state.listError = action.payload;
    },
    vacancyListLoading(state, action: PayloadAction<boolean>) {
      state.listLoading = action.payload;
    },
    vacancyError(state, action: PayloadAction<boolean>) {
      state.listError = action.payload;
    },
    vacancyLoading(state, action: PayloadAction<boolean>) {
      state.listLoading = action.payload;
    },
  },
});

export const {
  getVacancyList,
  vacancyListError,
  vacancyListLoading,
  vacancyError,
  vacancyLoading,
} = vacancies.actions;
export default vacancies.reducer;
