import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "backend";

const vacancy = createAsyncThunk("vacancy", async (id: string) => {
//   const { data, error } = await supabase
//     .from("vacancies")
//     .select(
//       `id, created_at, user_id, title, logo, company, location, subtitle, fromSalary, toSalary, currency, experience, remote`
//     )
//     .eq("id", id);

//   return { key: id, data, error };
});

export const sidebar = {
  vacancy,
};
