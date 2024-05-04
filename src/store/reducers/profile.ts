import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { userApi } from "./user";

const profile = createSlice({
  name: "profile",
  initialState: {
    data: {} as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data } = action.payload;
        state.data[key] = data;
      }
    });
    builder.addCase(userApi.metadata.deleteImg.fulfilled, (state, action) => {
      if (action.payload) {
        const { key } = action.payload;

        if (state.data[key]?.metadata && state.data[key].metadata?.img) {
          state.data[key].metadata.img = null;
        }

        if (state.data[key]?.posts) {
          const returnPosts = state.data[key].posts.map((post: any) => {
            return { ...post, user: { ...post.user, img: null } };
          });

          state.data[key].posts = returnPosts;
        }
      }
    });
  },
});

export default profile.reducer;

const getProfile = createAsyncThunk("getProfile", async (id: string) => {
  const { data: metadata } = await supabase
    .from("user_metadata")
    .select("*")
    .eq("id", id);

  if (!metadata) return;
  const userType = metadata[0]?.userType;
  const postType = userType === "employer" ? "vacancies" : "resumes";

  const { data: posts } = await supabase
    .from(postType)
    .select("*, user: user_metadata(*), views: views(count)")
    .order("id", { ascending: false })
    .eq("user_id", id);

  const data = {
    metadata: metadata[0],
    posts,
  };

  return { data, key: id };
});

export const profileApi = {
  get: getProfile,
};
