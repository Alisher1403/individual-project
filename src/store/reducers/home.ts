import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";

interface Category {
  name: string;
}

interface Company {
  id: string;
  name: string;
  img: string;
}

interface HomeState {
  categories: Category[] | null;
  topCompanies: { name: string; companies: Company[] }[] | null;
}

const home = createSlice({
  name: "home",
  initialState: {
    categories: null,
    topCompanies: null,
  } as HomeState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getTopCompanies.fulfilled, (state, action) => {
      state.topCompanies = action.payload;
    });
  },
});

export default home.reducer;

/********************************************************/
const getCategories = createAsyncThunk<Category[], void>("categories", async () => {
  const { data } = await supabase.rpc("get_specialization_count");

  return data;
});

const getTopCompanies = createAsyncThunk<{ name: string; companies: Company[] }[], Category[]>(
  "topCompanies",
  async (categories) => {
    if (!categories) return [];

    const promises = categories.map(async (elem) => {
      const { data: count } = await supabase.from("vacancies").select("count").eq("specialization", elem.name);
      const { data: companies } = await supabase.rpc("get_top_companies", { p_specialization: elem.name, p_limit: 4 });

      return {
        name: elem.name,
        count: count ? count[0].count : 0,
        companies: companies.map((e: any) => {
          return { id: e.user_id, name: e.user_name, img: e.user_img };
        }),
      };
    });

    const data = await Promise.all(promises);

    return data;
  }
);

export const homeApi = {
  categories: { getList: getCategories },
  topCompanies: { getList: getTopCompanies },
};
