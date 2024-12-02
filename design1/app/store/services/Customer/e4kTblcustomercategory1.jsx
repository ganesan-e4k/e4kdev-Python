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
    //return { error: { status: error.response?.status || 500, data: error.message } };
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblcustomercategory1 = createApi({
  reducerPath: 'e4kTblcustomercategory1',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['TblcustomerCategory1'],
  endpoints: (builder) => ({
    getCustomerCategory1: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetCustomerCategory1($companyId: String!) {
              E4kTblcustomercategory1(companyid: $companyId) {
                category1id
                category1name
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
              ...result.E4kTblcustomercategory1.map(({ category1id }) => ({
                type: 'TblcustomerCategory1',
                id: category1id,
              })),
              { type: 'TblcustomerCategory1', id: 'LIST' },
            ]
          : [{ type: 'TblcustomerCategory1', id: 'LIST' }],

}),

    createCustomerCategory1: builder.mutation({
      query: ({ category1name, companyid }) => ({
        body: {
          query: gql`
            mutation CreateCustomerCategory1($category1name: String!, $companyid: String!) {
              E4kCustomercategory1create(category1name: $category1name, companyid: $companyid) {
               success
               error
              }
            }
          `,
          variables: { category1name, companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory1', id: 'LIST' }],
    }),

    updateCustomerCategory1: builder.mutation({
      query: ({ category1id, category1name,companyid }) => ({
        body: {
          query: gql`
            mutation UpdateCustomerCategory1($category1id: Int!, $category1name: String!,  $companyid: String!) {
              E4kCustomercategory1update(category1id: $category1id, category1name: $category1name , companyid: $companyid) {
                success
                error
              }
            }
          `,
          variables: { category1id, category1name,companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory1', id: 'LIST' }],
    }),

    deleteCustomerCategory1: builder.mutation({
      query: ({ category1id, companyid }) => ({
        body: {
          query: gql`
            mutation DeleteCustomerCategory1($category1id: Int!, $companyid: String!) {
              E4kCustomercategory1delete(category1id: $category1id, companyid: $companyid) {
                success 
              }
            }
          `,
          variables: { category1id, companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory1', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCustomerCategory1Query,
  useCreateCustomerCategory1Mutation,
  useUpdateCustomerCategory1Mutation,
  useDeleteCustomerCategory1Mutation,
} = e4kTblcustomercategory1;
