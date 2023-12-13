import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { entriesApi } from "./apis/entriesApi";

export const store = configureStore({
  reducer: {
    [entriesApi.reducerPath]: entriesApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(entriesApi.middleware);
  },
});

// TEMPORARY
window.store = store;

setupListeners(store.dispatch);

export { useFetchEntriesQuery, useAddEntryMutation, useRemoveEntryMutation } from './apis/entriesApi';