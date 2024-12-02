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
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblVatcode = createApi({
  reducerPath: 'e4ktblVatcode',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }), // Adjust URL as per your API endpoint
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['e4kTblvatcodes'],
  endpoints: (builder) => ({
    getVatCodes: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetVatCodes($companyid: String!) {
              E4kTblaccvatcodes(companyid: $companyid) {
                companyid {
                  companyid
                }
                description
                sagecode
                vatcode
                vatpercent
              }
            }
          `,
          variables: { companyid: companyId },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kTblaccvatcodes.map(({ vatcode }) => ({
                type: 'e4kTblvatcodes',
                id: vatcode,
              })),
              { type: 'e4kTblvatcodes', id: 'LIST' },
            ]
          : [{ type: 'e4kTblvatcodes', id: 'LIST' }],

    }),

    createVatCode: builder.mutation({
      query: ({ companyid, description, sagecode, vatpercent }) => ({
        body: {
          query: gql`
            mutation CreateVatCode($companyid: String!, $description: String!, $sagecode: String!, $vatpercent: Decimal!) {
              E4kTblaccvatcodescreate(companyid: $companyid, description: $description, sagecode: $sagecode, vatpercent: $vatpercent) {
                error
                success
                vatcode {
                  description
                  sagecode
                  vatcode
                  vatpercent
                }
              }
            }
          `,
          variables: { companyid, description, sagecode, vatpercent },
        },
      }),
      invalidatesTags: [{ type: 'e4kTblvatcodes', id: 'LIST' }],
    }),

    updateVatCode: builder.mutation({
      query: ({ companyid ,vatcode, description, sagecode, vatpercent }) => ({
        body: {
          query: gql`
            mutation UpdateVatCode($vatcode: Int!, $description: String!, $sagecode: String!, $vatpercent: Float!, $companyid: String!) {
              E4kTblaccvatcodesupdate(vatcode: $vatcode, description: $description, sagecode: $sagecode, vatpercent: $vatpercent, companyid: $companyid) {
                error
                success
              }
            }
          `,
          variables: { vatcode, description, sagecode, vatpercent, companyid},
        },
      }),
      invalidatesTags: [{ type: 'e4kTblvatcodes', id: 'LIST' }],
    }),

    deleteVatCode: builder.mutation({
      query: ({ companyid, vatcode }) => ({
        body: {
          query: gql`
            mutation DeleteVatCode($companyid: String!, $vatcode: Int!) {
              E4kTblaccvatcodesdelete(companyid: $companyid, vatcode: $vatcode) {
                success
              }
            }
          `,
          variables: { companyid, vatcode },
        },
      }),
      invalidatesTags: [{ type: 'e4kTblvatcodes', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetVatCodesQuery,
  useCreateVatCodeMutation,
  useUpdateVatCodeMutation,
  useDeleteVatCodeMutation,
} = e4kTblVatcode;
