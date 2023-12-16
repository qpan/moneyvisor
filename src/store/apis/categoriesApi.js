import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import pause from '../utils';
import { JSON_SERVER_URL } from '../../constants';

const categoriesApi = createApi({
  reducerPath: 'categories',
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
      removeCategory: builder.mutation({
        invalidatesTags: (result, error, category) => {
          return [{ type: 'Category', id: category.id }];
        },
        query: (category) => {
          return {
            url: `/categories/${category.id}`,
            method: 'DELETE',
          };
        }
      }),
      addCategory: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersCategories', id: user.id }];
        },
        query: (category) => {
          return {
            url: '/categories',
            method: 'POST',
            body: { ...category }
          };
        }
      }),
      fetchCategories: builder.query({
        query: () => {
          return {
            url: '/categories',
            method: 'GET',
          };
        }
      }),
    };
  }
});

export const {
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useRemoveCategoryMutation,
} = categoriesApi;
export { categoriesApi };