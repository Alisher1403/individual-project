import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "backend";
import { RootState } from "store";

interface ChatPayload {
  data: any[];
  key: string;
}

const chats = createSlice({
  name: "navigation",
  initialState: {
    users: [],
    messages: {} as { [key: string]: any[] },
    currentChat: null as null | string,
  },
  reducers: {
    setChat(state, action: PayloadAction<string>) {
      state.currentChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      if (isChatPayload(action.payload)) {
        const { data, key } = action.payload;
        if (!state.messages[key]) {
          state.messages[key] = [...data];
        } else {
          const existingMessagesSet = new Set(
            state.messages[key].map((e) => JSON.stringify(e))
          );
          data.forEach((msg) => existingMessagesSet.add(JSON.stringify(msg)));
          state.messages[key] = Array.from(existingMessagesSet).map((e) =>
            JSON.parse(e)
          );
        }
      }
    });
    builder.addCase(postMessag.fulfilled, () => {});
  },
});

export default chats.reducer;
export const { setChat } = chats.actions;

const getMessages = createAsyncThunk(
  "getMessages",
  async (args: { vacancy_id: string }, { getState }) => {
    const { vacancy_id } = args;
    const state = getState() as RootState;
    const user_id = state.user.data?.id;
    const key = `${vacancy_id}${user_id}`;

    if (!user_id) return;

    const { data } = await supabase
      .from("chats")
      .select("*, user_metadata(*)")
      .eq("vacancy_id", vacancy_id)
      .eq("user_id", user_id)
      .order("id", { ascending: false });
    console.log(data);

    return { data, key };
  }
);

export const chatsApi = {
  messages: {
    get: getMessages,
  },
};

const postMessag = createAsyncThunk("postMessage", async () => {});

// Type guard for ChatPayload
function isChatPayload(payload: any): payload is ChatPayload {
  return (
    payload &&
    typeof payload.data !== "undefined" &&
    typeof payload.key === "string"
  );
}
