import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import pause from '../utils';
import { JSON_SERVER_URL } from '../../constants';
import dayjs from 'dayjs';

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
        invalidatesTags: ['Entry'],
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
      updateEntry: builder.mutation({
        invalidatesTags: ['Entry'],
        query: (entry) => {
          return {
            url: `/entries/${entry.id}`,
            method: 'PUT',
            body: { ...entry }
          };
        }
      }),
      fetchEntries: builder.query({
        providesTags: ['Entry'],
        query: () => {
          return {
            url: '/entries?_expand=type&_expand=account&_expand=category&_sort=createdAt&_order=asc',
            method: 'GET',
          };
        }
      }),
      fetchEntriesByYearMonth: builder.query({
        providesTags: ['Entry'],
        query: (year = dayjs().year(), month = dayjs().month()) => {
          const firstDay = dayjs()
            .year(year)
            .month(month)
            .startOf('month')
            .format();
          const lastDay = dayjs()
            .year(year)
            .month(month)
            .endOf('month')
            .format();

          return {
            url: `/entries?_expand=type&_expand=account&_expand=category&createdAt_gte=${firstDay}&createdAt_lte=${lastDay}&_sort=createdAt&_order=asc`,
            method: 'GET',
          };
        }
      }),
      fetchEntriesAggregations: builder.query({
        providesTags: ['Entry'],
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
  useFetchEntriesByYearMonthQuery,
  useAddEntryMutation,
  useUpdateEntryMutation,
  useRemoveEntryMutation,
  useFetchEntriesAggregationsQuery,
} = entriesApi;
export { entriesApi };