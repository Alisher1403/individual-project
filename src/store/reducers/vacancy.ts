import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { RootState } from "store";

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
  comments: {
    data: { [key: string]: any };
    count: { [key: string]: number };
    loading: boolean;
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
    comments: {
      data: {},
      count: {},
      loading: false,
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
    commentsLoading(state, action: PayloadAction<boolean>) {
      state.comments.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(element.fulfilled, (state, action) => {
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
    builder.addCase(comments.fulfilled, (state, action) => {
      const { key, data, count } = action.payload;

      if (data && !state.comments.data[key]) {
        state.comments.data[key] = data;
      }
      if (count) {
        state.comments.count[key] = count;
      }
    });
    builder.addCase(loadMoreComments.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data } = action.payload;

        if (data) {
          const uniqueArray = Array.from(
            new Set([...state.comments.data[key], ...data].map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));

          state.comments.data[key] = uniqueArray;
        }
      }
    });
  },
});

export const { vacancyListError, vacancyListLoading, vacancyData, vacancyError, setVacancyCount, setVacancyPageData } =
  vacancy.actions;

export default vacancy.reducer;

/********************************************************************************************************************/
const element = createAsyncThunk("vacancy", async (id: string, { dispatch }) => {
  dispatch(comments(id));

  const { data, error } = await supabase
    .from("vacancies")
    .select(`*, likes (count), dislikes (count), views (count)`)
    .eq("id", id);

  return { key: id, data, error };
});

const comments = createAsyncThunk("comments", async (id: string) => {
  let query = supabase
    .from("comments")
    .select("*, user: user_id (name: user_name, img)", { count: "exact" })
    .order("id", { ascending: true })
    .eq("vacancy_id", id);

  const { data, count } = await query.limit(5);

  return { key: id, data, count };
});

const loadMoreComments = createAsyncThunk("loadMoreComments", async (id: string, { getState, dispatch }) => {
  const state = getState() as RootState;
  const mainState = state.vacancy.comments.data[id] || [];
  const stateCount = state.vacancy.comments.count[id] || false;

  if (!stateCount || stateCount <= mainState.length) {
    return;
  }

  dispatch(vacancy.actions.commentsLoading(true));
  let query = supabase.from("comments").select("*, user: user_id (name: user_name)").eq("vacancy_id", id);

  if (mainState.length > 0) {
    const latestId = mainState[mainState.length - 1].id;
    query = query.gt("id", latestId);
  }

  const { data } = await query.limit(5);

  dispatch(vacancy.actions.commentsLoading(false));

  return { key: id, data };
});

export const vacancyApi = {
  element,
  comments,
  loadMoreComments,
};
