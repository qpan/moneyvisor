import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import pause from '../utils';
import { JSON_SERVER_URL } from '../../constants';

const accountsApi = createApi({
  reducerPath: 'accounts',
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
      removeAccount: builder.mutation({
        invalidatesTags: (result, error, account) => {
          return [{ type: 'Account', id: account.id }];
        },
        query: (account) => {
          return {
            url: `/accounts/${account.id}`,
            method: 'DELETE',
          };
        }
      }),
      addAccount: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAccounts', id: user.id }];
        },
        query: (account) => {
          return {
            url: '/accounts',
            method: 'POST',
            body: { ...account }
          };
        }
      }),
      fetchAccounts: builder.query({
        query: () => {
          return {
            url: '/accounts',
            method: 'GET',
          };
        }
      }),
    };
  }
});

export const {
  useFetchAccountsQuery,
  useAddAccountMutation,
  useRemoveAccountMutation,
} = accountsApi;
export { accountsApi };