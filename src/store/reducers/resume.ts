import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { RootState } from "store";

const resume = createSlice({
  name: "resume",
  initialState: {
    list: {
      data: {} as { [key: string]: any },
      loading: false,
      count: 0,
      range: 8,
    },
  },
  reducers: {
    resetResumes(state) {
      state.list.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getResumeList.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data, count } = action.payload;
        state.list.data[key] = data;

        if (count) {
          state.list.count = count;
        }
      }
    });
  },
});

const getResumeList = createAsyncThunk(
  "getVacancyList",
  async (args: {
    searchText: string;
    searchParams: any;
    fromIndex: number;
    toIndex: number;
    dataKey: string;
  }) => {
    const { searchText, searchParams, fromIndex, toIndex, dataKey } = args;
    try {
      let selectString = `id, created_at, user_id, title, user: user_metadata(name, img), remote, emp_type, location, subtitle, salary, currency, experience, views: resume_views (count)`;

      let query = supabase
        .from("resumes")
        .select(selectString, { count: "exact" });

      // Apply search text filter
      if (searchText) {
        const removeSpaces = searchText.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        query = query.or(
          `title.ilike.%${removeSpaces}%,description.ilike.%${removeSpaces}%,specialization.ilike.%${removeSpaces}%,subtitle.ilike.%${removeSpaces}%`
        );
      }

      // Utility functions for applying filters
      const useFilter = {
        like(params: { value: string; column: string }) {
          if (params.value) {
            query = query.filter(params.column, "like", params.value);
          }
        },
        or(params: { value: string[]; column: string }) {
          if (params.value && params.value.length > 0) {
            let matchQuery;
            if (Array.isArray(params.value)) {
              matchQuery = params.value
                .map((e) => `${params.column}.ilike.${e}`)
                .join(",");
              query = query.or(matchQuery);
            } else {
              query = query.or(`${params.column}.ilike.${params.value}`);
            }
          }
        },
      };

      // Apply additional filters from search parameters
      useFilter.like({
        value: searchParams.experience,
        column: "experience",
      });
      useFilter.or({ value: searchParams.emp_type, column: "emp_type" });
      useFilter.or({ value: searchParams.education, column: "education" });

      // Fetch data from the API
      const { data, error, count } = await query
        .range(fromIndex, toIndex)
        .order("id", { ascending: false });

      if (error) {
        throw error;
      } else {
        return { key: dataKey, data, count };
      }
    } catch (error) {
      return null;
    }
  }
);

const postResume = createAsyncThunk(
  "postResume",
  async (post: any, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return;

    const { data } = await supabase
      .from("resumes")
      .insert({ user_id, ...post });

    return { data };
  }
);

export default resume.reducer;

export const resumeApi = {
  post: postResume,
  list: { get: getResumeList },
};
