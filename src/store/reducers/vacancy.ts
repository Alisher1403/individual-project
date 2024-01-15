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
      searchResults: {} as any,
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
    setVacancyCount(state, action: PayloadAction<{ key: string; data: number }>) {
      state.list.pageData[action.payload.key].count = action.payload.data;
    },
    setVacancyPageData(state, action: PayloadAction<{ search: string; data: object }>) {
      const pageData = state.list.pageData;
      const data = action.payload.data;
      const search = action.payload.search;
      pageData[search] = { ...pageData[search], ...data };
    },
    setSearchResults(state, action: PayloadAction<{ key: string; data: any }>) {
      state.list.searchResults[action.payload.key] = action.payload.data;
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
  setSearchResults,
} = vacancy.actions;
export default vacancy.reducer;
