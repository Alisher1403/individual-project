import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const vacancy = createSlice({
  name: "vacancy",
  initialState: {
    list: {
      loading: false as boolean,
      error: false as boolean,
      range: 5,
      pageData: {} as any,
      count: 0 as number,
    },
    element: {
      data: {} as any,
      loading: false as boolean,
      error: false as boolean,
    },
  },
  reducers: {
    vacancyListError(state, action: PayloadAction<boolean>) {
      state.list.error = action.payload;
    },
    vacancyListLoading(state, action: PayloadAction<boolean>) {
      state.list.loading = action.payload;
    },
    setVacancyCount(state, action: PayloadAction<number>) {
      state.list.count = action.payload;
    },
    setVacancyPageData(state, action: PayloadAction<{ page: number; data: any[] }>) {
      state.list.pageData[action.payload.page] = action.payload.data;
    },
    vacancyData(state, action: PayloadAction<{ key: string; data: object }>) {
      state.element.data[action.payload.key] = action.payload.data;
    },
    vacancyError(state, action: PayloadAction<boolean>) {
      state.element.error = action.payload;
    },
    vacancyLoading(state, action: PayloadAction<boolean>) {
      state.element.loading = action.payload;
    },
  },
});

export const {
  vacancyListError,
  vacancyListLoading,
  vacancyData,
  vacancyError,
  vacancyLoading,
  setVacancyCount,
  setVacancyPageData,
} = vacancy.actions;
export default vacancy.reducer;
