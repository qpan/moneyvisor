import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { JSON_SERVER_URL } from '../../constants';

const typesApi = createApi({
  reducerPath: 'types',
  baseQuery: fetchBaseQuery({
    baseUrl: JSON_SERVER_URL,
    fetchFn: async (...args) => {
      return fetch(...args);
    }
  }),
  endpoints(builder) {
    return {
      fetchTypes: builder.query({
        query: () => {
          return {
            url: '/types',
            method: 'GET',
          };
        }
      }),
    };
  }
});

export const {
  useFetchTypesQuery,
} = typesApi;
export { typesApi };