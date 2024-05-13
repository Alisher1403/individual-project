import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { RootState } from "store";
import { requireLogin } from "./user";

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
  searchList: {
    [key: string]: { similar: any[] | null; others: any[] | null };
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
      searchParams: null,
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
    searchList: {},
  } as VacancyState,
  reducers: {
    resetVacancies(state) {
      state.list.pageData = {};
      state.element.data = {};
    },
    vacancyListError(state, action: PayloadAction<boolean>) {
      state.list.error = action.payload;
    },
    vacancyListLoading(state, action: PayloadAction<boolean>) {
      state.list.loading = action.payload;
    },
    setVacancyListData(
      state,
      action: PayloadAction<{ key: string; data: any[] }>
    ) {
      const { pageData } = state.list;
      const { key, data } = action.payload;
      pageData[key] = data;
    },
    setVacancyCount(
      state,
      action: PayloadAction<{ key: string; value: number }>
    ) {
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
    setVacancyReaction(
      state,
      action: PayloadAction<{ vacancy_id: string; type: string }>
    ) {
      const { vacancy_id, type } = action.payload;
      const vacancy = state.element.data[vacancy_id];

      if (vacancy.reaction[0]?.type === type) {
        vacancy.reaction = [{ type: null }];
      } else {
        vacancy.reaction = [{ type }];
      }
    },
    setCommentReaction(
      state,
      action: PayloadAction<{
        vacancy_id: string;
        comment_id: string;
        type: string;
      }>
    ) {
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
        const returnData = data.map((e: any) => {
          if (e?.reaction) {
            const reactionType = e.reaction[0]?.type;

            if (reactionType === "like" && e.likes && e.likes[0]?.count > 0) {
              return {
                ...e,
                likes: [{ count: e.likes[0].count - 1 }],
              };
            } else if (
              reactionType === "dislike" &&
              e.dislikes &&
              e.dislikes[0]?.count > 0
            ) {
              return {
                ...e,
                dislikes: [{ count: e.dislikes[0].count - 1 }],
              };
            }
          }
          return e;
        });

        state.comments.data[key] = returnData;

        if (count) {
          state.comments.count[key] = count[0]?.count || 0;
        }
      }
    });

    builder.addCase(GetComments.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, data } = action.payload;

        if (data) {
          const modifiedComments = data.map((item: any) => {
            const comment = { ...item };
            if (comment?.reaction) {
              const reactionType = comment.reaction[0]?.type;

              if (
                reactionType === "like" &&
                comment.likes &&
                comment.likes[0]?.count > 0
              ) {
                comment.likes = [{ count: comment.likes[0].count - 1 }];
              } else if (
                reactionType === "dislike" &&
                comment.dislikes &&
                comment.dislikes[0]?.count > 0
              ) {
                comment.dislikes = [{ count: comment.dislikes[0].count - 1 }];
              }
            }
            return comment;
          });

          const uniqueArray = Array.from(
            new Set(
              [...state.comments.data[key], ...modifiedComments].map((item) =>
                JSON.stringify(item)
              )
            )
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

    builder.addCase(getSearchList.fulfilled, (state, action) => {
      if (action.payload) {
        const { data, key } = action.payload;
        state.searchList[key] = data;
        console.log(data);
      }
    });

    builder.addCase(PostApplicant.fulfilled, (state, action) => {
      if (action.payload) {
        const { id } = action.payload;
        Object.entries(state.list.pageData).map(([_, list]) => {
          list.map((e) => {
            if (e?.id === id) {
              return (e.applied[0] = true);
            }
          });
        });
      }
    });

    builder.addCase(PostVacancySaved.fulfilled, (state, action) => {
      if (action.payload) {
        const { id } = action.payload;
        Object.entries(state.list.pageData).map(([_, list]) => {
          list.map((e) => {
            if (e?.id === id) {
              return (e.saved[0] = true);
            }
          });
        });
      }
    });

    builder.addCase(DeleteVacancySaved.fulfilled, (state, action) => {
      if (action.payload) {
        const { id } = action.payload;
        Object.entries(state.list.pageData).map(([_, list]) => {
          list.map((e) => {
            if (e?.id === id) {
              return (e.saved[0] = null);
            }
          });
        });
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
  resetVacancies,
} = vacancy.actions;

export default vacancy.reducer;

/********************************************************************************************************************/
const config = {
  commentsPerLoad: 6,
};

/********************************************************************************************************************/
const getSearchList = createAsyncThunk(
  "getSearchList",
  async (searchText: string) => {
    const { data: similar } = await supabase
      .from("search")
      .select("name")
      .ilike("name", `%${searchText}%`)
      .gte("count", 20)
      .neq("name", searchText)
      .order("count", { ascending: false })
      .limit(7);

    const { data: others } = await supabase
      .from("search")
      .select("name")
      .gte("count", 20)
      .neq("name", searchText)
      .order("count", { ascending: false })
      .limit(10);

    if (similar || others) {
      return { key: searchText, data: { similar, others } };
    }
  }
);

const getVacancyList = createAsyncThunk(
  "getVacancyList",
  async (
    args: {
      searchText: string;
      searchParams: any;
      fromIndex: number;
      toIndex: number;
      dataKey: string;
    },
    { getState, dispatch }
  ) => {
    const { searchText, searchParams, fromIndex, toIndex, dataKey } = args;
    const state = getState() as RootState;
    const user = state.user.data;

    try {
      let selectString = `id, created_at, user_id, title, user: user_metadata(name, img), remote, emp_type, location, subtitle, fromSalary, toSalary, currency, experience, views: vacancy_views (count)`;

      if (user?.id) {
        selectString += `, applied: applicants(resumes()), saved: saved_vacancies(id)`;
      }

      let query = supabase
        .from("vacancies")
        .select(selectString, { count: "exact" });

      if (user?.id) {
        query = query
          .eq("applied.resumes.user_id", user?.id)
          .eq("saved.user_id", user?.id);
      }

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
        query.gte("fromSalary", searchParams.salary);
      }

      if (searchParams.currency) {
        query.eq("currency", searchParams.currency);
      } else {
        query.eq("currency", "dollar");
      }

      if (searchParams.age) {
        query.lte("fromAge", searchParams.age);
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
        dispatch(vacancyListLoading(false));
        dispatch(setVacancyListData({ key: dataKey, data }));

        if (count) {
          dispatch(setVacancyCount({ key: dataKey, value: count }));
        }
      }
    } catch (error) {
      dispatch(vacancyListError(true));
    }
  }
);

const getVacancy = createAsyncThunk(
  "getVacancy",
  async (id: string, { dispatch, getState }) => {
    dispatch(LoadComments(id));
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    let selectString = `*, user: user_metadata(name, img), views: vacancy_views (count), applicants: applicants(count), 
    likes: vacancy_reactions(count), dislikes: vacancy_reactions(count)`;

    if (user_id) {
      selectString += `, reaction: vacancy_reactions(type), applied: applicants(resumes()), saved: saved_vacancies(id)`;
    }

    let query = supabase
      .from("vacancies")
      .select(selectString)
      .eq("id", id)
      .eq("likes.type", "like")
      .eq("dislikes.type", "dislike");

    if (user_id) {
      query = query
        .eq("applied.resumes.user_id", user_id)
        .eq("saved.user_id", user_id)
        .eq("reaction.user_id", user_id);
    }

    const { data, error }: any = await query;

    return { key: id, data, error };
  }
);

const postVacancy = createAsyncThunk(
  "postVacancy",
  async (post: any, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return false;

    const { data } = await supabase
      .from("vacancies")
      .insert({ user_id, ...post })
      .select();

    return data;
  }
);

const updateVacancy = createAsyncThunk(
  "updateVacancy",
  async (args: { id: string; post: any }, { getState }) => {
    const { id, post } = args;
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return false;

    const { data } = await supabase
      .from("vacancies")
      .update(post)
      .eq("id", id)
      .select();

    return data;
  }
);

const deleteVacancy = createAsyncThunk(
  "updateVacancy",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return false;

    const { data } = await supabase
      .from("vacancies")
      .delete()
      .eq("id", id)
      .select();

    return data;
  }
);

const LoadComments = createAsyncThunk(
  "LoadComments",
  async (vacancy_id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user?.data?.id;

    const { data: count } = await supabase
      .from("comments")
      .select("count")
      .eq("vacancy_id", vacancy_id);

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
  }
);

const GetComments = createAsyncThunk(
  "GetComments",
  async (vacancy_id: string, { getState, dispatch }) => {
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

    const { data } = await query;

    dispatch(vacancy.actions.commentsLoading(false));

    return { key: vacancy_id, data };
  }
);

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

const DeleteComment = createAsyncThunk(
  "DeleteComment",
  async (args: { id: string; vacancy_id: string }) => {
    const { id, vacancy_id } = args;
    const { data } = await supabase
      .from("comments")
      .delete()
      .eq("id", id)
      .select();

    return { key: vacancy_id, data, id };
  }
);

const PostCommentLike = createAsyncThunk(
  "PostCommentLike",
  async (
    args: { comment_id: string; vacancy_id: string },
    { getState, dispatch }
  ) => {
    const { comment_id, vacancy_id } = args;

    const state = getState() as RootState;
    const user_id = state.user.data?.id;
    const list = state.vacancy.comments.data[vacancy_id];
    const index = list?.findIndex((e: any) => e.id === comment_id);
    const comment = list[index];
    const reactionType = comment?.reaction?.[0]?.type;

    if (!user_id || !comment_id) {
      dispatch(requireLogin(true));
      return;
    }

    async function postLike(type: string) {
      await supabase
        .from("comment_reactions")
        .delete()
        .eq("user_id", user_id)
        .eq("comment_id", comment_id)
        .then(async () => {
          await supabase
            .from("comment_reactions")
            .insert({ comment_id, user_id, type });
        });
    }

    async function deleteLike() {
      await supabase
        .from("comment_reactions")
        .delete()
        .eq("user_id", user_id)
        .eq("comment_id", comment_id);
    }

    if (reactionType === "like" || reactionType === "dislike") {
      postLike(reactionType);
    } else {
      deleteLike();
    }
  }
);

const PostApplicant = createAsyncThunk(
  "PostApplicant",
  async (
    args: { vacancy_id: string; resume_id: string },
    { getState, dispatch }
  ) => {
    const { vacancy_id, resume_id } = args;
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id || !vacancy_id) return;

    await supabase
      .from("applicants")
      .insert({ vacancy_id, resume_id })
      .then(() => {
        dispatch(getVacancy(vacancy_id));
      });

    return { id: vacancy_id };
  }
);

const PostVacancyLike = createAsyncThunk(
  "PostApplicant",
  async (vacancy_id: string, { getState }) => {
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
          await supabase
            .from("vacancy_reactions")
            .upsert({ vacancy_id, user_id, type });
        });
    }

    async function deleteLike() {
      await supabase
        .from("vacancy_reactions")
        .delete()
        .eq("user_id", user_id)
        .eq("vacancy_id", vacancy_id);
    }

    if (reactionType === "like" || reactionType === "dislike") {
      postLike(reactionType);
    } else {
      deleteLike();
    }
  }
);

const PostVacancySaved = createAsyncThunk(
  "PostVacancySaved",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return;

    await supabase.from("saved_vacancies").insert({ user_id, vacancy_id: id });

    return { id };
  }
);

const DeleteVacancySaved = createAsyncThunk(
  "DeleteVacancySaved",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    if (!user_id) return;

    await supabase
      .from("saved_vacancies")
      .delete()
      .eq("user_id", user_id)
      .eq("vacancy_id", id);

    return { id };
  }
);

export const vacancyApi = {
  get: getVacancy,
  post: postVacancy,
  update: updateVacancy,
  delete: deleteVacancy,
  like: PostVacancyLike,
  search: {
    get: getSearchList,
  },
  list: {
    get: getVacancyList,
  },
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
  saved: {
    post: PostVacancySaved,
    delete: DeleteVacancySaved,
  },
};
