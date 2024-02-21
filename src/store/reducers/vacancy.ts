import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "backend";

interface VacancyState {
  list: {
    loading: boolean;
    error: boolean;
    range: number;
    pageData: { [key: string]: any[] };
    count: { [key: string]: number };
    filter: { [key: string]: number };
    searchParams: any;
  };
  element: {
    data: { [key: string]: any };
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
      count: {},
      filter: {},
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
    setVacancyPageData(state, action: PayloadAction<{ key: string; data: any[] }>) {
      const { pageData } = state.list;
      const { key, data } = action.payload;
      pageData[key] = data;
    },
    setVacancyCount(state, action: PayloadAction<{ key: string; value: number }>) {
      state.list.count[action.payload.key] = action.payload.value;
    },
    vacancyData(state, action: PayloadAction<{ key: string; data: object }>) {
      const { key, data } = action.payload;
      state.element.data[key] = data;
    },
    vacancyError(state, action: PayloadAction<boolean>) {
      state.element.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(vacancyApi.element.fulfilled, (state, action) => {
      const { key, data, error } = action.payload;

      try {
        if (!state.element.data[key] && data) {
          state.element.data[key] = data[0];
        }
        if (error) throw error;
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    });
  },
});

export const { vacancyListError, vacancyListLoading, vacancyData, vacancyError, setVacancyCount, setVacancyPageData } =
  vacancy.actions;

export default vacancy.reducer;

/********************************************************************************************************************/
const element = createAsyncThunk("vacancy", async (id: string) => {
  const { data, error } = await supabase
    .from("vacancies")
    .select(
      `id, created_at, user_id, title, logo, company, location, subtitle, fromSalary, toSalary, currency, experience, remote`
    )
    .eq("id", id);

  return { key: id, data, error };
});

export const vacancyApi = {
  element,
};
