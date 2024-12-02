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
        throw new Error(`Network response was not ok`);
    }

    const data = await response.json();
    return  data ;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

// Create the API slice
export const e4kTblbuspaymentterms = createApi({
  reducerPath: 'e4kTblbuspaymentterms',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }), // Adjust the base URL as needed
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['Tblbuspaymentterms'],
  endpoints: (builder) => ({
    getPaymentTermsList: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetPaymentTermsList($companyId: String!) {
              E4kTblbuspaymenttermslist(companyid: $companyId) {
                days
                description
                paymenttermsid
                typeid {
                  termTypeName
                  termTypeid
                }
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
              ...result.E4kTblbuspaymenttermslist.map(({ businessid }) => ({
                type: 'Tblbuspaymentterms',
                id: businessid,
              })),
              { type: 'Tblbuspaymentterms', id: 'LIST' },
            ]
          : [{ type: 'Tblbuspaymentterms', id: 'LIST' }],

}),

getpaymenttermsRef: builder.query({
  query: (companyId) => ({
    body: {
      query: gql`
        query GetpaymenttermsRef($companyId: String!) {
          E4kTblbuspaymenttermsref(companyid: $companyId) {
            termTypeFormula
            termTypeName
            termTypeid
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
          ...result.E4kTblbuspaymenttermsref.map(({ businessid }) => ({
            type: 'Tblbuspaymentterms',
            id: businessid,
          })),
          { type: 'Tblbuspaymentterms', id: 'LIST' },
        ]
      : [{ type: 'Tblbuspaymentterms', id: 'LIST' }],

}),

createPaymentTerms: builder.mutation({
  query: ({ companyid, days, description, typeid }) => ({
    body: {
      query: gql`
        mutation CreatePaymentTerms(
          $companyid: String!, 
          $days: Int!, 
          $description: String!, 
          $typeid: Int!
        ) {
          E4kTblbuspaymenttermscreate(
            companyid: $companyid,
            days: $days,
            description: $description,
            typeid: $typeid
          ) {
            error
            success
          }
        }
      `,
      variables: { companyid, days, description, typeid },
    },
  }),
  invalidatesTags: [{ type: 'Tblbuspaymentterms', id: 'LIST' }],
}),


updatePaymentTerms: builder.mutation({
  query: ({ companyid, paymenttermsid, days, description, typeid }) => ({
    body: {
      query: gql`
        mutation UpdatePaymentTerms(
          $companyid: String!, 
          $paymenttermsid: Int!, 
          $days: Int, 
          $description: String, 
          $typeid: Int
        ) {
          E4kTblbuspaymenttermsUpdate(
            companyid: $companyid,
            paymenttermsid: $paymenttermsid,
            days: $days,
            description: $description,
            typeid: $typeid
          ) {
            error
            success
          }
        }
      `,
      variables: { companyid, paymenttermsid, days, description, typeid },
    },
  }),
  invalidatesTags: [{ type: 'Tblbuspaymentterms', id: 'LIST' }],
}),

deletePaymentTerms: builder.mutation({
  query: ({ companyid, paymenttermsid }) => ({
    body: {
      query: gql`
        mutation DeletePaymentTerms($companyid: String!, $paymenttermsid: Int!) {
          E4kTblbuspaymenttermsdelete(companyid: $companyid, paymenttermsid: $paymenttermsid) {
            success
          }
        }
      `,
      variables: { companyid, paymenttermsid },
    },
  }),
  invalidatesTags: [{ type: 'Tblbuspaymentterms', id: 'LIST' }],
}),





  }),
});

// Export hooks for usage in functional components
export const { useGetPaymentTermsListQuery,
                useGetpaymenttermsRefQuery,
                useCreatePaymentTermsMutation,
                useUpdatePaymentTermsMutation,
                useDeletePaymentTermsMutation,

              } = e4kTblbuspaymentterms;
