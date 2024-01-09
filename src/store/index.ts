import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { backend } from "./useFetch";

export const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { backend };
