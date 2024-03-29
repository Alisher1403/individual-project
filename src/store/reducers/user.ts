import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "backend";
import Compressor from "compressorjs";
import { RootState } from "store";

const user = createSlice({
  name: "user",
  initialState: {
    data: null as { [key: string]: any } | null,
    metadata: null as { [key: string]: any } | null,
    loading: { img: false },
    requireLogin: false,
  },
  reducers: {
    requireLogin(state, action: PayloadAction<boolean>) {
      if (!state.data?.id) {
        state.requireLogin = action.payload;
      }
    },
    setUserLoading(
      state,
      action: PayloadAction<{
        key: keyof typeof state.loading;
        loading: boolean;
      }>
    ) {
      const { key, loading } = action.payload;
      state.loading[key] = loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.data = null;
    });
    builder.addCase(updateMetadata.fulfilled, (state, action) => {
      if (action.payload) {
        state.metadata = action.payload;
      }
    });
    builder.addCase(getMetadata.fulfilled, (state, action) => {
      if (action.payload) {
        state.metadata = action.payload;
      }
    });
    builder.addCase(updateImg.fulfilled, (state, action) => {
      if (action.payload) {
        state.metadata = action.payload;
      }
    });
  },
});

export default user.reducer;

export const { requireLogin, setUserLoading } = user.actions;

const authUser = createAsyncThunk("authUser", async (_, { dispatch }) => {
  try {
    // return null;
    const {
      data: { user: userData },
    } = await supabase.auth.refreshSession();

    if (!user) {
      return;
    }

    if (userData) {
      dispatch(getMetadata(userData?.id));
      dispatch(requireLogin(false));
    }

    return userData;
  } catch (error: any) {
    console.error("Error fetching user data or refreshing session:", error);
    return { error: error.message };
  }
});

const getMetadata = createAsyncThunk("getMetadata", async (id: string) => {
  const { data } = await supabase
    .from("user_metadata")
    .select("*")
    .eq("id", id);

  if (!data) return null;

  return data[0];
});

const signIn = createAsyncThunk(
  "signIn",
  async (form: { email: string; password: string }, { dispatch }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(form);

      if (error) {
        throw error;
      }

      dispatch(getMetadata(data.user?.id));
      dispatch(requireLogin(false));
      window.location.reload();
      window.location.pathname = "/";

      return data.user;
    } catch (error: any) {
      console.error("Sign-up error:", error.message);
      return false;
    }
  }
);

const signUp = createAsyncThunk(
  "signUp",
  async (form: { email: string; password: string }, { dispatch }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
        throw error;
      }

      await supabase.from("user_metadata").upsert(
        {
          id: data.user?.id,
          name: data.user?.email,
          email: data.user?.email,
          img: `${Date.now()}.png`,
        },
        { onConflict: "id" }
      );

      await dispatch(signIn(form));
      dispatch(requireLogin(false));
      window.location.reload();
      window.location.pathname = "/profile";

      return data;
    } catch (error: any) {
      console.error("Sign-up error:", error.message);
      return false;
    }
  }
);

const signOut = createAsyncThunk("signOut", async () => {
  try {
    await supabase.auth.signOut();
    window.location.reload();
    window.location.pathname = "/";
    return false;
  } catch (error: any) {
    console.error("Error fetching user data or refreshing session:", error);
    return { error: error.message };
  }
});

const updateMetadata = createAsyncThunk(
  "updateMetadata",
  async (form: { name: string }, { getState }) => {
    const state = getState() as RootState;
    const user_id = state.user.data?.id;

    try {
      const { data } = await supabase
        .from("user_metadata")
        .update(form)
        .eq("id", user_id)
        .select();

      return data?.[0];
    } catch (error: any) {
      console.error("Error fetching user data or refreshing session:", error);
      return { error: error.message };
    }
  }
);

const updateImg = createAsyncThunk(
  "updateImg",
  async (file: File, { getState, dispatch }) => {
    const state = getState() as RootState;
    const user_id: string = state.user.data?.id;

    if (!file && !user_id) return;

    return new Promise(async (resolve, reject) => {
      try {
        const filename = Date.now();

        new Compressor(file, {
          quality: 0.2,
          success: async function (compressedResult) {
            try {
              dispatch(
                user.actions.setUserLoading({ key: "img", loading: true })
              );
              await supabase.storage
                .from("images")
                .list(`${user_id}`)
                .then(async (fileList) => {
                  if (fileList.data) {
                    const filesToRemove = fileList.data?.map(
                      (x) => `${user_id}/${x.name}`
                    );
                    await supabase.storage.from("images").remove(filesToRemove);
                  }
                });

              const { data } = await supabase.storage
                .from(`images/${user_id}`)
                .upload(`${filename}.png`, compressedResult, {
                  cacheControl: "3600",
                  upsert: true,
                });

              if (data) {
                const { data: userData } = await supabase
                  .from("user_metadata")
                  .update({ img: `${user_id}/${filename}.png` })
                  .eq("id", user_id)
                  .select("*");

                resolve(userData?.[0]);
              } else {
                reject(new Error("Failed to upload image"));
              }
            } catch (error) {
              reject(error);
            }
          },
          error: function (error) {
            reject(error);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
);

export const userApi = {
  auth: authUser,
  signOut,
  signIn,
  signUp,
  metadata: {
    update: updateMetadata,
    updateImg,
  },
};
