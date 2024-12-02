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
    console.log("data nom" , data);
    return data;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblNominalAccount = createApi({
  reducerPath: 'e4kTblNominalAccount',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['e4kNominalAccount'],
  endpoints: (builder) => ({
    getNominalAccounts: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetNominalAccounts($companyId: String!) {
              E4kTblnominallist(companyid: $companyId) {
                live
                nombs
                nomcode
                nomdc
                nomdescription
                nompl
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
              ...result.E4kTblnominallist.map(({ nomdc }) => ({
                type: 'e4kNominalAccount',
                id: nomdc,
              })),
              { type: 'e4kNominalAccount', id: 'LIST' },
            ]
          : [{ type: 'e4kNominalAccount', id: 'LIST' }],

}),

    createNominalAccount: builder.mutation({
      query: ({ companyid, live,nomcode, nombs, nomdc, nomdescription, nompl }) => ({
        body: {
          query: gql`
            mutation CreateNominalAccount(
              $companyid: String!, 
              $live: Boolean!, 
              $nomcode: String!,
              $nombs: Int!, 
              $nomdc: String!, 
              $nomdescription: String!, 
              $nompl: Int!
            ) {
              E4kTblacctnominalcreate(
                companyid: $companyid,
                live: $live,
                nomcode: $nomcode,
                nombs: $nombs,
                nomdc: $nomdc,
                nomdescription: $nomdescription,
                nompl: $nompl
              ) {
                error
                success
                
              }
            }
          `,
          variables: { companyid, live,nomcode, nombs, nomdc, nomdescription, nompl },
        },
      }),
      invalidatesTags: [{ type: 'e4kNominalAccount', id: 'LIST' }],
    }),

    updateNominalAccount: builder.mutation({
      query: ({ companyid, live, nombs, nomcode, nomdc, nomdescription, nompl }) => ({
        body: {
          query: gql`
            mutation UpdateNominalAccount(
              $companyid: String!, 
              $live: Boolean!, 
              $nombs: Int!, 
              $nomcode: String!, 
              $nomdc: String!, 
              $nomdescription: String!, 
              $nompl: Int!
            ) {
              E4kTblaccnominalupdate(
                companyid: $companyid,
                live: $live,
                nombs: $nombs,
                nomcode: $nomcode,
                nomdc: $nomdc,
                nomdescription: $nomdescription,
                nompl: $nompl
              ) {
                error
                success
                
              }
            }
          `,
          variables: { companyid, live, nombs, nomcode, nomdc, nomdescription, nompl },
        },
      }),
      invalidatesTags: [{ type: 'e4kNominalAccount', id: 'LIST' }],
    }),

    deleteNominalAccount: builder.mutation({
      query: ({ companyid, nomcode }) => ({
        body: {
          query: gql`
            mutation DeleteNominalAccount($companyid: String!, $nomcode: String!) {
              E4kTblaccnominaldelete(companyid: $companyid, nomcode: $nomcode) {
                success
              }
            }
          `,
          variables: { companyid, nomcode },
        },
      }),
      invalidatesTags: [{ type: 'e4kNominalAccount', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetNominalAccountsQuery,
  useCreateNominalAccountMutation,
  useUpdateNominalAccountMutation,
  useDeleteNominalAccountMutation,
} = e4kTblNominalAccount;
