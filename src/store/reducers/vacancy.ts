import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";

interface VacancyState {
  list: {
    loading: boolean;
    error: boolean;
    range: number;
    pageData: Record<string, Draft<{ count: number; [page: string]: any }>>;
  };
  element: {
    data: Record<string, any>;
    loading: boolean;
    error: boolean;
  };
}

const vacancy = createSlice({
  name: "vacancy",
  initialState: {
    list: {
      loading: false,
      error: false,
      range: 8,
      pageData: {},
    },
    element: {
      data: {},
      loading: false,
      error: false,
    },
  } as VacancyState,
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
      const { pageData } = state.list;
      const { data, search } = action.payload;
      pageData[search] = { ...pageData[search], ...data };
    },
    vacancyData(state, action: PayloadAction<{ key: string; data: object }>) {
      const { key, data } = action.payload;
      state.element.data[key] = data;
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
