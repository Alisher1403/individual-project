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
    builder.addCase(LoadComments.fulfilled, (state, action) => {
      const { key, data, count } = action.payload;

      if (data && !state.comments.data[key]) {
        state.comments.data[key] = data;
      }
      if (count && count?.[0].count) {
        state.comments.count[key] = count?.[0].count;
      } else {
        state.comments.count[key] = 0;
      }
    });
    builder.addCase(GetComments.fulfilled, (state, action) => {
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
    builder.addCase(PostComment.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data } = action.payload;

        if (data) {
          const comment = data[0];
          comment.like_count = 0;
          comment.dislike_count = 0;
          comment.liked = false;
          state.comments.data[key] = [comment, ...state.comments.data[key]];
          state.comments.count[key] += 1;
        }
      }
    });
    builder.addCase(UpdateComment.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, id, key } = action.payload;
        const list = state.comments.data[key];

        if (data && id && list) {
          const index = list.findIndex((e: any) => e.id === id);
          const newItem = Object.assign(list[index], data[0]);
          list[index] = newItem;
          state.comments.data[key] = list;
        }
      }
    });
    builder.addCase(DeleteComment.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, id, key } = action.payload;
        const list = state.comments.data[key];

        if (data && id && list) {
          const newArr = list.filter((e: any) => e.id !== id);

          state.comments.data[key] = newArr;

          state.comments.count[key] -= 1;
        }
      }
    });

    builder.addCase(PostCommentLike.fulfilled, (state, action) => {
      const { comment_id, key } = action.payload;
      const list = state.comments.data[key];
      const index = list?.findIndex((e: { id: number }) => e.id === comment_id);
      list[index].liked = list[index].liked ? list[index]?.liked : null;

      state.comments.data[key] = list;
    });
  },
});

export const { vacancyListError, vacancyListLoading, vacancyData, vacancyError, setVacancyCount, setVacancyPageData } =
  vacancy.actions;

export default vacancy.reducer;

/********************************************************************************************************************/
const config = {
  commentsPerLoad: 6,
};

/********************************************************************************************************************/
const element = createAsyncThunk("vacancy", async (id: number, { dispatch }) => {
  dispatch(LoadComments(id));

  const { data, error } = await supabase
    .from("vacancies")
    .select(`*, likes (count), dislikes (count), views (count)`)
    .eq("id", id);

  return { key: id, data, error };
});

const LoadComments = createAsyncThunk("LoadComments", async (vacancy_id: number, { getState }) => {
  const state = getState() as RootState;
  const list = state.vacancy.comments.data[vacancy_id] || [];
  const last_id = list[list.length - 1]?.id || null;
  const user_id = state.user.id;

  const params = { p_post_id: vacancy_id, p_from_id: last_id, p_limit: config.commentsPerLoad, p_user_id: user_id };

  const { data } = await supabase.rpc("get_comments", params);

  const { data: count } = await supabase.from("comments").select("count").eq("vacancy_id", vacancy_id);

  return { key: vacancy_id, data, count };
});

const GetComments = createAsyncThunk("GetComments", async (vacancy_id: string, { getState, dispatch }) => {
  const state = getState() as RootState;
  const user_id = state.user.id;
  const mainState = state.vacancy.comments.data[vacancy_id] || [];
  const last_id = mainState[mainState.length - 1]?.id;

  const stateCount = state.vacancy.comments.count[vacancy_id] || false;

  if (!stateCount || stateCount <= mainState.length) {
    return;
  }

  dispatch(vacancy.actions.commentsLoading(true));
  const params = { p_post_id: vacancy_id, p_from_id: last_id, p_limit: config.commentsPerLoad, p_user_id: user_id };
  const { data } = await supabase.rpc("get_comments", params);

  dispatch(vacancy.actions.commentsLoading(false));

  return { key: vacancy_id, data };
});

const PostComment = createAsyncThunk(
  "PostComment",
  async (args: { vacancy_id: number; value: string }, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.id;

    const { value, vacancy_id } = args;

    if (vacancy_id) {
      const { data } = await supabase
        .from("comments")
        .insert({ vacancy_id, text: value, user_id })
        .select("*, user_data: users(id: user_id, name: user_name, img)");

      return { key: vacancy_id, data };
    }
  }
);

const UpdateComment = createAsyncThunk(
  "UpdateComment",
  async (args: { id: number; value: string; vacancy_id: number }) => {
    const { value, id, vacancy_id } = args;
    const { data } = await supabase
      .from("comments")
      .update({ text: value, changed: true })
      .eq("id", id)
      .select("*, user_data: users(id: user_id, name: user_name, img)");

    return { key: vacancy_id, data, id };
  }
);

const DeleteComment = createAsyncThunk("DeleteComment", async (args: { id: number; vacancy_id: number }) => {
  const { id, vacancy_id } = args;
  const { data } = await supabase.from("comments").delete().eq("id", id).select();

  return { key: vacancy_id, data, id };
});

const PostCommentLike = createAsyncThunk(
  "PostCommentLike",
  async (args: { vacancy_id: number; comment_id: number; liked: "like" | "dislike" | null }, { getState }) => {
    const { vacancy_id, comment_id, liked } = args;
    const state = getState() as RootState;
    const user_id = state.user.id;

    function deleteLike() {
      supabase.from("comment_likes").delete().eq("comment_id", comment_id).eq("user_id", user_id).then();
    }

    function setLike(dislike: boolean) {
      supabase
        .from("comment_likes")
        .delete()
        .eq("comment_id", comment_id)
        .eq("user_id", user_id)
        .then(() => {
          supabase.from("comment_likes").insert({ user_id, comment_id, dislike }).then();
        });
    }

    if (user_id) {
      if (liked === "like") {
        setLike(false);
      } else if (liked === "dislike") {
        setLike(true);
      } else {
        deleteLike();
      }
    }

    return { comment_id, key: vacancy_id };
  }
);

export const vacancyApi = {
  element,
  comments: {
    get: GetComments,
    post: PostComment,
    update: UpdateComment,
    delete: DeleteComment,
    like: PostCommentLike,
  },
};
