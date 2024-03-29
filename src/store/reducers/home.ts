import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";

const home = createSlice({
  name: "home",
  initialState: {
    categories: null,
    vacancies: null as null | any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      if (action.payload) {
        state.vacancies = action.payload;
      }
    });
  },
});

export default home.reducer;

/********************************************************/
const getAll = createAsyncThunk("getAll", async () => {
  try {
    const data = {
      vacanciesOfTheWeek: null as null | any[],
      latestVacancies: null as null | any[],
      topCompanies: null as null | any[],
    };

    const date = new Date();
    date.setDate(date.getDate() - 7);

    await supabase
      .from("vacancies")
      .select("*")
      .gte("created_at", date.toISOString())
      .limit(12)
      .then((result) => {
        if (result.data && result.data.length > 6) {
          data.vacanciesOfTheWeek = result.data;
        }
      });

    await supabase
      .from("vacancies")
      .select("*, user: user_metadata(img, name)")
      .order("created_at", { ascending: false })
      .limit(12)
      .then((result) => {
        if (result.data && result.data.length > 6) {
          data.latestVacancies = result.data;
        }
      });

    await supabase
      .from("user_metadata")
      .select("*, vacancies(*)")
      .order("created_at", { ascending: false })
      .limit(12)
      .then((result) => {
        if (result.data && result.data.length > 6) {
          data.topCompanies = result.data;
        }
      });

    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
});

export const homeApi = {
  vacancies: {
    get: getAll,
  },
};
