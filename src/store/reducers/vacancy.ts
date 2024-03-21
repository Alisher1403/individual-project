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
    setVacancyListData(state, action: PayloadAction<{ key: string; data: any[] }>) {
      const { pageData } = state.list;
      const { key, data } = action.payload;
      pageData[key] = data;
    },
    setVacancyCount(state, action: PayloadAction<{ key: string; value: number }>) {
      state.list.count[action.payload.key] = action.payload.value;
    },
    vacancyData(state, action: PayloadAction<{ key: string; data: any }>) {
      const { key, data } = action.payload;
      state.element.data[key] = data;
    },
    vacancyError(state, action: PayloadAction<boolean>) {
      state.element.error = action.payload;
    },
    commentsLoading(state, action: PayloadAction<boolean>) {
      state.comments.loading = action.payload;
    },
    setVacancyReaction(state, action: PayloadAction<{ vacancy_id: string; type: string }>) {
      const { vacancy_id, type } = action.payload;
      const vacancy = state.element.data[vacancy_id];

      if (vacancy.reaction[0]?.type === type) {
        vacancy.reaction = [{ type: null }];
      } else {
        vacancy.reaction = [{ type }];
      }
    },
    setCommentReaction(state, action: PayloadAction<{ vacancy_id: string; comment_id: string; type: string }>) {
      const { vacancy_id, comment_id, type } = action.payload;
      const list = state.comments.data[vacancy_id];

      const comment = list?.find((e: any) => e.id === comment_id);

      if (comment) {
        if (comment.reaction[0]?.type === type) {
          comment.reaction = [{ type: null }];
        } else {
          comment.reaction = [{ type }];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVacancy.fulfilled, (state, action) => {
      const { key, data, error } = action.payload;

      try {
        if (data) {
          const returnData = data[0];

          let reactionType = null;

          if (!returnData?.reaction) {
            returnData.reaction = [{ type: null }];
          } else {
            reactionType = returnData?.reaction?.[0]?.type;
          }

          if (reactionType === "like") {
            returnData.likes[0].count -= 1;
          } else if (reactionType === "dislike") {
            returnData.dislikes[0].count -= 1;
          }

          state.element.data[key] = returnData;
        }

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
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
            new Set([...state.comments.data[key], data].map((item) => JSON.stringify(item)))
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
          comment.likes = [{ count: 0 }];
          comment.dislikes = [{ count: 0 }];
          comment.reaction = [{ type: null }];
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
  },
});

export const {
  vacancyListError,
  vacancyListLoading,
  vacancyData,
  vacancyError,
  setVacancyCount,
  setVacancyListData,
  setVacancyReaction,
  setCommentReaction,
} = vacancy.actions;

export default vacancy.reducer;

/********************************************************************************************************************/
const config = {
  commentsPerLoad: 6,
};

/********************************************************************************************************************/
const getVacancy = createAsyncThunk("getVacancy", async (id: string, { dispatch, getState }) => {
  dispatch(LoadComments(id));
  const state = getState() as RootState;
  const user_id = state.user.data?.id;

  let selectString = `*, views (count), applied: applicants(id), appliedCount: applicants(count), 
    likes: vacancy_reactions(count), dislikes: vacancy_reactions(count)`;

  if (user_id) {
    selectString += `, reaction: vacancy_reactions(type)`;
  }

  let query = supabase
    .from("vacancies")
    .select(selectString)
    .eq("id", id)
    .eq("likes.type", "like")
    .eq("dislikes.type", "dislike");

  if (user_id) {
    query = query.eq("applicants.user_id", user_id).eq("reaction.user_id", user_id);
  }

  const { data, error }: any = await query;

  return { key: id, data, error };
});

const LoadComments = createAsyncThunk("LoadComments", async (vacancy_id: string, { getState }) => {
  const state = getState() as RootState;
  const user_id = state.user?.data?.id;

  const { data: count } = await supabase.from("comments").select("count").eq("vacancy_id", vacancy_id);

  let selectString = `*, user: user_metadata(id, name, img), dislikes: comment_reactions(count), likes: comment_reactions(count)`;

  if (user_id) {
    selectString += `, reaction: comment_reactions(type)`;
  }

  let query = supabase
    .from("comments")
    .select(selectString)
    .eq("vacancy_id", vacancy_id)
    .eq("dislikes.type", "dislike")
    .eq("likes.type", "like")
    .order("id", { ascending: false })
    .limit(config.commentsPerLoad);

  if (user_id) {
    query = query.eq("reaction.user_id", user_id);
  }

  const { data } = await query;

  return { key: vacancy_id, data, count };
});

const GetComments = createAsyncThunk("GetComments", async (vacancy_id: string, { getState, dispatch }) => {
  const state = getState() as RootState;
  const user_id = state.user.data?.id;
  const mainState = state.vacancy.comments.data[vacancy_id] || [];
  const last_id = mainState[mainState.length - 1]?.id;

  const stateCount = state.vacancy.comments.count[vacancy_id] || false;

  if (!stateCount || stateCount <= mainState.length) {
    return;
  }

  dispatch(vacancy.actions.commentsLoading(true));

  let selectString = `*, user: user_metadata(id, name, img), dislikes: comment_reactions(count), likes: comment_reactions(count)`;

  if (user_id) {
    selectString += `, reaction: comment_reactions(type)`;
  }

  let query = supabase
    .from("comments")
    .select(selectString)
    .eq("vacancy_id", vacancy_id)
    .eq("dislikes.type", "dislike")
    .eq("likes.type", "like")
    .order("id", { ascending: false })
    .lte("id", last_id)
    .limit(config.commentsPerLoad);

  if (user_id) {
    query = query.eq("reaction.user_id", user_id);
  }
  const data = await query;

  dispatch(vacancy.actions.commentsLoading(false));

  return { key: vacancy_id, data };
});

const PostComment = createAsyncThunk(
  "PostComment",
  async (args: { vacancy_id: string; value: string }, { getState }) => {
    const { value, vacancy_id } = args;
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id || !vacancy_id) return;

    const { data } = await supabase
      .from("comments")
      .insert({ vacancy_id, text: value, user_id })
      .select("*, user: user_metadata(id, name, img)");

    return { key: vacancy_id, data };
  }
);

const UpdateComment = createAsyncThunk(
  "UpdateComment",
  async (args: { id: string; value: string; vacancy_id: string }) => {
    const { value, id, vacancy_id } = args;

    const { data } = await supabase
      .from("comments")
      .update({ text: value, changed: true })
      .eq("id", id)
      .select("*, user: user_metadata(id, name, img)");

    return { key: vacancy_id, data, id };
  }
);

const DeleteComment = createAsyncThunk("DeleteComment", async (args: { id: string; vacancy_id: string }) => {
  const { id, vacancy_id } = args;
  const { data } = await supabase.from("comments").delete().eq("id", id).select();

  return { key: vacancy_id, data, id };
});

const PostCommentLike = createAsyncThunk(
  "PostCommentLike",
  async (args: { comment_id: string; vacancy_id: string }, { getState }) => {
    const { comment_id, vacancy_id } = args;

    const state = getState() as RootState;
    const user_id = state.user.data?.id;
    const list = state.vacancy.comments.data[vacancy_id];
    const index = list?.findIndex((e: any) => e.id === comment_id);
    const comment = list[index];
    const reactionType = comment?.reaction?.[0]?.type;

    if (!user_id || !comment_id) return;

    async function postLike(type: string) {
      await supabase
        .from("comment_reactions")
        .delete()
        .eq("user_id", user_id)
        .eq("comment_id", comment_id)
        .then(async () => {
          await supabase.from("comment_reactions").insert({ comment_id, user_id, type });
        });
    }

    async function deleteLike() {
      await supabase.from("comment_reactions").delete().eq("user_id", user_id).eq("comment_id", comment_id);
    }

    if (reactionType === "like" || reactionType === "dislike") {
      postLike(reactionType);
    } else {
      deleteLike();
    }
  }
);

const PostApplicant = createAsyncThunk("PostApplicant", async (vacancy_id: string, { getState, dispatch }) => {
  const state = getState() as RootState;
  const user_id = state.user.data?.id;

  if (!user_id || !vacancy_id) return;

  await supabase
    .from("applicants")
    .insert({ vacancy_id, user_id })
    .then(() => dispatch(getVacancy(vacancy_id)));
});

const PostVacancyLike = createAsyncThunk("PostApplicant", async (vacancy_id: string, { getState }) => {
  const state = getState() as RootState;
  const user_id = state.user.data?.id;
  const vacancy = state.vacancy.element.data[vacancy_id];
  const reactionType = vacancy?.reaction[0]?.type;

  if (!user_id || !vacancy_id) return;

  async function postLike(type: string) {
    await supabase
      .from("vacancy_reactions")
      .delete()
      .eq("user_id", user_id)
      .eq("vacancy_id", vacancy_id)
      .then(async () => {
        await supabase.from("vacancy_reactions").upsert({ vacancy_id, user_id, type });
      });
  }

  async function deleteLike() {
    await supabase.from("vacancy_reactions").delete().eq("user_id", user_id).eq("vacancy_id", vacancy_id);
  }

  if (reactionType === "like" || reactionType === "dislike") {
    postLike(reactionType);
  } else {
    deleteLike();
  }
});

export const vacancyApi = {
  get: getVacancy,
  like: PostVacancyLike,
  applicants: {
    post: PostApplicant,
  },
  comments: {
    get: GetComments,
    post: PostComment,
    update: UpdateComment,
    delete: DeleteComment,
    like: PostCommentLike,
  },
};
