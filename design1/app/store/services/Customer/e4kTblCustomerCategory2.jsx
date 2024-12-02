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
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return  data ;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblCustomerCategory2 = createApi({
  reducerPath: 'e4kTblCustomerCategory2',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['TblcustomerCategory2'],
  endpoints: (builder) => ({
    getCustomerCategory2: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetCustomerCategory2($companyId: String!) {
              E4kTblcustomercategory2(companyid: $companyId) {
                category2id
                category2name
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
              ...result.E4kTblcustomercategory2.map(({ category2id }) => ({
                type: 'TblcustomerCategory2',
                id: category2id,
              })),
              { type: 'TblcustomerCategory2', id: 'LIST' },
            ]
          : [{ type: 'TblcustomerCategory2', id: 'LIST' }],

}),

    createCustomerCategory2: builder.mutation({
      query: ({ category2name, companyid }) => ({
        body: {
          query: gql`
            mutation CreateCustomerCategory2($category2name: String!, $companyid: String!) {
              E4kCustomercategory2create(category2name: $category2name, companyid: $companyid) {
                success
                error
              }
            }
          `,
          variables: { category2name, companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory2', id: 'LIST' }],
    }),

    updateCustomerCategory2: builder.mutation({
      query: ({ category2id, category2name,companyid }) => ({
        body: {
          query: gql`
            mutation UpdateCustomerCategory2($category2id: Int!, $category2name: String!, $companyid : String!) {
              E4kCustomercategory2update(category2id: $category2id, category2name: $category2name , companyid: $companyid) {
                success
                error
              }
            }
          `,
          variables: { category2id, category2name , companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory2', id: 'LIST' }],
    }),

    deleteCustomerCategory2: builder.mutation({
      query: ({ category2id, companyid }) => ({
        body: {
          query: gql`
            mutation DeleteCustomerCategory2($category2id: Int!, $companyid: String!) {
              E4kCustomercategory2delete(category2id: $category2id, companyid: $companyid) {
                success
              }
            }
          `,
          variables: { category2id, companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory2', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCustomerCategory2Query,
  useCreateCustomerCategory2Mutation,
  useUpdateCustomerCategory2Mutation,
  useDeleteCustomerCategory2Mutation,
} = e4kTblCustomerCategory2;
