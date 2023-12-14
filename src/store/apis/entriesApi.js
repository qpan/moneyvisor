import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import pause from '../utils';

const entriesApi = createApi({
  reducerPath: 'entries',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    fetchFn: async (...args) => {
      // DEV ONLY!!!
      await pause(1000);
      return fetch(...args);
    }
  }),
  endpoints(builder) {
    return {
      removeEntry: builder.mutation({
        invalidatesTags: (result, error, entry) => {
          return [{ type: 'Entry', id: entry.id }];
        },
        query: (entry) => {
          return {
            url: `/entries/${entry.id}`,
            method: 'DELETE',
          };
        }
      }),
      addEntry: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersEntries', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/entries',
            method: 'POST',
            body: {
              userId: user.id
            }
          };
        }
      }),
      fetchEntries: builder.query({
        query: () => {
          return {
            url: '/entries?_expand=account&_expand=category',
            method: 'GET',
          };
        }
      }),
      fetchEntriesAggregations: builder.query({
        query: () => {
          return {
            url: '/entries/aggregations',
            method: 'GET',
          };
        }
      })
    };
  }
});

export const {
  useFetchEntriesQuery,
  useAddEntryMutation,
  useRemoveEntryMutation,
  useFetchEntriesAggregationsQuery,
} = entriesApi;
export { entriesApi };