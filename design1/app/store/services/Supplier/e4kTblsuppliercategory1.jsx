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

export const e4kTblsuppliercategory1 = createApi({
  reducerPath: 'e4kTblsuppliercategory1Api',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/supplier/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Supplier}),
  tagTypes: ['e4kTblsupplierCategory1'],
  endpoints: (builder) => ({
    getSupplierCategory1: builder.query({
      query: (companyid) => ({
        body: {
          query: gql`
            query GetSupplierCategory1($companyid: String!) {
              E4kTblsuppliercategory1(companyid: $companyid) {
                category1id
                category1name
                companyid{
                companyid
                }
              }
            }
          `,
          variables: { companyid },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kTblsuppliercategory1.map(({ category1id }) => ({
                type: 'e4kTblsupplierCategory1',
                id: category1id,
              })),
              { type: 'e4kTblsupplierCategory1', id: 'LIST' },
            ]
          : [{ type: 'e4kTblsupplierCategory1', id: 'LIST' }],

}),
    createSupplierCategory1: builder.mutation({
      query: ({ category1name, companyid }) => ({
        body: {
          query: gql`
            mutation CreateSupplierCategory1($category1name: String!, $companyid: String!) {
              E4kTblsuppliercategory1create(category1name: $category1name, companyid: $companyid) {
              success
              error
              }
            }
          `,
          variables: { category1name, companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4kTblsupplierCategory1', id: 'LIST' }],
    }),

    updateSupplierCategory1: builder.mutation({
      query: ({ category1id, category1name }) => ({
        body: {
          query: gql`
            mutation UpdateSupplierCategory1($category1id: Int!, $category1name: String!) {
              E4kTblsuppliercategory1update(category1id: $category1id, category1name: $category1name) {
                success
                error
              }
            }
          `,
          variables: { category1id, category1name },
        },
      }),
      invalidatesTags: [{ type: 'e4kTblsupplierCategory1', id: 'LIST' }],
    }),

    deleteSupplierCategory1: builder.mutation({
      query: ({ category1id, companyid }) => ({
        body: {
          query: gql`
            mutation DeleteSupplierCategory1($category1id: Int!, $companyid: String!) {
              E4kTblsuppliercategory1delete(category1id: $category1id, companyid: $companyid) {
                success 
              }
            }
          `,
          variables: { category1id, companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4kTblsupplierCategory1', id: 'LIST' }],
    }),
  
  }),
});

export const {
  useGetSupplierCategory1Query,
  useCreateSupplierCategory1Mutation,
  useUpdateSupplierCategory1Mutation,
  useDeleteSupplierCategory1Mutation,
} = e4kTblsuppliercategory1;

