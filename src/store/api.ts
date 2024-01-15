import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import vacancies from "./reducers/vacancies";

export const api = createApi({
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    
  }),
});
