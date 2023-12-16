import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { typesApi } from "./apis/typesApi";
import { entriesApi } from "./apis/entriesApi";
import { categoriesApi } from "./apis/categoriesApi";
import { accountsApi } from "./apis/accountsApi";

export const store = configureStore({
  reducer: {
    [typesApi.reducerPath]: typesApi.reducer,
    [entriesApi.reducerPath]: entriesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(typesApi.middleware)
      .concat(entriesApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(accountsApi.middleware)
  },
});

// TEMPORARY
window.store = store;

setupListeners(store.dispatch);

export {
  useFetchTypesQuery,
} from './apis/typesApi';

export {
  useFetchEntriesQuery,
  useAddEntryMutation,
  useRemoveEntryMutation,
  useFetchEntriesAggregationsQuery,
} from './apis/entriesApi';

export {
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useRemoveCategoryMutation,
} from './apis/categoriesApi';

export {
  useFetchAccountsQuery,
  useAddAccountMutation,
  useRemoveAccountMutation,
} from './apis/accountsApi';