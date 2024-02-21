import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "backend";

const vacancies = createAsyncThunk("vacancies", async (query: string) => {
  const { data } = await supabase
    .from("vacancies")
    .select("*")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

  return { key: query, data };
});

export const recommendation = {
  vacancies,
};
