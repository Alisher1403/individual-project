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
      specializations: null as null | any[],
      latestVacancies: null as null | any[],
      topCompanies: null as null | any[],
      topVacancies: null as null | any[],
    };

    const date = new Date();
    date.setDate(date.getDate() - 7);

    await supabase
      .from("specializations")
      .select("*, vacancies(count), salary: vacancies!inner(toSalary.max())")
      .eq("salary.currency", "dollar")
      .neq("name", "")
      .neq("name", "...")
      .then((result): void => {
        if (result.data && result.data.length > 3) {
          data.specializations = result.data;

          data.specializations.sort((a, b) => {
            return b?.vacancies?.[0].count - a?.vacancies?.[0].count;
          });

          data.specializations = data.specializations.slice(0, 8);
        }
      });

    await supabase
      .from("vacancies")
      .select("*, user: user_metadata!inner(img, name)")
      .order("created_at", { ascending: false })
      .limit(12)
      .then((result) => {
        if (result.data && result.data.length > 4) {
          data.latestVacancies = result.data;
        }
      });

    await supabase
      .from("vacancies")
      .select("*, user: user_metadata!inner(img, name), applicants(count)")
      .order("count", {
        ascending: false,
        referencedTable: "applicants",
      })
      .limit(12)
      .then((result) => {
        if (result.data && result.data.length > 4) {
          data.topVacancies = result.data;
        }
      });

    await supabase
      .from("user_metadata")
      .select("*")
      .eq("userType", "employer")
      .limit(12)
      .then((result) => {
        if (result.data && result.data.length > 4) {
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
