import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';

// Base query function for GraphQL
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
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return  data ;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblbussalespeople = createApi({
  reducerPath: 'e4kTblbussalespeople',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['Tblbussalespeople'],
  endpoints: (builder) => ({
    getSalespeopleList: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetSalespeopleList($companyId: String!) {
              E4kTblbussalespeople(companyid: $companyId) {
                live
                forename
                repid
                repkey
                surname
                companyid{
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
              ...result.E4kTblbussalespeople.map(({ businessid }) => ({
                type: 'Tblbussalespeople',
                id: businessid,
              })),
              { type: 'Tblbussalespeople', id: 'LIST' },
            ]
          : [{ type: 'Tblbussalespeople', id: 'LIST' }],

}),


createRep: builder.mutation({
  query: ({ companyid, live, surname, repkey, forename }) => ({
    body: {
      query: gql`
        mutation CreateRep(
          $companyid: String!, 
          $live: Boolean!, 
          $surname: String!, 
          $repkey: String!, 
          $forename: String!
        ) {
          E4kTblbussalespeoplecreate(
            companyid: $companyid,
            live: $live,
            surname: $surname,
            repkey: $repkey,
            forename: $forename
          ) {
            error
            success
          }
        }
      `,
      variables: { companyid, live, surname, repkey, forename },
    },
  }),
  invalidatesTags: [{ type: 'Tblbussalespeople', id: 'LIST' }],
}),


updateRep: builder.mutation({
  query: ({ companyid, repid, forename, surname, live, repkey }) => ({
    body: {
      query: gql`
        mutation UpdateRep(
          $companyid: String!, 
          $repid: Int!, 
          $forename: String, 
          $surname: String, 
          $live: Boolean, 
          $repkey: String
        ) {
          E4kTblbussalespeopleupdate(
            companyid: $companyid,
            repid: $repid,
            forename: $forename,
            surname: $surname,
            live: $live,
            repkey: $repkey
          ) {
            error
            success
          }
        }
      `,
      variables: { companyid, repid, forename, surname, live, repkey },
    },
  }),
  invalidatesTags: [{ type: 'Tblbussalespeople', id: 'LIST' }],
}),

deleteRep: builder.mutation({
  query: ({ companyid, repid }) => ({
    body: {
      query: gql`
        mutation DeleteRep($companyid: String!, $repid: Int!) {
          E4kTblbussalespeopldelete(companyid: $companyid, repid: $repid) {
            success
          }
        }
      `,
      variables: { companyid, repid },
    },
  }),
  invalidatesTags: [{ type: 'Tblbussalespeople', id: 'LIST' }],
}),


  }),
});

export const {
  useGetSalespeopleListQuery,
  useCreateRepMutation,
  useUpdateRepMutation,
  useDeleteRepMutation,
} = e4kTblbussalespeople;
