import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import pause from '../utils';
import { JSON_SERVER_URL } from '../../constants';

const entriesApi = createApi({
  reducerPath: 'entries',
  baseQuery: fetchBaseQuery({
    baseUrl: JSON_SERVER_URL,
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
        invalidatesTags: ['Entry'],
        query: (entry) => {
          return {
            url: '/entries',
            method: 'POST',
            body: { ...entry }
          };
        }
      }),
      fetchEntries: builder.query({
        providesTags: ['Entry'],
        query: () => {
          return {
            url: '/entries?_expand=type&_expand=account&_expand=category',
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