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
    data: {} as { [key: string]: any },
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
    builder.addCase(getResume.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data } = action.payload;
        state.data[key] = data;
      }
    });
  },
});

export default resume.reducer;
export const { resetResumes } = resume.actions;

const getResumeList = createAsyncThunk(
  "getResumeList",
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

      if (searchParams.remote === "true") {
        query.eq("remote", true);
      }

      if (searchParams.salary) {
        query.gte("salary", searchParams.salary);
      }

      if (searchParams.currency) {
        query.eq("currency", searchParams.currency);
      } else {
        query.eq("currency", "dollar");
      }

      if (searchParams.age) {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() - searchParams.age);
        const iosStreamDate = currentDate.toISOString();

        query.lte("dob", iosStreamDate);
      }

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

const getResume = createAsyncThunk(
  "postResume",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id && !id) return;

    const { data } = await supabase
      .from("resumes")
      .select("*, user: user_metadata(*)")
      .eq("id", id);

    if (data && data?.[0]) {
      return { data: data[0], key: id };
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

const updateResume = createAsyncThunk(
  "updateResume",
  async (args: { id: string; post: any }, { getState }) => {
    const { id, post } = args;
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return false;

    const { data } = await supabase
      .from("resumes")
      .update(post)
      .eq("id", id)
      .select();

    return data;
  }
);

const deleteResume = createAsyncThunk(
  "deleteResume",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return false;

    const { data } = await supabase
      .from("resumes")
      .delete()
      .eq("id", id)
      .select();

    return data;
  }
);

export const resumeApi = {
  get: getResume,
  post: postResume,
  update: updateResume,
  delete: deleteResume,
  list: { get: getResumeList },
};
