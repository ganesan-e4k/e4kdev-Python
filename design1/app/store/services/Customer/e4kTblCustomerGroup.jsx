import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';

const graphqlBaseQuery = ({ baseUrl }) => async ({ body }) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok`);
    }

    const data = await response.json();
    return  data ;
  } catch (error) {
    return { error: { status: error.response?.status || 500, data: error.message } };
  }
};

export const e4kTblCustomerGroup = createApi({
  reducerPath: 'e4kTblCustomerGroup',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['e4kTblCustomerGroupa'],
  endpoints: (builder) => ({
    getTblCustomerGroup: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetTblCustomerGroup($companyId: String!) {
              E4kGroup(companyid: $companyId) {
                groupid
                groupname
                companyid {
                  companyid
                }
              }
            }
          `,
          variables: { companyId },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kGroup.map(({ groupid }) => ({
                type: 'e4kTblCustomerGroupa',
                id: groupid,
              })),
              { type: 'e4kTblCustomerGroupa', id: 'LIST' },
            ]
          : [{ type: 'e4kTblCustomerGroupa', id: 'LIST' }],

    }),

    createTblCustomerGroup: builder.mutation({
      query: ({ groupname, companyid }) => ({
        body: {
          query: gql`
            mutation CreateTblCustomerGroup($groupname: String!, $companyid: String!) {
              E4kTblbusgroupcreate(groupname: $groupname, companyid: $companyid) {
               success
               error
              }
            }
          `,
          variables: { groupname, companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4kTblCustomerGroupa', id: 'LIST' }],
    }),

    updateTblCustomerGroup: builder.mutation({
      query: ({ groupid, groupname, companyid }) => ({
        body: {
          query: gql`
            mutation UpdateTblCustomerGroup($groupid: Int!, $groupname: String! $companyid: String!) {
              E4kTblbusgroupupdate(groupid: $groupid, groupname: $groupname , companyid: $companyid) {
               success
               error
              }
            }
          `,
          variables: { groupid, groupname,companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4kTblCustomerGroupa', id: 'LIST' }],
    }),

    deleteTblCustomerGroup: builder.mutation({
      query: ({ groupid, companyid }) => ({
        body: {
          query: gql`
            mutation DeleteTblCustomerGroup($groupid: Int!, $companyid: String!) {
              E4kTblbusgroupdelete(groupid: $groupid, companyid: $companyid) {
                success
              }
            }
          `,
          variables: { groupid, companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4kTblCustomerGroupa', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTblCustomerGroupQuery,
  useCreateTblCustomerGroupMutation,
  useUpdateTblCustomerGroupMutation,
  useDeleteTblCustomerGroupMutation,
} = e4kTblCustomerGroup;
